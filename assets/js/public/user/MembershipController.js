angular.module('UsersModule').controller('MembershipController', ['$scope', '$http', function($scope, $http) {
  $scope.membership = {};
  $scope.user = {};
  $scope.group = {
    "s1": {
      "title": "Players Club",
      "amount": 1500,
      "level": 1
    }
  };


  $("#membership-btn").click(function() {
    $http({
      method: 'GET',
      url: '/user/membership',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      console.log(response);
      $scope.membership = response.data;
      if ($scope.membership.level !== undefined || $scope.membership.level > 0) {
        $scope.membership.group = {}
        $scope.membership.group.s1 = true;
        $("#membership-form :input").prop("disabled", true);
        $("#buyBtn").css({
          "display": "none"
        });
      }
      if ($scope.membership.name === undefined) $("#cancelBtn").css({
        "display": "none"
      });
      else $("#cancelBtn").css({
        "display": "block"
      });

    }, function errorCallback(response) {});
  });

  $scope.buy = function() {
    for (var i in $scope.membership.group) {
      if ($scope.membership.group[i] == true) {
        $scope.membership.selected_group = $scope.group[i].title;
        $scope.membership.amount = $scope.group[i].amount;
        $scope.membership.level = $scope.group[i].level;
        // PUT data
        buyMembership($scope, $http);
        $("#membership-btn").trigger('click');
      }
    }
  };

  $scope.buyClub = function() {
    $scope.membership.selected_group = "Recruiter Club";
    $scope.membership.amount = 35000;
    $scope.membership.level = 1;
    // PUT data
    buyMembership($scope, $http);
    setTimeout(function() {
      window.location = "/";
    }, 5000);

  };

  $scope.delete = function() {
    // PUT data
    $scope.user.id = $("#userId").val();
    $http({
      method: 'DELETE',
      url: '/user/membership',
      data: {
        "user": $scope.user
      }
    }).then(function successCallback(response) {
      if (response.data == 500) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      } else {
        addFeedback("Tu tarjeta ha sido retirada del sistema", 'success');
      }
      $("#membership-btn").trigger("click");
    }, function errorCallback(response) {
      addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
    });
  }
}]);


var buyMembership = function($scope, $http) {
  if ($("#membership-form").valid()) {
    $scope.user.id = $("#userId").val();
    $http({
      method: 'PUT',
      url: '/user/membership',
      data: {
        "membership": $scope.membership,
        "user": $scope.user
      }
    }).then(function successCallback(response) {
      if (response.data == 500) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      } else {
        addFeedback("Tu compra se ha realizado de manera exitosa", 'success');
      }
    }, function errorCallback(response) {
      addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
    });
  }
}
