angular.module('ScoutIOApp')
  .directive('commentBox', [function(){
    return {
      restrict: 'E',
      templateUrl: '/comments.html',
      controlller: 'CommentsController',
      scope: {
        photo: '=' 
      },
      link: function(scope, element, attrs){

      }
    };
  }]);