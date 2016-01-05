// this is not currently in use - the splash page main.html uses results controller


'use strict';

angular.module('ScoutIOApp')
  .controller('MainController', MainController);


function MainController($http, $scope, $state, socket, Search) {
  this.$http = $http;
  this.$state = $state;

  /*Triggers SearchFactory method sets response to ... redirects to results
   @param {string} query [comma deliniated word string]*/
  this.getByTagOnly = function (query) {
    console.log(query);
    Search.getByTagOnly(query)
      .then(function (response) {
        console.log(response);
        this.$state.go('results');
        //assign results to an object that is used by resultsController...
        // results.photos = results
      })
  }
}
