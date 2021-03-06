define(function(require) {
  var module = require('module');

  var angular = require('angular');
  var mod = angular.module(module.id, []);
  mod.factory('handleProgress', function($http, $timeout) {
    return function(progressId) {
      function doQuery() {
        return $http.get('/api/progress/' + progressId).then(function(res) {
          if(!res.data.finished) {
            return $timeout(doQuery, 250);
          }
          if(res.data.error) {
            throw res.data.error;
          }
          return true;
        });
      }
      return  $timeout(doQuery, 250);
    };
  });

  return module.id;
});
