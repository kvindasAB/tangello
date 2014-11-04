'use strict';

angular.module('tangello.tasks',
  [
    'ui.router',
    'tangello.tasks.controllers'
  ])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'tasks', {
      url: '/tasks',
      templateUrl: 'js/tasks/tasks.html',
      controller: 'TasksListController'
    });
}]);

