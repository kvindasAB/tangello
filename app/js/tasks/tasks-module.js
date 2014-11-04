'use strict';

angular.module('tangello.tasks', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state( 'tasks', {
      url: '/tasks',
      templateUrl: 'js/tasks/tasks.html'
    });
}]);

