angular.module('UsersModule').controller('BasicInfoOrganization', ['$scope', '$http', function($scope, $http) {
  populateListStates(151, "states-list");
  // Create Countries and states
  $scope.user = {};
  $scope.player = {};
  $http({
    method: 'GET',
    url: '/user/basicinfo',
    params: {
      "user": $("#userId").val()
    }
  }).then(function successCallback(response) {
    $scope.user = response.data["general"];
    $scope.organization = response.data["details"];

    if($scope.organization.address !== undefined &&
      $scope.organization.organization_name !== undefined &&
      $scope.organization.email !== undefined &&
      $scope.organization.about !== undefined) {
        $("#basic_flag").val("1");
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
    if ($scope.user.state) $("#states-list").val($scope.user.state);
  }, function errorCallback(response) {});


  $scope.update = function() {
    if ($("#basic-org-form").valid()) {
      // Adding state and Country
      $scope.user.state = $("#states-list").val();
      // PUT data
      $scope.user.id = $("#userId").val();
      $http({
        method: 'PUT',
        url: '/user/basicinfo',
        data: {
          "user": $scope.user,
          "applicant": $scope.organization
        }
      }).then(function successCallback(response) {
        if (response.data == 500) {
          addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
        } else {
          addFeedback("Tus datos han sido guardados exitosamente", 'success');
          $("#basic_flag").val(1)
        }
      }, function errorCallback(response) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      });
    }
  };

}]);
