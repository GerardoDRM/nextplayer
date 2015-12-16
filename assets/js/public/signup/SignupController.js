angular.module('SignupModule').controller('SignupController', ['$scope', '$http', function($scope, $http) {
  $scope.signupForm = {};
  $scope.submitSignupForm = function() {

    // Submit request to Sails.
    $http.post('/signup', {
        name: $scope.signupForm.name,
        lastname: $scope.signupForm.lastname,
        email: $scope.signupForm.email,
        password: $scope.signupForm.password,
        sport: $('#select-sport').find('option:selected').val(),
        role: $("#user-type").val()
      })
      .then(function onSuccess(sailsResponse) {
        window.location = '/user';
      })
      .catch(function onError(sailsResponse) {
        // Handle known error type(s).
        // If using sails-disk adpater -- Handle Duplicate Key
        var emailAddressAlreadyInUse = sailsResponse.status == 409;

        if (emailAddressAlreadyInUse) {
          console.log('That email address has already been taken, please try again.');
          return;
        }

      })
  }
}]);

test: function(req, res) {
          res.view({message:'hello world'});
}
