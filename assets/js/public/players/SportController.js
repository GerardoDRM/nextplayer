angular.module('UsersModule').controller('SportController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.americanFootball = ["Quarterback", "Linebacker", "Runningback", "Safety", "Wide receiver", "Cornerback", "Tight End", "Línea ofensivo", "Línea defensivo", "Pateador"];
  $scope.soccer = ["Portero", "Lateral Izquierdo", "Lateral Derecho", "Central", "Medio de Contención", "Mediocampista", "Extremo Izquierdo", "Extremo Derecho", "Enganche", "Centro Delantero"];
  $scope.volleyball = ["Acomodador", "Esquina", "Central", "Zaguero", "Libero"];
  $scope.basketball = ["Base", "Escolta", "Alero", "Ala-Pivot", "Pivot"];
  $scope.baseball = ["Pícher", "Catcher", "Primera Base", "Segunda Base", "Tercera Base", "Short Stop", "Jardinero Izquierdo", "Jardinero Derecho", "Jardinero Central", "Bateador designado"];
  $scope.taekwondo = ["Blanca", "Amarilla", "Verde", "Azul", "Roja", "Roja/Negra", "Negra"];
  $scope.rugby = ["Pilares", "Hooker", "Segunda Línea", "Tercera Línea", "Número ocho", "Medio-scrum", "Apertura", "Wings", "Centros", "Full Back"];
  $scope.fastFootball = ["Portero", "Defensa", "Medio", "Delantero"];
  $scope.athletics = ["Velocidad", "MedioFondo", "Maratón", "Fondo", "Relevos", "Saltos", "Lanzamientos", "Marcha", "Pruebas Combinadas"];
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
      $scope.sport = response.data;
      $scope.sport.position = {};
      for (var key in $scope.sport.positions) {
        $scope.sport.position[key] = true;
      }
    }, function errorCallback(response) {});
  });

  $scope.update = function() {
    $scope.sport.positions = {};
    for (var key in $scope.sport.position) {
      if ($scope.sport.position[key]) {
        var pos = key.replace(/^\D+/g, '');
        $scope.sport.positions[key] = $scope.selected_sport[pos];
      }
    }

    if (Object.keys($scope.sport.positions).length > 3) {
      addFeedback("Sólo debes de elegir maximo 3 posiciones");
    } else {
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
        if (response.data == 500) {
          addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
        } else {
          addFeedback("Se han agregado tus datos de tú deporte", 'success');
        }
      }, function errorCallback(response) {
        addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
      });
    }
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
    case "Baloncesto":
      createPostions(scope.basketball, compile, scope);
      scope.selected_sport = scope.basketball;
      break;
    case "Beisbol":
      createPostions(scope.baseball, compile, scope);
      scope.selected_sport = scope.baseball;
      break;
    case "Fútbol rápido":
      createPostions(scope.fastFootball, compile, scope);
      scope.selected_sport = scope.fastFootball;
      break;
    case "Voleibol Sala":
      createPostions(scope.volleyball, compile, scope);
      scope.selected_sport = scope.volleyball;
      break;
    case "Voleibol Playa":
      createPostions(scope.volleyball, compile, scope);
      scope.selected_sport = scope.volleyball;
      break;
    case "Taekwondo":
      createPostions(scope.taekwondo, compile, scope);
      scope.selected_sport = scope.taekwondo;
      break;
    case "Rugby":
      createPostions(scope.rugby, compile, scope);
      scope.selected_sport = scope.rugby;
      break;
    case "Atletismo":
      createPostions(scope.athletics, compile, scope);
      scope.selected_sport = scope.athletics;
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
