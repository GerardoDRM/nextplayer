angular.module('PlayerModule').controller('GalleryController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $("#gallery-btn").click(function() {
    $("#space-for-photos").empty();
    $("#space-for-videos").empty();
    for(var i=0; i<8; i++) {
      createGalleryConteiner($compile, $scope, "photo");
    }
    for(var i=0; i<4; i++) {
      createGalleryConteiner($compile, $scope, "video");
    }
  });
}]);

var createGalleryConteiner = function(compile, scope, model) {
  var containerName, image;
  if(model == "photo") {
    containerName = 'space-for-photos';
    image = 'photo.png';
  } else {
    containerName = 'space-for-videos';
    image = 'video.png'
  }
  angular.element(document.getElementById(containerName)).append(compile(
    '<div class="col-sm-4">' +
    '<div class="photo">' +
    '<img alt="..." src="../images/'+ image +'">' +
    '</div>' +
    '</div>'
  )(scope));
}
