angular.module('UsersModule').controller('ForgotPasswordController', ['$scope', '$http',  function($scope, $http) {
  $scope.submitForgotForm = function (){
    if($("#form-forgot").valid()) {
      // Submit request to Sails.
      $http.post('/forgot', {
        email: $scope.email
      })
      .then(function onSuccess (result){
        if(result.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
        else {addFeedback("Se le ha enviado un correo para poder restaurar su password", 'success');}

      })
      .catch(function onError(sailsResponse) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      });
    }
  };
  $scope.submitResetForm = function (){
    if($("#form-reset").valid()) {
      // Submit request to Sails.
      $http.post('/reset/' + $("#token").val(), {
        password: $scope.password
      })
      .then(function onSuccess (result){
        if(result.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
        else{addFeedback("Tú password ha sido cambiada", 'success');}
      })
      .catch(function onError(sailsResponse) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      });
    }
  };
}]);
