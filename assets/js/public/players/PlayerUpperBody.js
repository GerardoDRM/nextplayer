angular.module('PlayerModule').controller('PlayerUpperBody', ['$scope', '$http', function($scope, $http) {
  $scope.user = {};

  $scope.viewProfile = function() {
    window.location = '/profile/' + $("#userId").val();
  }
  
}]);
