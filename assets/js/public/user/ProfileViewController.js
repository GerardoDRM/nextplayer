angular.module('UsersModule').controller('ProfileViewController', ['$scope', '$http', '$compile' ,'$q', function($scope, $http, $compile, $q) {
  $scope.user = {};
  $scope.coach = {};
  $scope.flag_views = false;

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

  // Show your views
  $scope.views = function() {
    $http({
      method: 'GET',
      url: '/user/player/viewer',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      var viewsList = response.data;
      for (var i = 0; i < viewsList.length; i++) {
        _createView($compile, $scope, viewsList[i]);
      }
    }, function errorCallback(response) {});
  };

  // Add views if team is watching you
  $scope.viewer = function() {
    $http({
      method: 'PUT',
      url: '/user/org/viewer',
      data: {
        "viewer": $("#userId").val(),
        "user": $("#previewId").val()
      }
    }).then(function successCallback(response) {
    }, function errorCallback(response) {});
  };

  // ChecK if user is looking for his own profile
  if ($("#userId").val() != $("#previewId").val()) {
    $("#editProfile1").css({
      display: "none"
    });
    $("#editProfile2").css({
      display: "none"
    });
    // Just if it is an active recruiter
    if($("#recruiter").val() !== undefined && $("#recruiter").val() != ""){
      $("#follow1").css({
        display: "block"
      });
      $("#follow2").css({
        display: "block"
      });
    } else {
      $("#follow1").css({
        display: "none"
      });
      $("#follow2").css({
        display: "none"
      });
    }
    // Add View to User
    $scope.viewer();
  } else {
    $("#editProfile1").css({
      display: "display"
    });
    $("#editProfile2").css({
      display: "display"
    });
    $("#follow1").css({
      display: "none"
    });
    $("#follow2").css({
      display: "none"
    });
    // Show your viwes
    $scope.flag_views = true;
  }

  $http({
    method: 'GET',
    url: '/user/complete_profile',
    params: {
      "user": $("#previewId").val()
    }
  }).then(function successCallback(response) {
    $scope.user = response.data;
    var status = $scope.user.status;

    // Changing format Date
    if ($scope.user.born !== undefined || $scope.user.born != "") {
      $scope.user.age = getAge($scope.user.born);
      $scope.user.born = moment($scope.user.born).format('DD-MM-YYYY');
    }

    if (status == 1) {
      $("#exclusiveMe").css({
        "display": "block"
      });
    } else {
      $("#exclusiveMe").css({
        "display": "none"
      });
    }

    if ($scope.user.role == "player") {
      // Add views
      if (status == 1 && $scope.flag_views) {
        $("#exclusiveViews").css({
          "display": "block"
        });
        $scope.views();
      } else {
        $("#exclusiveViews").css({
          "display": "none"
        });
      }
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
      if (profile !== undefined && profile != null) {
        for (var i = 0; i < counterPhotos; i++) {
          var phrase = gallery[i];
          if (phrase != null) {
            var myRegexp = /uploads\/(.*)/;
            var match = myRegexp.exec(phrase);
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
      // Create Videos
      var video = $scope.user.details.video;
      if (video !== undefined) {
        var videoEmbed = checkVideoProvider(video);
        _createGalleryContainer($compile, $scope, "video", videoEmbed);
      }
    }

    // Adding global sport
    if($scope.user.sport.title !== undefined){
      showSport($scope.user.sport.title);
    }

    // Update Profile Photo
    var profile = $scope.user.profile_photo;
    if (profile !== undefined || profile != null) updatePhotoView($("#profilePhoto"), profile);

  }, function errorCallback(response) {
    addFeedback("Ha ocurrido un error, intente en otro momento", "error");
  });

  $scope.viewDashboard = function() {
    window.location = '/';
  };

  $scope.follow = function() {
    $scope.following = $http({
      method: 'PUT',
      url: '/following',
      data: {
        "user": $("#userId").val(),
        "following": $("#previewId").val(),
        "recruiter": $("#recruiter").val()
      }
    });
    $scope.followed = $http({
      method: 'PUT',
      url: '/followed',
      data: {
        "followed": $("#userId").val(),
        "user": $("#previewId").val()
      }
    });
    $q.all([$scope.following, $scope.followed]).then(function(results) {
      addFeedback("Usted está siguendo a " + $scope.user.name, "success");
    });
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

  var _createView = function(compile, scope, view) {
    var phrase = view.profile_photo;
    var myRegexp = /uploads\/(.*)/;
    var match = myRegexp.exec(phrase);
    var url = "";
    if (phrase != null && phrase !== undefined) {
      url = 'style="background: url(../' + match[0] + ') 50% 50% / cover no-repeat"';
    }

    angular.element(document.getElementById("space-for-views")).append(compile(
      '<div class="col-xs-4 col-sm-3">' +
      '<a href="/profile/'+ view._id +'" style="background: transparent;">' +
      '<div class="profile-photos-slide-exclusive" ' + url + '></div></a>' +
      '</div>'
    )(scope));

  }

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
