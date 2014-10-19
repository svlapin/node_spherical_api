(function() {
  'use strict';

  angular.module('spherical-test', [])
    .controller('SphericalController', ['$scope', '$http',
      function($scope, $http) {
        $scope.calculate = function() {
          $http.post('/calculate', $scope.formData)
            .success(function(data, status, headers, config) {
              $scope.error = null;
              $scope.response = data;
            })
            .error(function(data, status, headers, config) {
              $scope.error = data;
              $scope.response = null;
            });
        };

        $scope.formatMinutes = function(mins) {
          var hrs = Math.floor(mins / 60);
          var str = '';

          if (hrs > 0) {
            str += hrs.toString() + ' hours';
            mins -= hrs * 60;
          }

          if (Math.floor(mins) > 0) {
            str += ' ' + Math.floor(mins).toString() + ' minutes';
          }

          var secs = Math.round((mins - Math.floor(mins)) * 60);
          if (secs > 0) {
            str += ' ' + secs.toString() + ' seconds';
          }

          return str.trim();
        };
    }
  ]);
})();
