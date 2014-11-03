'use strict';

angular.module('myApp.view1.services', [])
  .service("Service1", [function(){
    this.totalClients = 15;
    this.getClients = function(){
      console.log("getting clients - Service1 - " + this.totalClients);
      return [];
    };
  }])
  .factory("Service2", [function(){
    var service = {};
    service.totalClients = 30;
    service.getClients = function(){
      console.log("getting clients - Service2 - " + service.totalClients);
      return [];
    };
    return service;
  }]);
