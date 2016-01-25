angular.module('PlayerModule').controller('ExclusiveController', ['$scope', '$http', function($scope, $http) {
  $scope.exclusive = {};
  $scope.user = {};

  $("#exclusive-btn").click(function() {
    $http({
      method: 'GET',
      url: '/user/exclusive',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      console.log(response);
      $scope.exclusive = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  });

  $scope.update = function() {
    console.log($scope.exclusive);
    // PUT data
    $scope.user.id = $("#userId").val();
    $http({
      method: 'PUT',
      url: '/user/exclusive',
      data: {
        "exclusive": $scope.exclusive,
        "user": $scope.user
      }
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  }
}]);
