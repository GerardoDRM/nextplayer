angular.module('PlayerModule').controller('ProfileViewController', ['$scope', '$http', function($scope, $http) {
  $scope.user = {};
  $http({
    method: 'GET',
    url: '/user/complete_profile',
    params: {
      "user": $("#userId").val()
    }
  }).then(function successCallback(response) {
    console.log(response);
    $scope.user = response.data;
    var sport = $scope.user.sport;
    $scope.user.pos = "";
    for(var i in sport.positions) {
      $scope.user.pos += sport.positions[i] + " ";
    }

  }, function errorCallback(response) {
    console.log(response);
  });


  $scope.viewDashboard = function() {
    window.location = '/';
  }

}]);
