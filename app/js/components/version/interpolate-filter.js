'use strict';

angular.module('myApp.version.interpolate-filter', [])

.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}])

.filter('touppercase', [function() {
  return function(text) {
    return text.toUpperCase();
  };
}])

.filter('substr5', [function() {
  return function(text) {
    return text.substring(5);
  };
}]);
