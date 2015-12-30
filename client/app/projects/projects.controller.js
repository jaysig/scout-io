angular.module('ScoutIOApp')
    .controller('ProjectsController', ProjectsController);


function ProjectsController($log, $http, $timeout, $scope, Folder) {
    var vm = this;
    console.log($scope.treeInstance);
    var newId = 1;
    vm.ignoreChanges = false;
    vm.newNode = {};
    vm.treeData = [];
    angular.copy(vm.originalData, vm.treeData);
    vm.treeConfig = {
        changed: function(e, data) {
            console.log(data.changed.selected); // newly selected
            console.log(data.changed.deselected); // newly deselected
        },
        core: {
            multiple: false,
            animation: true,
            error: function(error) {
                $log.error(': error from js tree - ' + angular.toJson(error));
            },
            check_callback: true,
            worker: true
        },
        version: 1,
        plugins: ['changed']
    };

    //Used if you need to rebuild the tree
    vm.reCreateTree = function() {
        vm.ignoreChanges = true;
        angular.copy(this.originalData, this.treeData);
        vm.treeConfig.version++;
    };

    vm.simulateAsyncData = function() {
        vm.promise = $timeout(function() {
            vm.treeData.push({
                id: (newId++).toString(),
                parent: vm.treeData[0].id,
                text: 'Async Loaded'
            });
        }, 3000);
    };

    vm.getProjects = function() {
        //Pull the data from the server
        //Loop over it
        //Display the folders
        $http.get('/api/projects/').then(function(response) {
                //comes back as an array of object
                //need to use append project's name as an object's text key
                return response.data.forEach(project => {
                    vm.treeData.push({
                        id: (newId++).toString(),
                        parent: '#',
                        state: {
                            opened: true
                        },
                        orgId: project._id,
                        text: project.name
                    });
                });
            })
            .then($http.get('/api/folders/').then(function(response) {
                //Pull the folders and assign them based on Parent
                response.data.forEach(folder => {
                    console.log(folder, 'folder name');
                    vm.treeData.push({
                        id: (newId++).toString(),
                        parent: folder.FolderId || folder.ProjectId || '#',
                        state: {
                            opened: true
                        },
                        orgId: folder._id,
                        text: folder.name
                    });
                });
                return console.log(vm.treeData);
            }));
    };

    //Uses the ID assigned from SQL to ensure folders get added to the right folder
    vm.addNewNode = function() {
        console.log(vm.newNode);
        var index = parseInt(vm.newNode.parent, 10);
        var originalId = vm.originalData[index].orgId;
        var node = {
            id: (newId++).toString(),
            parent: vm.newNode.parent,
            orgId: originalId || null,
            text: vm.newNode.text
        };
        vm.treeData.push(node);
        return $http.post('/api/folders', {
            name: node.text,
            info: 'this is a test',
            active: 1,
            FolderId: originalId || null
        }).then(function(res) {
            return console.log(res);
        });
    };

    vm.getPhotos = function(folder){
         $http.get('/api/links/').then(function(response) {
                //comes back as an array of object
                //need to use append project's name as an object's text key
                return response.data.forEach(link => {
                    if(link.FolderId === folder)
                    vm.photos.push({
                        id: (newId++).toString(),
                        parent: '#',
                        state: {
                            opened: true
                        },
                        orgId: link._id,
                        text: link.name
                    });
                });
            });
    };
    this.readyCB = function() {
        $timeout(function() {
            vm.ignoreChanges = false;
            // toaster.pop('success', 'JS Tree Ready', 'Js Tree issued the ready event')
        });
    };

    this.createCB = function(e, item) {
        // $timeout(function() {toaster.pop('success', 'Node Added', 'Added new node with the text ' + item.node.text)});
    };
    //JS Tree Click Handler 
    vm.selectCB = function(e,item){
        console.log(item.node.original.originalId);
    };

    this.applyModelChanges = function() {
        return !vm.ignoreChanges;
    };
}
