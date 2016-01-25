angular.module('PlayerModule').controller('SportController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.americanFootball = ["Quarterback", "Linebacker", "Runningback", "Safety", "Wide receiver", "Cornerback", "Tight Endt", "Línea ofensivo", "Línea defensivo"];
  $scope.soccer = ["Portero", "Lateral Izquierdo", "Lateral Derecho", "Central", "Medio de Contención", "Mediocampista", "Extremo Izquierdo", "Extremo Derecho", "Enganche", "Centro Delantero"];
  $scope.voleibol = ["Acomodador", "Esquina", "Central", "Zaguero", "Libero"];
  $scope.basquetbal = ["Base", "Escolta", "Alero", "Ala-Pivot", "Pivot"];
  $scope.selected_sport = [];
  $scope.user = {};
  $scope.sport = {};

  $("#sports-btn").click(function() {
    // Lets check sport and choose just one array from scope
    checkSport($("#userSport").val(), $scope, $compile);

    $http({
      method: 'GET',
      url: '/user/sport',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      console.log(response);
      $scope.sport = response.data;
      $scope.sport.position = {};
      for (var key in $scope.sport.positions) {
        $scope.sport.position[key] = true;
      }
    }, function errorCallback(response) {
      console.log(response);
    });
  });

  $scope.update = function() {
    $scope.sport.positions = {};
    for (var key in $scope.sport.position) {
      if ($scope.sport.position[key]) {
        var pos = key.replace(/^\D+/g, '');
        $scope.sport.positions[key] = $scope.selected_sport[pos];
      }
    }
    // PUT data
    $scope.user.id = $("#userId").val();
    $http({
      method: 'PUT',
      url: '/user/sport',
      data: {
        "sport": $scope.sport,
        "user": $scope.user
      }
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  }

}]);

function checkSport(sport, scope, compile) {
  switch (sport) {
    case "Fútbol americano":
      createPostions(scope.americanFootball, compile, scope);
      scope.selected_sport = scope.americanFootball;
      break;
    case "Fútbol soccer":
      createPostions(scope.soccer, compile, scope);
      scope.selected_sport = scope.soccer;
      break;
    case "Basquetball":
      createPostions(scope.basquetbal, compile, scope);
      scope.selected_sport = scope.basquetbal;
      break;
    case "Tennis":
      createPostions(scope.americanFootball, compile, scope);
      scope.selected_sport = scope.americanFootball;
      break;
    case "Atletismo":
      createPostions(scope.americanFootball, compile, scope);
      scope.selected_sport = scope.americanFootball;
      break;
    case "Voleiball":
      createPostions(scope.voleibol, compile, scope);
      scope.selected_sport = scope.voleibol;
      break;
    default:
      console.log("Wrong Sport");
  }
}


// Create Dynamic Checkbox
var createPostions = function(array, compile, scope) {
  // clear
  $("#firstPositions").empty();
  $("#secondPositions").empty();

  var half = array.length / 2;
  var template = '<label> </label>';
  var checkbox = '<div class="checkbox" style="width:100%;"></div>'

  for (var i = 0; i < array.length; i++) {
    var position = array[i];
    var completeTemplate = $(template).html(position).append("<input class='margin-controller' style='margin-left:14px;' " +
      "type='checkbox' value=' " + position + " ' ng-model='sport.position.p" + i + "'/>");
    var templateCheckbox = $(checkbox).append(completeTemplate);
    if (i <= half) {
      angular.element(document.getElementById('firstPositions')).append(compile(
        templateCheckbox
      )(scope));

    } else {
      angular.element(document.getElementById('secondPositions')).append(compile(
        templateCheckbox
      )(scope));
    }
  }
};
