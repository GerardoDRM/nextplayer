angular.module('UsersModule').controller('AccessController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.access = {};
  $scope.count = 0;

  $("#access-btn").click(function() {
    // Clean space
    $("#space-for-access").empty();
    $http({
      method: 'GET',
      url: '/user/org/access',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      var accessList = response.data;
      if (accessList !== undefined) {
        for (var i = 0; i < accessList.length; i++) {
          // Check template in use
          if ($("#space-for-access").length > 0) createAccess(i, $compile, $scope);
          $scope.count++;
          $scope.access["s" + i] = accessList[i];
          $("#accessRef" + i).val(i);
        }
      }
    }, function errorCallback(response) {});
  });



  $scope.update = function() {
    var accessList = [];
    for (var access in $scope.access) {
      accessList.push($scope.access[access]);
    }
    // PUT data
    $http({
      method: 'PUT',
      url: '/user/org/access',
      data: {
        "user": $("#userId").val(),
        "access": accessList
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
        url: '/user/org/access',
        data: {
          "position": position,
          "user": $("#userId").val()
        }
      }).then(function successCallback(response) {
        addFeedback("Se ha removido un logro", "success");
        $("#access-btn").trigger("click");
      }, function errorCallback(response) {});
    }
    // Delete from list and update status
    $(deleteEvent).parent().remove();
    $scope.count -= 1;
  }
}]);


// Create Dynamic experience rows
var createAccess = function(i, compile, scope) {
  angular.element(document.getElementById('space-for-access')).append(compile(
    '<div class="col-sm-6">' +
    '<h4>Acceso ' + (i + 1) + '</h4>' +
    '<a class="anchor-coach" style="color:red;" href="javascript:void(0);" ng-click="deleteComplete($event);">-Remover Acceso</a>' +
    '<input type="hidden" id="accessRef' + i + '">' +
    '<div class="row">' +
    '<div class="col-sm-6">' +
    '<div class="form-group-modified">' +
    '<label>Nombre</label>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<input class="form-group-modified-input" ng-model="access.s' + i + '.name" type="text">' +
    '</div>' +
    '</div></div>'
  )(scope));
};

angular.module('UsersModule').directive("access", function($compile) {
  return function(scope, element, attrs) {
    element.bind("click", function() {
      if (scope.count < 10) {
        createAccess(scope.count, $compile, scope);
        scope.count++;
      }
    });
  };
});
