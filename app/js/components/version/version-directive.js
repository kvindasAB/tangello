'use strict';

angular.module('myApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}])
.directive('helloworld', [function() {
    return {
      restrict: 'AE',
      scope: {
        name:"=",
        address:"="
      },
      template: 'Name: {{name}} Address: {{address}}'
    };
}]);
