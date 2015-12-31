angular.module('ScoutIOApp')
  .controller('ProjectsController', ProjectsController);

function ProjectsController($log, $http, $timeout, $scope, Folder, Project) {
  var vm = this;

  var newId = 1;
  vm.ignoreChanges = false;
  vm.newNode = {};
  vm.treeData = [];

  angular.copy(vm.originalData, vm.treeData);

//  vm.showDialog = function (photo) {
//    return $http({
//      method: 'GET',
//      url: '/api/search/' + photo.apiID
//    })
//      .then(function (data) {
//console.log("photo", data)
//        DialogController.showDialog(data);
//      })
//  };

  vm.treeConfig = {
    changed: function (e, data) {
      //console.log(data.changed.selected); // newly selected
      //console.log(data.changed.deselected); // newly deselected
    },
    core: {
      multiple: false,
      animation: true,
      error: function (error) {
        $log.error(': error from js tree - ' + angular.toJson(error));
      },
      check_callback: true,
      worker: true
    },
    version: 1,
    plugins: ['changed']
  };

  //Used if you need to rebuild the tree
  vm.reCreateTree = function () {
    vm.ignoreChanges = true;
    angular.copy(this.originalData, this.treeData);
    vm.treeConfig.version++;
  };

  vm.simulateAsyncData = function () {
    vm.promise = $timeout(function () {
      vm.treeData.push({
        id: (newId++).toString(),
        parent: vm.treeData[0].id,
        text: 'Async Loaded'
      });
    }, 3000);
  };

  vm.getProjects = function () {
    Project.getUserProjects()
      .then(function (response) {
        var projects = response;

        //Add the projects to the Tree Data
        _.each(projects, function (project) {
          vm.treeData.push({
            id: (newId++).toString(),
            parent: '#',
            state: {
              opened: true
            },
            type: 'project',
            orgId: project._id,
            text: project.name
          });

          //Get the projects subfolders
          Project.getProjectFolders(project)
            .then(function (response) {
              var folders = response;
              _.each(folders, function (folder) {
                var parent;

                //Ensures folders are connected correctly
                _.each(vm.treeData, function (item) {
                  if (item.orgId === folder.FolderId || item.orgId === folder.ProjectId) {
                    parent = parseInt(item.id, 10);
                  }
                });

                vm.treeData.push({
                  id: (newId++).toString(),
                  parent: parent,
                  state: {
                    opened: true
                  },
                  type: 'folder',
                  projectId: folder.ProjectId,
                  orgId: folder._id,
                  text: folder.name
                });
              });
            });
        });
      });
  };

  //Uses the ID assigned from SQL to ensure folders get added to the right folder
  vm.addNewNode = function () {
    //console.log(vm.newNode);
    //console.log(vm.newNode.text);
    var folder, project, idA = 59;

    _.each(vm.treeData, function (item) {
      if (item.id === vm.newNode.text) {
        if (item.type === project) {
          project = parseInt(item.orgId, 10);
          return;
        } else {
          project = item.projectId;
          folder = parseInt(item.orgId, 10);
          return;
        }
      }
    });

    $http.post('/api/folders', {
      name: vm.newNode.text,
      info: 'this is a test',
      active: 1
    }).then(function (res) {
      idA = res.data._id;
      //console.log(idA, 'idA');
      var node = {
        id: (newId++).toString(),
        parent: vm.newNode.parent,
        orgId: res.data._id,
        text: vm.newNode.text
      };

      vm.treeData.push(node);

      //vm.newNode = {};  //? validation comes back red
      //vm.nodeForm.$setPristine();

      return $http.put('/api/folders/' + idA, {
        FolderId: folder,
        ProjectId: project
      });
    });
  };

  vm.getPhotos = function (folderId) {
    Folder.getFolderLinks(folderId)
      .then(function (res) {
        vm.photos = res.data;
        console.log(vm.photos);
        $scope.photos = res.data;
        console.log($scope.photos);
      });
  };

  this.readyCB = function () {
    $timeout(function () {
      vm.ignoreChanges = false;
      // toaster.pop('success', 'JS Tree Ready', 'Js Tree issued the ready event')
    });
  };

  this.createCB = function (e, item) {
    // $timeout(function() {toaster.pop('success', 'Node Added', 'Added new node with the text ' + item.node.text)});
  };

  //JS Tree Click Handler
  vm.selectCB = function (e, item) {
    vm.getPhotos(item.node.original.orgId);
  };

  this.applyModelChanges = function () {
    return !vm.ignoreChanges;
  };
}
