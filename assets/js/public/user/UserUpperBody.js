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
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });

  }

}]);
