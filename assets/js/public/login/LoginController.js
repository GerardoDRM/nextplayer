angular.module('LoginModule').controller('LoginController', ['$scope', '$http', function($scope, $http) {
  $scope.loginForm = {};
  $scope.submitLoginForm = function() {

		if($("#form-login").valid()) {
			// Submit request to Sails.
	    $http.put('/login', {
	        email: $scope.loginForm.email,
	        password: $scope.loginForm.password
	      })
	      .then(function onSuccess() {
	        // Refresh the page now that we've been logged in.
	        window.location = '/';
	      })
	      .catch(function onError(sailsResponse) {
	        // Handle known error type(s).
	        // Invalid username / password combination.
	        if (sailsResponse.status === 400 || 404) {
	          addFeedback('La combinacion de email/password es invalida', 'error');
	          return;
	        }
	        addFeedback('Ha ocurrido un error inesperado por favor intente nuevamente', 'error');
	        return;

	      });
		}
  };


}]);
