angular.module('PlayerModule').controller('GalleryController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {

  $("#gallery-btn").click(function() {
    $("#space-for-photos").empty();
    $("#space-for-videos").empty();
    for (var i = 0; i < 8; i++) {
      createGalleryConteiner($compile, $scope, "photo");
    }
    for (var i = 0; i < 4; i++) {
      createGalleryConteiner($compile, $scope, "video");
    }
  });

}]);


angular.module('PlayerModule').directive("fileread", ['$http', function($http) {
  return {
    scope: {
      fileread: "="
    },
    link: function(scope, element, attributes) {
      element.bind("change", function(changeEvent) {
        var reader = new FileReader();
        reader.onload = function(loadEvent) {
          scope.$apply(function() {
            var data = loadEvent.target.result;
            var secureFile = data.match(/^data:image\/(png|jpg|jpeg)/) != null ? true : false;
            if (secureFile) {
              // Check file size
              if (changeEvent.target.files[0].size < 1000000) {
                var selectImage = $(element).parent();
                $(selectImage[0]).css({
                  "display": "none"
                });
                var previewImage = $(element).parent().next();
                $(previewImage[0]).css({
                  "display": "block",
                  "background-image": "url(" + data + ")",
                  "background-size": "cover",
                  "background-repeat": "no-repeat"
                });

                // Upload Image
                var fd = new FormData();
                fd.append('file', changeEvent.target.files[0]);
                $http.post('/user/gallery/photos', fd, {
                  transformRequest: angular.identity,
                  headers: {
                    'Content-Type': undefined
                  }
                }).then(function successCallback(response) {
                  console.log(response);
                }, function errorCallback(response) {
                  console.log(response);
                });

              } else {
                addFeedback("El tamaño de la imagen tiene q ser menor a 1MB");
              }
            } else {
              addFeedback("Debes de adjuntar una imagen");
            }
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);

      });
    }
  }
}]);


var createGalleryConteiner = function(compile, scope, model) {
  var containerName, image;
  if (model == "photo") {
    containerName = 'space-for-photos';
    image = 'photo.png';
  } else {
    containerName = 'space-for-videos';
    image = 'video.png'
  }
  angular.element(document.getElementById(containerName)).append(compile(
    '<div class="col-sm-4">' +
    '<div class="photo">' +
    '<img alt="..." src="../images/' + image + '"/>' +
    '<input type="file" fileread/>' +
    '</div>' +
    '<div class="photo-preview">' +
    '</div>' +
    '</div>'
  )(scope));
}
