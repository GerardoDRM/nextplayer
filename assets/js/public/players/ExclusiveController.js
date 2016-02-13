angular.module('UsersModule').controller('ExclusiveController', ['$scope', '$http', function($scope, $http) {
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
      $scope.exclusive = response.data;
      if($scope.exclusive.status == 0) {
        $("#exclusive-form :input").prop("disabled", true);
      }
    }, function errorCallback(response) {
    });
  });

  $scope.update = function() {
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
      if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
      else{addFeedback("Tus datos han sido guardados exitosamente", 'success');}
    }, function errorCallback(response) {
      addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
    });
  }
}]);
