angular.module('UsersModule').controller('ProfileViewController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.user = {};
  $scope.coach = {};

  // Close Modal Dialog for Gallery
  $('#dialogGallery').click(function() {
    $("#dialogGallery").css({
      opacity: 0,
      "pointer-events": "none"
    });
  });
  // Check false propagation
  $('.dialogGallery').click(function(e) {
    e.stopPropagation();
  });


  $http({
    method: 'GET',
    url: '/user/complete_profile',
    params: {
      "user": $("#userId").val()
    }
  }).then(function successCallback(response) {
    $scope.user = response.data;
    var status = $scope.user.status;

    if (status == 1) {
      $("#exclusiveViews").css({"display":"block"});
      $("#exclusiveMe").css({"display":"block"});
    } else {
      $("#exclusiveViews").css({"display":"none"});
      $("#exclusiveMe").css({"display":"none"});
    }

    if ($scope.user.role == "player") {
      // Players stuff
      var counterPhotos = status == 0 ? 4 : 8;
      var counterVideos = status == 0 ? 1 : 4;

      // Players Sports
      var sport = $scope.user.sport;
      $scope.user.pos = "";
      for (var i in sport.positions) {
        $scope.user.pos += sport.positions[i] + " ";
      }

      // Create gallery
      var gallery = $scope.user.details.gallery;
      if (gallery !== undefined) {
        for (var i = 0; i < counterPhotos; i++) {
          var phrase = gallery[i];
          if (phrase != null) {
            var myRegexp = /uploads\/(.*)/;
            var match = myRegexp.exec(phrase);
            console.log(match);
            _createGalleryContainer($compile, $scope, "photo", match[0]);
          }
        }
      }
      // Create Videos
      var videos = $scope.user.details.videos;
      if (videos !== undefined) {
        for (var i = 0; i < counterVideos; i++) {
          if (videos[i] != null) {
            var videoEmbed = checkVideoProvider(videos[i]);
            _createGalleryContainer($compile, $scope, "video", videoEmbed);
          }
        }
      }
    } else if ($scope.user.role == "coach") {
      // Coaches stuff
      var experienceList = $scope.user.details.experience;
      if (experienceList !== undefined) {
        for (var i = 0; i < experienceList.length; i++) {
          // Check template in use
          createProfileExperience(i, $compile, $scope);
          $scope.coach["e" + i] = experienceList[i];
        }
      }
    }

    // Update Profile Photo
    var profile = $scope.user.profile_photo;
    if (profile !== undefined || profile != null) updatePhotoView($("#profilePhoto"), profile);

  }, function errorCallback(response) {
    console.log(response);
  });

  $scope.viewDashboard = function() {
    window.location = '/';
  };

  $scope.showPhoto = function($event) {
    $("#dialogGallery .dialogGallery").css({
      "background": $($event.target).css("background")
    });
    $("#dialogGallery").css({
      "opacity": 1,
      "pointer-events": "auto"
    });
  };

  var _createGalleryContainer = function(compile, scope, model, url) {
    var containerName, image;
    if (model == "photo") {
      containerName = 'space-for-photos';
      template = '<div class="col-sm-3">' +
        '<div class="profile-photos-slide" style="background: url(../' + url + ') 50% 50% / cover no-repeat" ng-click="showPhoto($event)"></div>'
      '</div>';
    } else {
      containerName = 'space-for-videos';
      template = '<div class="video-frame">' + url + '</div>';
    }
    angular.element(document.getElementById(containerName)).append(compile(
      template
    )(scope));
  }

}]);


var updatePhotoView = function(element, url) {
  var phrase = url;
  var myRegexp = /uploads\/(.*)/;
  var match = myRegexp.exec(phrase);

  $(element).css({
    "display": "block",
    "background-image": "url(../" + match[0] + ")",
    "background-size": "cover",
    "background-repeat": "no-repeat"
  });
}



// Create Dynamic experience rows
var createProfileExperience = function(i, compile, scope) {
  angular.element(document.getElementById('profile-experience')).append(compile(
    '<div class="row">' +
    '<div class="col-sm-12">' +
    '<h2 class="head-title">Experiencia</h2>' +
    '<div class="row">' +
    '<div class="col-xs-2">' +
    '<p>Equipo</p>' +
    '</div>' +
    '<div class="col-xs-9">' +
    '<p class="green-title">{{ coach.e' + i + '.team }}</p>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-xs-2">' +
    '<p>Fechas</p>' +
    '</div>' +
    '<div class="col-xs-9">' +
    '<p class="green-title"> {{ coach.e' + i + '.startYear }} - {{ coach.e' + i + '.endYear }}</p>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-xs-2">' +
    '<p>Posición</p>' +
    '</div>' +
    '<div class="col-xs-9">' +
    '<p class="green-title"> {{ coach.e' + i + '.position }} </p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-12 middle-profile">' +
    '<h3 class="head-title ">Logros</h3>' +
    '<p class="border-column-botom ">{{ coach.e' + i + '.award }}</p>' +
    '</div>' +
    '</div>'
  )(scope));
};
