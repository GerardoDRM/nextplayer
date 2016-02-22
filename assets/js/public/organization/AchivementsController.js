angular.module('UsersModule').controller('AchivementsController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.user = {};
  $scope.org = {};
  $scope.count = 0;

  $("#achievements-btn").click(function() {
    // Clean space
    $("#space-for-achivements").empty();
    $http({
      method: 'GET',
      url: '/user/org/achivements',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      var achivementList = response.data["achivements"];

      if(achivementList !== undefined) {
        for (var i = 0; i < achivementList.length; i++) {
          // Check template in use
          if($("#space-for-achivements").length > 0) createAchivement(i, $compile, $scope);
          $scope.count++;
          $scope.org["a" + i] = achivementList[i];
          $("#achivementRef" + i).val(i);
        }
      }
    }, function errorCallback(response) {
    });

  });


  $scope.update = function() {
    var achivementList = [];
    for (var achivement in $scope.org) {
      achivementList.push($scope.org[achivement]);
    }
    // PUT data
    $scope.user.id = $("#userId").val();
    $http({
      method: 'PUT',
      url: '/user/org/achivements',
      data: {
        "user": $scope.user.id,
        "achivements": achivementList
      }
    }).then(function successCallback(response) {
      if (response.data == 500) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      } else {
        addFeedback("Tus datos han sido almacenados exitosamente", 'success');
      }
    }, function errorCallback(response) {
      addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
    });
  };

  $scope.deleteComplete = function($event) {
    var deleteEvent = $event.target;
    var position = parseInt($(deleteEvent).next().val());
    // Remove just from view
    if (!isNaN(position)) {
      $http({
        method: 'DELETE',
        url: '/user/org/achivements',
        data: {
          "position": position,
          "user": $("#userId").val()
        }
      }).then(function successCallback(response) {
        addFeedback("Se ha removido un logro", "success");
        $("#achievements-btn").trigger("click");
      }, function errorCallback(response) {
      });
    }
    // Delete from list and update status
    $(deleteEvent).parent().remove();
    $scope.count -= 1;
  }
}]);


// Create Dynamic experience rows
var createAchivement = function(i, compile, scope) {
  angular.element(document.getElementById('space-for-achivements')).append(compile(
    '<div class="col-md-12" style="margin: 15px auto;">' +
    '<a class="anchor-coach" style="color:red;" href="javascript:void(0);" ng-click="deleteComplete($event);">-Remover Logro</a>' +
    '<input type="hidden" id="achivementRef' + i + '">' +
    '<div class="row">' +
    '<div class="col-sm-6">' +
    '<div class="form-group-modified">' +
    '<label>Año</label>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<select name="year" ng-model="org.a' + i + '.achiveYear" ng-options="n for n in [] | range:1940:2017" style="margin-bottom:10%;"></select>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-sm-6">' +
    '<div class="form-group-modified">' +
    '<label>Descripción</label>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-12">' +
    '<div class="form-group-modified">' +
    '<textarea class="form-control" rows="3" style="background-color:#e9eaed; width:100%;" ng-model="org.a' + i + '.description"></textarea>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  )(scope));
};

angular.module('UsersModule').directive("achivement", function($compile) {
  return function(scope, element, attrs) {
    element.bind("click", function() {
      createAchivement(scope.count, $compile, scope);
      scope.count++;
    });
  };
});
