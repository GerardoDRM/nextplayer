angular.module('UsersModule').controller('BasicInfoController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  populateCountries("countries-list", "states-list");
  // Create Countries and states
  $scope.user = {};
  $scope.player = {};
  $scope.sport = {};
  $http({
    method: 'GET',
    url: '/user/basicinfo',
    params: {
      "user": $("#userId").val()
    }
  }).then(function successCallback(response) {
    $scope.user = response.data["general"];
    $scope.user.id = $("#userId").val();
    $scope.player = response.data["details"];
    $scope.status = response.data["status"];
    if ($scope.status == 1) {
      $("#club-message").css({
        "display": "none"
      });
    }
    // Date Format
    if ($scope.user.born !== undefined) {
      if(getAge($scope.user.born) < 18) {
        $("#datepicker").trigger("change");
      }
      $scope.user.born = moment($scope.user.born).format('DD-MM-YYYY');
    }

    var profile = $scope.user.profile_photo;
    if (profile !== undefined) {
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
      $("#countries-list").val($scope.user.country);
      $("#countries-list").trigger('change');
    }
    if ($scope.user.state) $("#states-list").val($scope.user.state);

    // Adding global sport
    if ($scope.user.sport_name != '' || $scope.user.sport_name !== undefined) {
      $("#userSport").val($scope.user.sport_name);
      showSport($scope.user.sport_name);
    } else {
      $("#dialogSport").css({
        "opacity": 1,
        "pointer-events": "auto"
      });
    }
    delete $scope.user.sport_name;
  }, function errorCallback(response) {});

  // Birth Year change
  $("#datepicker").change(function() {
    _addTutor($scope, $compile);
  });

  // // In case use has not sport pre selected when sign in
  // $scope.storeSport = function() {
  //   if ($scope.sport.title !== undefined) {
  //     $http({
  //       method: 'PUT',
  //       url: '/user/sport',
  //       data: {
  //         "user": $scope.user,
  //         "sport": $scope.sport
  //       }
  //     }).then(function successCallback(response) {
  //       if (response.data == 500) {
  //         addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
  //       } else {
  //         addFeedback("Tus datos han sido guardados exitosamente", 'success');
  //         $("#dialogSport").css({
  //           "opacity": 0,
  //           "pointer-events": "none"
  //         });
  //         $("#userSport").val($scope.sport.title);
  //       }
  //     }, function errorCallback(response) {
  //       addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
  //     });
  //   }
  // };

  $scope.update = function() {
    // Adding state and Country
    $scope.user.state = $("#states-list").val();
    $scope.user.country = $("#countries-list").val();
    // PUT data
    $scope.user.born = moment($("#datepicker").val(), "DD-MM-YYYY").toISOString();
    $scope.user.id = $("#userId").val();
    if($("#basic-player-form").valid()) {
      $http({
        method: 'PUT',
        url: '/user/basicinfo',
        data: {
          "user": $scope.user,
          "applicant": $scope.player
        }
      }).then(function successCallback(response) {
        if (response.data == 500) {
          addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
        } else {
          addFeedback("Tus datos han sido guardados exitosamente", 'success');
        }
      }, function errorCallback(response) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      });
    }
  };

  var _addTutor = function(scope, compile) {
    angular.element(document.getElementById('tutor')).append(compile(
      '<div class="row">' +
      '<div class="col-sm-6">' +
      '<div class="form-group-modified">' +
      '<label>Nombre del Tutor</label>' +
      '</div>' +
      '</div>' +
      '<div class="col-sm-6">' +
      '<input class="form-group-modified-input" name="name_tutor" ng-model="user.tutor_name" type="text" required>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-sm-6">' +
      '<div class="form-group-modified">' +
      '<label>E-mail del tutor</label>' +
      '</div>' +
      '</div>' +
      '<div class="col-sm-6">' +
      '<input class="form-group-modified-input" name="email_tutor" ng-model="user.tutor_email" type="email" required>' +
      '</div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-sm-6">' +
      '<div class="form-group-modified">' +
      '<label>Parentesco del titular</label>' +
      '</div>' +
      '</div>' +
      '<div class="col-sm-6">' +
      '<input class="form-group-modified-input" name="mdoel_tutor" ng-model="user.tutor_model" type="text" required>' +
      '</div>' +
      '</div>'
    )(scope));
  }

}]);
