'use strict';

// Declare app level module which depends on views, and components
angular.module('tangello.app', [
  'ui.bootstrap',
  'ui.router',
  'tangello.tasks',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/tasks");
}]);
