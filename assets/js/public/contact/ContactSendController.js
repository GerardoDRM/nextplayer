angular.module('ContactSendModule').controller('ContactSendController', ['$scope', '$http', function($scope, $http) {
  $scope.mail = {};
  $scope.sendMessage = function() {
    if ($("#form-contact").valid()) {
      // Submit request to Sails.
      $http.post('/contact', {
          name: $scope.mail.name,
          email: $scope.mail.email,
          subject: $scope.mail.subject,
          message: $scope.mail.message
        })
        .then(function onSuccess() {
          addFeedback("Tu mensage ha sido enviado exitosamente", 'success');
        })
        .catch(function onError(sailsResponse) {
          addFeedback('Ha ocurrido un error inesperado por favor intente nuevamente', 'error');
          return;
        });
    }
  };
}]);
