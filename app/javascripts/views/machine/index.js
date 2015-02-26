define(function(require) {
  var angular = require('angular');
  var moduleId = require('module').id;

  var app = angular.module(moduleId,
      [
        require('modules/common'),
        require('directives/ajaxloader/ajaxloader'),
        require('modules/machineService')
      ]
  );

  app.config(function($stateProvider) {
    $stateProvider
        .state('machines', {
          url: '/machines',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('machines.index', {
          url: '',
          template: require('jade!templates/machine/index'),
          controller: 'MachineIndex'
        });
  });

  app.controller('MachineIndex', function(machineService, $scope, $timeout, $state) {
    $scope.app.header.title = 'Machines';
    $scope.app.header.icon = 'monitor';

    $scope.app.action = {
      url: '/machines/new',
      title: 'Create a new machine'
    };


    $scope.$on('$stateChangeStart', function() {
      delete $scope.app.action;
    });

    $scope.state = {
      loading: true
    };

    machineService.index().then(function(data) {
      angular.extend($scope, data);
      $scope.state.loading = false;
    });

  });

  return moduleId;

});