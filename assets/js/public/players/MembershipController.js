angular.module('PlayerModule').controller('MembershipController', ['$scope', '$http', function($scope, $http) {
  $scope.membership = {};
  $scope.user = {};

  $("#membership-btn").click(function() {
    $http({
      method: 'GET',
      url: '/user/membership',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      console.log(response);
      $scope.membership = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  });

  $scope.buy = function() {
    console.log($scope.membership);
    // PUT data
    $scope.user.id = $("#userId").val();
    $http({
      method: 'PUT',
      url: '/user/membership',
      data: {
        "membership": $scope.membership,
        "user": $scope.user
      }
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.delete = function() {
    // PUT data
    $scope.user.id = $("#userId").val();
    $http({
      method: 'DELETE',
      url: '/user/membership',
      data: {
        "user": $scope.user
      }
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  }
}]);
