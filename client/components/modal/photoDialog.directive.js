'use strict';

angular.module('ScoutIOApp')
  .directive('photoDialog', ['NgMap', 'Auth', function (NgMap, Auth) {
    return {
      restrict: 'EA',
      controller: 'PhotoDialogCtrl',
      scope: {
        photo: '=',
        Auth: Auth
      },
      link: function (scope, element) {
        scope.showDialog(e, scope.photo);
      }
    }
  }]);
