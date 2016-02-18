angular.module('UsersModule').controller('GalleryController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.video = {};
  // Close Modal Dialog for Gallery
  $('#dialogVideo').click(function() {
    $("#dialogVideo").css({
      opacity: 0,
      "pointer-events": "none"
    });
  });
  // Check false propagation
  $('.dialogVideo').click(function(e) {
    e.stopPropagation();
  });

  $("#gallery-btn").click(function() {
    // Clean space
    $("#space-for-photos").empty();
    $("#space-for-videos").empty();
    $http({
      method: 'GET',
      url: '/user/gallery',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      var status = response.data["status"];
      var gallery = response.data["gallery"];
      var videos = response.data["videos"];
      var role = response.data["role"];
      var counterPhotos, counterVideos;
      if(role == "organization") {
        counterPhotos = 5;
        counterVideos = 3;
      } else { // Should be a player
        counterPhotos = status == 0 ? 4 : 8;
        counterVideos = status == 0 ? 1 : 4;
      }

      for (var i = 0; i < counterPhotos; i++) {
        _createGalleryConteiner(i, $compile, $scope, "photo");
        if (gallery !== undefined && gallery[i] !== undefined && gallery[i] != null) {
          updatePreview(i, gallery[i]);
        }
      }
      for (var i = 0; i < counterVideos; i++) {
        _createGalleryConteiner(i, $compile, $scope, "video");
        if (videos !== undefined && videos[i] !== undefined && videos[i] != null) {
          updatePreviewVideo(i, videos[i]);
        }
      }
    }, function errorCallback(response) {
    });

  });

  $scope.storeVideo = function() {
    if ($("#video-form").valid()) {
      var iframe = checkVideoProvider($scope.video.url);
      if (iframe != 500) {
        // Upload Video
        $scope.video.position = $scope.selectedVideo;
        $http({
          method: 'POST',
          url: '/user/gallery/videos',
          data: {
            "user": $("#userId").val(),
            "video": $scope.video
          }
        }).then(function successCallback(response) {
          if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
          else{
            addFeedback("Tú video ha sido almacenado", 'success');
            // Change UI preview video
            var videoContainer = $scope.elementVideo;
            $(videoContainer).css({
              "display": "none"
            });
            var previewImage = $(videoContainer).next();
            $(previewImage[0]).css({
              "display": "block"
            });
            var videoSpace = $(previewImage).children('.video-container');
            $(videoSpace).empty();
            $(videoSpace).append(
              iframe
            );
            // Hide modal dialog
            $("#dialogVideo").css({
              "opacity": 0,
              "pointer-events": "none"
            });

            // Send feedback to sockets
            io.socket.post('/videos/notification', {
              user: $("#userId").val()
            });
          }
        }, function errorCallback(response) {
          addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
        });
      }
    }
  };

  $scope.showVideoURL = function($event) {
    $scope.selectedVideo = $($event.target).is("img") ? $($event.target).parent().prev().val() :$($event.target).prev().val();
    $scope.elementVideo = $($event.target).is("img") ? $($event.target).parent()[0] : $event.target;
    $("#dialogVideo").css({
      "opacity": 1,
      "pointer-events": "auto"
    });
  };

  $scope.deleteVideo = function($event) {
    var selectImage = $($event.target).parent().prev();
    $(selectImage[0]).css({
      "display": "block"
    });
    var previewImage = $($event.target).parent();
    $(previewImage[0]).css({
      "display": "none"
    });

    // Check image model
    var video = {};
    var identifier = $(selectImage).prev();
    if (identifier.hasClass("video")) {
      video.position = $(identifier).val();
      $http({
        method: 'DELETE',
        url: '/user/gallery/videos',
        data: {
          "user": $("#userId").val(),
          "video": video
        }
      }).then(function successCallback(response) {
        if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
        else{addFeedback("Tú video ha sido removido", 'success');}
      }, function errorCallback(response) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      });
    }
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
    var identifier = $(selectImage).prev();
    if (identifier.hasClass("gallery")) {
      photo.model = "gallery";
      photo.position = $(identifier).val();
    } else if (identifier.hasClass("profile")) {
      photo.model = 'profile';
    }

    $http({
      method: 'DELETE',
      url: '/user/gallery/photos',
      data: {
        "user": $("#userId").val(),
        "photo": photo
      }
    }).then(function successCallback(response) {
      if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
      else{addFeedback("Tu foto ha sido eliminada", 'success');}
    }, function errorCallback(response) {
      addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
    });

  }

  var _createGalleryConteiner = function(i, compile, scope, model) {
    var containerName, image;
    if (model == "photo") {
      containerName = 'space-for-photos';
      image = 'photo.png';
      template = '<div class="col-sm-4">' +
        '<input type="hidden" class="gallery" value="' + i + '">' +
        '<div class="photo">' +
        '<img alt="..." src="../images/' + image + '"/>' +
        '<input type="file" fileread/>' +
        '</div>' +
        '<div class="photo-preview">' +
        '<div class="inner-filter"><a ng-click="deletePhoto($event)"></a></div>' +
        '</div>' +
        '</div>';
    } else {
      containerName = 'space-for-videos';
      image = 'video.png'
      template = '<div class="col-sm-4">' +
        '<input type="hidden" class="video" value="' + i + '">' +
        '<div class="photo" ng-click="showVideoURL($event)">' +
        '<img alt="..." src="../images/' + image + '"/>' +
        '</div>' +
        '<div class="photo-preview">' +
        '<div class="video-container"></div>' +
        '<a ng-click="deleteVideo($event)"></a>' +
        '</div>' +
        '</div>';
    }
    angular.element(document.getElementById(containerName)).append(compile(
      template
    )(scope));
  }

}]);

var updatePreview = function(i, url) {
  var phrase = url;
  var myRegexp = /uploads\/(.*)/;
  var match = myRegexp.exec(phrase);

  var element = $('.gallery[value="' + i + '"]')[0];
  var defaultPhoto = $(element).next();
  $(defaultPhoto).css({
    "display": "none"
  });
  var previewPhoto = $(defaultPhoto).next();
  $(previewPhoto).css({
    "display": "block",
    "background-image": "url(../" + match[0] + ")",
    "background-size": "cover",
    "background-repeat": "no-repeat"
  });
}

var updatePreviewVideo = function(i, url) {
  var iframe = checkVideoProvider(url);

  var element = $('.video[value="' + i + '"]')[0];
  var defaultPhoto = $(element).next();
  $(defaultPhoto).css({
    "display": "none"
  });
  var previewVideo = $(defaultPhoto).next();
  $(previewVideo[0]).css({
    "display": "block"
  });
  var videoSpace = $(previewVideo).children('.video-container');
  $(videoSpace).empty();
  $(videoSpace).append(
    iframe
  );
}
