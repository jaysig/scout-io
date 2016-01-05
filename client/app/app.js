 'use strict';

angular.module('ScoutIOApp', [
  'ScoutIOApp.auth',
  'ScoutIOApp.admin',
  'ScoutIOApp.constants',
  'ScoutIOApp.login',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'validation.match',
  'ngMaterial',
  'ngMessages',
  'ngMap',
  'ngMdIcons',
  'ngJsTree'
])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'default': '400', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class testing
        'hue-3': '800' // use shade A100 for the <code>md-hue-3</code> class
      })
      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('amber', {
        'default': '600' // use shade 200 for default, and keep all other shades the same
      });
  })

  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
