angular.module('UsersModule').controller('OrgPreviewController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.user = {};
  $scope.org = {};

  $http({
    method: 'GET',
    url: '/user/complete_profile',
    params: {
      "user": $("#userId").val()
    }
  }).then(function successCallback(response) {
      $scope.org = response.data;

      // Create Videos
      var videos = $scope.org.details.videos;
      if (videos !== undefined) {
        for (var i = 0; i < videos.length; i++) {
          if (videos[i] != null) {
            var videoEmbed = checkVideoProvider(videos[i]);
            _createGalleryContainer($compile, $scope, "video", videoEmbed);
          }
        }
      }

      // Add photos to carousel images
      var gallery = $scope.org.details.gallery;
      if (gallery !== undefined) {
        for (var i = 0; i < gallery.length; i++) {
          if (gallery[i] != null) {
            var phrase = gallery[i];
            if (phrase != null) {
              var myRegexp = /uploads\/(.*)/;
              var match = myRegexp.exec(phrase);
              _createGalleryContainer($compile, $scope, "photo", match[0]);
            }
          }
        }
      }

      // Create achivements
      var achivementsList = $scope.org.details.achivements;
      if (achivementsList !== undefined) {
        for (var i = 0; i < achivementsList.length; i++) {
          _createAchivements($compile, $scope, achivementsList[i]);
        }
      }

      // Update Profile Photo
      var profile = $scope.org.profile_photo;
      if (profile !== undefined || profile != null) updatePhotoView($("#profilePhoto"), profile);

    },
    function errorCallback(response) {
      console.log(response);
    });

  $scope.viewDashboard = function() {
    window.location = '/';
  };

  var _createAchivements = function(compile, scope, achivement) {
    angular.element(document.getElementById('space-for-achivements')).append(compile(
      '<div class="row">' +
      '<div class="col-sm-1">' +
      '<p style="color:#2ae92e; font-weight:bold;">' + achivement.achiveYear +
      '</p>' +
      '</div>' +
      '<div class="col-sm-10">' +
      '<p class="body-paragraph">' + achivement.description +
      '</p>' +
      '</div>' +
      '</div>'
    )(scope));
  };

  var _createGalleryContainer = function(compile, scope, model, url) {
    var containerName, image;
    if (model == "photo") {
      containerName = 'space-for-photos';
      if($("#space-for-photos .item").children().length == 0) {
        template = '<div class="item active">' +
          '<div class="carousel-images" style="background: url(../' + url + ') 50% 50% / cover no-repeat"></div>' +
          '</div>';
      } else {
      template = '<div class="item">' +
        '<div class="carousel-images" style="background: url(../' + url + ') 50% 50% / cover no-repeat"></div>' +
        '</div>';
      }
    } else {
      containerName = 'space-for-videos';
      template = '<div class="video-frame">' + url + '</div>';
    }
    angular.element(document.getElementById(containerName)).append(compile(
      template
    )(scope));
  };

}]);
