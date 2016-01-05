angular.module('ScoutIOApp')
  .directive('save', function(){
    return {
      restrict: 'E',
      templateUrl: 'components/save-form/save-form.html',
      controller: 'SaveFormController'
      // scope: {
      //   // needs access to ... photo currently in the dialog
      // },
      // link: function($scope, element, attrs){
      //   // when saved is successfull close dialog and show header across photoDialog
      // }
    };
  });