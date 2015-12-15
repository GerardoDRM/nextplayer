angular.module('SignupModule').controller('SignupController', ['$scope', '$http', function($scope, $http) {
  $scope.signupForm = {
    availableSports: [
      {id: 'Fútbol americano', name: 'Fútbol americano'},
      {id: 'Fútbol soccer', name: 'Fútbol soccer'},
      {id: 'Basquetball', name: 'Basquetball'},
      {id: 'Tennis', name: 'Tennis'},
      {id: 'Atletismo', name: 'Atletismo'},
      {id: 'Voleiball', name: 'Volseiball'}

    ],
    sport: {id: 'Fútbol americano', name: 'Fútbol americano'} //This sets the default value of the select in the ui
    };

  $scope.submitSignupForm = function() {
    console.log(
          "name:" + $scope.signupForm.name + " " +
          "lastname:" + $scope.signupForm.lastname + " " +
          "email:" + $scope.signupForm.email + " " +
          "password:" + $scope.signupForm.password + " " +
          "sport:" + $scope.signupForm.sport
    );
    // Submit request to Sails.
    // $http.post('/signup', {
    //     name: $scope.signupForm.name,
    //     lastname: $scope.signupForm.lastname,
    //     email: $scope.signupForm.email,
    //     password: $scope.signupForm.password,
    //     sport: $scope.signupForm.sport
    //   })
    //   .then(function onSuccess(sailsResponse) {
    //     window.location = '/user';
    //   })
    //   .catch(function onError(sailsResponse) {
    //     // Handle known error type(s).
    //     // If using sails-disk adpater -- Handle Duplicate Key
    //     var emailAddressAlreadyInUse = sailsResponse.status == 409;
    //
    //     if (emailAddressAlreadyInUse) {
    //       console.log('That email address has already been taken, please try again.');
    //       return;
    //     }
    //
    //   })
  }
}]);
