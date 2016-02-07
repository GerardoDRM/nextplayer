angular.module('UsersModule').controller('StaffController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.user = {};
  $scope.coach = {};
  $scope.count = 0;

  $scope.update = function() {
    var experienceList = [];
    for (var experience in $scope.coach) {
      experienceList.push($scope.coach[experience]);
    }
    var exp = {
      "experience": experienceList
    };
    // PUT data
    $scope.user.born = $("#datepicker").val();
    $scope.user.id = $("#userId").val();
    $http({
      method: 'PUT',
      url: '/user/basicinfo',
      data: {
        "user": $scope.user,
        "applicant": exp
      }
    }).then(function successCallback(response) {
      if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
      else{addFeedback("Tus datos han sido almacenados exitosamente", 'success');}
    }, function errorCallback(response) {
      ddFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
    });
  };
}]);


// Create Dynamic experience rows
var createStaff = function(i, compile, scope) {
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

angular.module('UsersModule').directive("staff", function($compile) {
  return function(scope, element, attrs) {
    element.bind("click", function() {
      if (scope.count < 10) {
        createStaff(scope.count, $compile, scope);
        scope.count++;
      }
    });
  };
});
