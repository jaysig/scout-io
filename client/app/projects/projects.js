'use strict';

angular.module('ScoutIOApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectsController',
        controllerAs: 'projects'
      });
  });