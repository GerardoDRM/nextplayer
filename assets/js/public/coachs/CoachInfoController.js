angular.module('CoachInfoModule').controller('CoachInfoController', ['$scope', '$http', function($scope, $http) {
  $scope.basicInfoForm = {};
  $scope.submitCoachForm = function() {

    console.log($scope.user);
    console.log($scope.coach);

    // Submit request to Sails.
    // $http.post('/signup', {
    //     name: $scope.signupForm.name,
    //     lastname: $scope.signupForm.lastname,
    //     email: $scope.signupForm.email,
    //     password: $scope.signupForm.password,
    //     sport: $('#select-sport').find('option:selected').val(),
    //     role: $("#user-type").val()
    //   })
    //   .then(function onSuccess(sailsResponse) {
    //     console.log(sailsResponse);
    //   })
    //   .catch(function onError(sailsResponse) {
    //     console.log(sailsResponse);
    //   })
  }
}]);