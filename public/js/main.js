(function() {
  'use strict';

  angular.module('spherical-test', [])
    .controller('SphericalController', ['$scope', '$http',
      function($scope, $http) {
        $scope.calculate = function() {
          $http.post('/calculate', $scope.formData)
            .success(function(data, status, headers, config) {
              console.log(data)
            })
            .error(function(data, status, headers, config) {
              console.log(data)
            });
        };
    }
  ]);
})();
