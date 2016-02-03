angular.module('UsersModule').controller('UserUpperBody', ['$scope', '$http', function($scope, $http) {
  $scope.user = {};

  $scope.viewProfile = function() {
    window.location = '/profile/' + $("#userId").val();
  };

  $scope.deletePhoto = function($event) {
    var selectImage = $($event.target).parent().parent().prev();
    $(selectImage[0]).css({
      "display": "block"
    });
    var previewImage = $($event.target).parent().parent();
    $(previewImage[0]).css({
      "display": "none"
    });

    // Check image model
    var photo = {};
    photo.model = 'profile';
    $http({
      method: 'DELETE',
      url: '/user/gallery/photos',
      data: {
        "user": $("#userId").val(),
        "photo": photo
      }
    }).then(function successCallback(response) {
      if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
      else{addFeedback("Tu foto de perfil ha sido retirada", 'success');}
    }, function errorCallback(response) {
      addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
    });

  }

}]);
