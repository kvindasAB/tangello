'use strict';

angular.module('tangello.tasks.controllers')

.controller('TasksListController', ['$scope', function($scope) {
    $scope.newTaskTitle = "";

    $scope.tasks = [
      {title:"This is a task example"},
      {title:"I need to buy the milk"},
      {title:"We should render this on template"},
      {title:"Have to pay some important bills"},
      {title:"Need to learn angularjs"}
    ];

    $scope.addTask = function(title){
      $scope.tasks.push({title: title});
      $scope.newTaskTitle = "";
    };
}]);