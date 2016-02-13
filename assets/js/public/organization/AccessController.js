angular.module('UsersModule').controller('AccessController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.user = {};
  $scope.coach = {};
  $scope.count = 0;

  $scope.update = function() {
    // PUT data
    $http({
      method: 'PUT',
      url: '/user/basicinfo',
      data: {
        "user": $("#userId").val(),
        "access": exp
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
  };
}]);


// Create Dynamic experience rows
var createAccess = function(i, compile, scope) {
  angular.element(document.getElementById('space-for-access')).append(compile(
    '<div class="col-sm-6">' +
    '<h4>Acceso '+ i +'</h4>' +
    '<div class="row">' +
    '<div class="col-sm-6">' +
    '<div class="form-group-modified">' +
    '<label>Nombre</label>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<input class="form-group-modified-input" name="team" ng-model="sport.team" type="text">' +
    '</div>' +
    '</div></div>'
  )(scope));
};

angular.module('UsersModule').directive("access", function($compile) {
  return function(scope, element, attrs) {
    element.bind("click", function() {
      if(scope.count < 10) {
        createAccess(scope.count, $compile, scope);
        scope.count++;
      }
    });
  };
});
