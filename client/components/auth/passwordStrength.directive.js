'use strict';

angular.module('ScoutIOApp')
.directive("passwordStrength", function () {
  return {        
    restrict: 'A',
    link: function(scope, element, attrs){                    
      scope.$watch(attrs.passwordStrength, function(value) {
        if(angular.isDefined(value)){
          if (value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) {
            scope.strength = 'strong';
          } else if (value.match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)) {
            scope.strength = 'medium';
          } else {
            scope.strength = 'weak';
          }
        }
      });
    }
  };
});


