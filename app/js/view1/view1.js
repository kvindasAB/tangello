'use strict';

angular.module('myApp.view1',
  [
    'ui.router',
    'myApp.view1.services'
  ])
  .config(['$stateProvider', function($stateProvider) {
      $stateProvider.state( 'view1', {
        url: '/view1',
        templateUrl: 'js/view1/view1.html',
        controller: 'View1Ctrl'
      });
  }])
  .controller('View1Ctrl', function($scope, Service1, Service2) {
    $scope.testvar = 'testvalue';
    $scope.title = 'This is my title';
    $scope.title2 = 'My New value';
    $scope.callService1 = function(){
      Service1.getClients();
    };

    $scope.callService2 = function(){
      Service2.getClients();
    };
  })
  .controller('View1InnerCtrl', ['$scope', function($scope) {
    $scope.innerVar = 'This is an inner controller var';
  }]);
