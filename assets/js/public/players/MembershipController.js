angular.module('PlayerModule').controller('MembershipController', ['$scope', '$http', function($scope, $http) {
  $scope.membershipForm = {};
  $scope.submitMembershipForm = function() {

    console.log($scope.membership);

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
