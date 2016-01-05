angular.module('ScoutIOApp')
  .controller('SaveFormController', function ($mdDialog, $rootScope, $scope, Link, Folder, Project, Comment) {
    $scope.folders = [];
    $scope.saved = false;
    $scope.save = {};

    if (!$rootScope.lastFolderId) {
      $rootScope.lastFolderId = 0;
    }

    $scope.save.folderId = $rootScope.lastFolderId;

    //load folders on modal load and set last folder selected
    Project.getUserProjects()
      .then(function (response) {
        var projects = response;

        _.each(projects, function (project) {
          Project.getProjectFolders(project)
            .then(function (response) {
              var folders = response;

              _.each(folders, function (folder) {
                $scope.folders.push(folder);
              });

              if ($rootScope.lastFolderId === 0) {
                $scope.save.folderId = $rootScope.lastFolderId = $scope.folders[0]._id;
              }
            })
        })
      });

    $scope.folderChanged = function() {
      $rootScope.lastFolderId = $scope.save.folderId;
    };

    //Saves a link(photo) to a specified folder. may or may not include a comment
    $scope.saveLink = function (photo) {
      $scope.save.apiID = photo.id;
      $scope.save.name = photo.title;
      $scope.save.url = photo.url_s;
      $scope.save.apiName = 'flickr';

      Link.saveLink($scope.save)
        .then(function (data) {
          $scope.saved = true;

          setTimeout(function () { $mdDialog.hide(); }, 1250);
        })
    };
  });
