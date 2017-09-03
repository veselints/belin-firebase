(function() {
  'use strict';

  function config($routeProvider) {
    var PARTIALS_PREFIX = 'views/partials/';
    var CONTROLLER_AS_VM = 'vm';

    $routeProvider
      // Major navigation
      .when('/', {
        templateUrl: PARTIALS_PREFIX + 'home.html',
        controller: 'HomeController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/about', {
        templateUrl: PARTIALS_PREFIX + 'about.html',
        controller: 'AboutController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/admin', {
        templateUrl: PARTIALS_PREFIX + 'admin.html',
        controller: 'AdminController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/main/:section', {
        templateUrl: PARTIALS_PREFIX + 'main-section.html',
        controller: 'MainSectionController',
        controllerAs: CONTROLLER_AS_VM
      })

      // Common controller
      .when('/archive/:section', {
        templateUrl: PARTIALS_PREFIX + 'archive.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/community/forums', {
        templateUrl: PARTIALS_PREFIX + 'forums.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/paintings/:section', {
        templateUrl: PARTIALS_PREFIX + 'paintings.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/photos/:section', {
        templateUrl: PARTIALS_PREFIX + 'photos.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/presentations/:section', {
        templateUrl: PARTIALS_PREFIX + 'presentations.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/projects/:section', {
        templateUrl: PARTIALS_PREFIX + 'projects.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/publications/:section', {
        templateUrl: PARTIALS_PREFIX + 'publications.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/regeneration/:section', {
        templateUrl: PARTIALS_PREFIX + 'regeneration.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/trainings/:section', {
        templateUrl: PARTIALS_PREFIX + 'trainings.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/forums/:section', {
        templateUrl: PARTIALS_PREFIX + 'forums.html',
        controller: 'CommonController',
        controllerAs: CONTROLLER_AS_VM
      })

      // Details navigation
      .when('/paintings/:section/:id', {
        templateUrl: PARTIALS_PREFIX + 'painting-details.html',
        controller: 'CommonDetailsController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/projects/:section/:id', {
        templateUrl: PARTIALS_PREFIX + 'project-details.html',
        controller: 'CommonDetailsController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/photos/:section/:id', {
        templateUrl: PARTIALS_PREFIX + 'photo-details.html',
        controller: 'CommonDetailsController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/trainings/:section/:id', {
        templateUrl: PARTIALS_PREFIX + 'training-details.html',
        controller: 'CommonDetailsController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/regeneration/:section/:id', {
        templateUrl: PARTIALS_PREFIX + 'regeneration-details.html',
        controller: 'CommonDetailsController',
        controllerAs: CONTROLLER_AS_VM
      })
      .when('/forums/:section/:id', {
        templateUrl: PARTIALS_PREFIX + 'forum-details.html',
        controller: 'CommonDetailsController',
        controllerAs: CONTROLLER_AS_VM
      })

      // Otherwise
      .otherwise({
        redirectTo: '/'
      });
  }

  angular.module('belinApp.services', []);
  angular.module('belinApp.controllers', ['belinApp.services']);

  angular.module('belinApp', ['ngRoute', 'belinApp.controllers', 'ngFileUpload', 'firebase']) //
    .config(['$routeProvider', config])
    .constant('baseServiceUrl', 'https://fast-badlands-79260.herokuapp.com/api/'); // Chage this when you migrate to heroku
}());