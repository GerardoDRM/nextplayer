angular.module('UsersModule').controller('BasicInfoController', ['$scope', '$http', function($scope, $http) {
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
    console.log( response.data);
    $scope.user = response.data["general"];
    $scope.user.id = $("#userId").val();
    $scope.player = response.data["details"];
    $scope.status = response.data["status"];
    if($scope.status == 1) {
      $("#club-message").css({"display":"none"});
    }
    var profile = $scope.user.profile_photo;
    if(profile !== undefined) {
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
    if($scope.user.country) {
      $("#countries-list").val($scope.user.country);
      $("#countries-list").trigger('change');
    }
    if($scope.user.state) $("#states-list").val($scope.user.state);

    // Adding global sport
    if($scope.user.sport_name != '' || $scope.user.sport_name === undefined)
      $("#userSport").val($scope.user.sport_name);
    else {
      $("#dialogSport").css({"opacity": 1, "pointer-events": "auto"});
    }
    delete $scope.user.sport_name;
  }, function errorCallback(response) {
    console.log(response);
  });

  // In case use has not sport pre selected when sign in
  $scope.storeSport = function() {
    if($scope.sport.title !== undefined) {
      $http({
        method: 'PUT',
        url: '/user/sport',
        data: {
          "user": $scope.user,
          "sport": $scope.sport
        }
      }).then(function successCallback(response) {
        if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
        else{
          addFeedback("Tus datos han sido guardados exitosamente", 'success');
          $("#dialogSport").css({"opacity": 0, "pointer-events": "none"});
          $("#userSport").val($scope.sport.title);
        }
      }, function errorCallback(response) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      });
    }
  };

  $scope.update = function() {
    // Adding state and Country
    $scope.user.state = $("#states-list").val();
    $scope.user.country = $("#countries-list").val();
    // PUT data
    $scope.user.born = $("#datepicker").val();
    $scope.user.id = $("#userId").val();
    $http({
      method: 'PUT',
      url: '/user/basicinfo',
      data: {
        "user": $scope.user,
        "applicant": $scope.player
      }
    }).then(function successCallback(response) {
      if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
      else{addFeedback("Tus datos han sido guardados exitosamente", 'success');}
    }, function errorCallback(response) {
      addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
    });
  };

}]);
