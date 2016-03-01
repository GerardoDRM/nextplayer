angular.module('UsersModule').controller('CoachInfoController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.user = {};
  $scope.coach = {};
  $scope.born = {};
  $scope.count = 0;
  populateCountries("country", "states");

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


  $http({
    method: 'GET',
    url: '/user/basicinfo',
    params: {
      "user": $("#userId").val()
    }
  }).then(function successCallback(response) {
    $scope.user = response.data["general"];
    // Date Format
    if ($scope.user.born !== undefined) {
      var born = moment($scope.user.born)._d;
      $scope.born.day = born.getDate();
      $scope.born.month = born.getMonth() + 1;
      $scope.born.year = born.getFullYear();
    }
    var experienceList = response.data["details"].experience;
    if (experienceList !== undefined) {
      for (var i = 0; i < experienceList.length; i++) {
        // Check template in use
        if ($("#space-for-experience").length > 0) createExperience(i, $compile, $scope);
        $scope.count++;
        $scope.coach["e" + i] = experienceList[i];
      }
    }
    // Adding video
    if (response.data["details"].video !== undefined && typeof response.data["details"].video == "string") {
      $scope.video = response.data["details"].video;
      var iframe = checkVideoProvider($scope.video);

      var element = $('.video[value="1"]')[0];
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

    } else {
      $scope.video = null;
    }

    // Adding Profile Photo
    var profile = $scope.user.profile_photo;
    if (profile !== undefined && profile != null) {
      var phrase = profile;
      var myRegexp = /uploads\/(.*)/;
      var match = myRegexp.exec(phrase);
      // Profile Photo
      var selectImage = $("#profilePhoto");
      $(selectImage[0]).css({
        "display": "none"
      });
      var previewImage = $(selectImage).next();
      $(previewImage[0]).css({
        "display": "block",
        "background-image": "url(" + match[0] + ")",
        "background-size": "cover",
        "background-repeat": "no-repeat"
      });
    }
    // Adding country and state
    if ($scope.user.country !== undefined) {
      $("#country").val($scope.user.country);
      $("#country").trigger('change');
    }
    if ($scope.user.state !== undefined) $("#states").val($scope.user.state);

    // Adding global sport
    showSport($scope.user.sport_name);
    $("#userSport").val($scope.user.sport_name);
  }, function errorCallback(response) {});

  $scope.update = function() {
    if ($scope.born.day !== undefined && $scope.born.month !== undefined && $scope.born.day != null && $scope.born.month != null) {
      var birth = new Date($scope.born.year, $scope.born.month - 1, $scope.born.day).toISOString();
      var age = getAge(birth);
      if (age < 8) {
        addFeedback("Fecha de nacimiento incorrecta o formato de fecha inválido", 'error');
        return;
      }
    } else {
      addFeedback("Fecha de nacimiento incorrecta o formato de fecha inválido", 'error');
      return;
    }

    if ($("#coach-form").valid()) {
      var experienceList = [];
      for (var experience in $scope.coach) {
        experienceList.push($scope.coach[experience]);
      }
      var exp = {
        "experience": experienceList,
        "video": $scope.video
      };
      console.log($scope.video);
      // Adding state and Country
      $scope.user.state = $("#states").val();
      $scope.user.country = $("#country").val();
      // PUT data
      $scope.user.born = birth;
      $scope.user.id = $("#userId").val();
      $http({
        method: 'PUT',
        url: '/user/basicinfo',
        data: {
          "user": $scope.user,
          "applicant": exp
        }
      }).then(function successCallback(response) {
        if (response.data == 500) {
          addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
        } else {
          addFeedback("Tus datos han sido almacenados exitosamente", 'success');
        }
      }, function errorCallback(response) {
        ddFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      });
    }
  };

  $scope.storeVideo = function() {
    if ($("#video-form").valid()) {
      var iframe = checkVideoProvider($scope.video);
      if (iframe != 500) {
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
      }
    }
  };

  $scope.showVideoURL = function($event) {
    $scope.selectedVideo = $($event.target).is("img") ? $($event.target).parent().prev().val() : $($event.target).prev().val();
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
    // Clean
    $scope.video = null;
    console.log($scope.video);

  };

  $scope.viewProfile = function() {
    window.location = '/profile/' + $("#userId").val();
  }

  $scope.viewDashboard = function() {
    window.location = '/';
  }
}]);


// Create Dynamic experience rows
var createExperience = function(i, compile, scope) {
  angular.element(document.getElementById('space-for-experience')).append(compile(
    '<div class="coach-container no-margin--sides"><div class="row coach-row" style="border-color: #ccc;">' +
    '<h3> Experiencia </h3> <div class="col-sm-6"> <div class="row"> <div class="col-sm-6"> <div class="form-group-modified">' +
    '<label >Equipo</label></div></div><div class="col-sm-6">' +
    '<input class="form-group-modified-input" name="team" ng-model="coach.e' + i + '.team" type="text" >' +
    '</div> </div><div class="row"><div class="col-sm-6"><div class="form-group-modified"><label >Posición</label></div></div>' +
    '<div class="col-sm-6">' +
    '<input class="form-group-modified-input" name="position" ng-model="coach.e' + i + '.position" type="text"> ' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<div class="row">' +
    '<div class="col-sm-6">' +
    '<div class="form-group-modified">' +
    '<label >Fechas</label>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<div class="years">' +
    '<select id="years-list" name="start" ng-model="coach.e' + i + '.startYear" ng-options="n for n in [] | range:1960:2016"></select>' +
    '<select id="twenties-list" name="end" ng-model="coach.e' + i + '.endYear" ng-options="n for n in [] | range:1960:2016"></select>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-sm-6">' +
    '<div class="form-group-modified">' +
    '<label >Descripción/Logros</label>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<textarea class="form-group-modified-input" name="awards" ng-model="coach.e' + i + '.award" rows="3" type="text"></textarea>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  )(scope));
};

angular.module('UsersModule').directive("experience", function($compile) {
  return function(scope, element, attrs) {
    element.bind("click", function() {
      createExperience(scope.count, $compile, scope);
      scope.count++;
    });
  };
});
