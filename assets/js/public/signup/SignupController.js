angular.module('SignupModule').controller('SignupController', ['$scope', '$http', function($scope, $http) {
  $scope.signupForm = {};
  $scope.submitSignupForm = function() {
    if($("#form-signup").valid()) {
      var userModel = $("#user-type").val();
      var data = {
          name: $scope.signupForm.name,
          lastname: $scope.signupForm.lastname,
          email: $scope.signupForm.email,
          password: $scope.signupForm.password,
          role: $("#user-type").val()
        };
      if (userModel == "organization") {
        data.organization_name = $scope.signupForm.organization_name;
      } else {
        if(userModel == "coach") {
          data.model = $("#modelCoach").val();
        }
        data.sport = $('#select-sport').find('option:selected').val();
      }
      // Submit request to Sails.
    $http.post('/signup', data)
      .then(function onSuccess(sailsResponse) {
        window.location = "/checkemail";
      })
      .catch(function onError(sailsResponse) {
        addFeedback('Este email ya esta ocupado por algún otro usuario, intente con uno diferente', 'error');
        return;
      });
    }
  }
}]);
