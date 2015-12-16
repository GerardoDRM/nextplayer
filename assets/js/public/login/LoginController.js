angular.module('LoginModule').controller('LoginController', ['$scope', '$http', function($scope, $http){

	$scope.submitLoginForm = function (){

    // Submit request to Sails.
    $http.put('/login', {
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    })
    .then(function onSuccess (){
      // Refresh the page now that we've been logged in.
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
        console.log('Invalid email/password combination.');
        return;
      }

				console.log('An unexpected error occurred, please try again.');
				return;

    });
  };


}]);
