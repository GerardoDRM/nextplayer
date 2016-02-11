angular.module('UsersModule').controller('OrgPreviewController', ['$scope', '$http', '$compile', '$q', function($scope, $http, $compile, $q) {
  $scope.user = {};
  $scope.org = {};

  // ChecK if user is looking for his own profile
  if($("#userId").val() != $("#previewId").val()) {
    $("#editProfile1").css({display:"none"});
    $("#editProfile2").css({display:"none"});
    $("#follow1").css({display:"block"});
    $("#follow2").css({display:"block"});
  } else {
    $("#editProfile1").css({display:"display"});
    $("#editProfile2").css({display:"display"});
    $("#follow1").css({display:"none"});
    $("#follow2").css({display:"none"});
  }


  $http({
    method: 'GET',
    url: '/user/complete_profile',
    params: {
      "user": $("#previewId").val()
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

  $scope.follow = function() {
      $scope.following = $http({
        method: 'PUT',
        url: '/following',
        data: {"user":$("#userId").val(), "following": $("#previewId").val()}
      });
      $scope.followed = $http({
        method: 'PUT',
        url: '/followed',
        data: {"followed":$("#userId").val(), "user": $("#previewId").val()}
      });
      $q.all([$scope.following, $scope.followed]).then(function(results) {
        console.log(results);
      });
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
