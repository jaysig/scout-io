angular.module('ScoutIOApp')
    .controller('ProjectsController', ProjectsController);


function ProjectsController($log, $http, $timeout, $scope) {
    var vm = this;

    var newId = 1;
    var folderId = 1;
    vm.ignoreChanges = false;
    vm.newNode = {};
    vm.originalData = [{
        id: 'ajson1',
        parent: '#',
        text: 'Simple root node',
        type: 'cloud',
        state: {
            opened: true
        }
    }, {
        id: 'ajson2',
        parent: '#',
        text: 'Root node 2',
        state: {
            opened: true
        }
    }, {
        id: 'ajson3',
        parent: 'ajson2',
        text: 'Child 1',
        state: {
            opened: true
        }
    }, {
        id: 'ajson4',
        parent: 'ajson2',
        text: 'Child 2',
        state: {
            opened: true
        }
    }];
    vm.treeData = [];
    angular.copy(vm.originalData, vm.treeData);
    vm.treeConfig = {
        core: {
            multiple: false,
            animation: true,
            error: function(error) {
                $log.error(': error from js tree - ' + angular.toJson(error));
            },
            check_callback: true,
            worker: true
        },
        types: {
            default: {
                icon: 'glyphicon glyphicon-flash'
            },
            star: {
                icon: 'glyphicon glyphicon-cloud'
            },
            cloud: {
                icon: 'glyphicon glyphicon-cloud'
            }
        },
        version: 1,
        plugins: ['types', 'checkbox']
    };


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
        $http.get('/api/projects/').then(function(response) {
                //comes back as an array of object
                //need to use append project's name as an object's text key
                response.data.forEach(project => {
                    // console.log(project, 'project name');
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
                //then pull folders
            })
            .then($http.get('/api/folders/').then(function(response) {

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
                vm.originalData = vm.treeData;
                return console.log(vm.treeData);

                //folder.FolderId || folder.ProjectId || 
            }));
    };

    vm.addNewNode = function() {
        console.log(vm.newNode);
        var index = parseInt(vm.newNode.parent, 10) + 3;
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

            // Folder.create()
        
};

this.setNodeType = function() {
    var item = _.findWhere(this.treeData, {
        id: this.selectedNode
    });
    item.type = this.newType;
    // toaster.pop('success', 'Node Type Changed', 'Changed the type of node ' + this.selectedNode);
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

this.applyModelChanges = function() {
    return !vm.ignoreChanges;
};
};
