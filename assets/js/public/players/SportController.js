angular.module('PlayerModule').controller('SportController', ['$scope', '$http', function($scope, $http) {
  $scope.sportInfoForm = {};
  $scope.americanFootball = ["Quarterback","Linebacker","Runningback","Safety","Wide receiver","Cornerback","Tight Endt","Línea ofensivo","Línea defensivo" ];
  $scope.soccer = ["Portero", "Lateral Izquierdo", "Lateral Derecho", "Central", "Medio de Contención", "Mediocampista", "Extremo Izquierdo", "Extremo Derecho", "Enganche", "Centro Delantero"];
  $scope.voleibol =["Acomodador", "Esquina", "Central", "Zaguero", "Libero"];
  $scope.basquetbal = ["Base", "Escolta", "Alero", "Ala-Pivot", "Pivot"];
  console.log($scope.basquetbal);
  divideArray($scope.basquetbal);

  $scope.submitSportForm = function() {

    console.log($scope.sport);

    // Submit request to Sails.
    // $http.post('/signup', {
    //     name: $scope.signupForm.name,
    //     lastname: $scope.signupForm.lastname,
    //     email: $scope.signupForm.email,
    //     password: $scope.signupForm.password,
    //     sport: $('#select-sport').find('option:selected').val(),
    //     role: $("#user-type").val()
    //   })
    //   .then(function onSuccess(sailsResponse) {
    //     console.log(sailsResponse);
    //   })
    //   .catch(function onError(sailsResponse) {
    //     console.log(sailsResponse);
    //   })
  }
}]);

function divideArray (array) {
  var half = array.length / 2;
  var template = '<label> </label>';
  var checkbox = '<div class="checkbox" style="width:100%;"></div>'

  for ( var i = 0; i < array.length; i++ ) {
    var position = array[i];
    var completeTemplate = $(template).html(position).append("<input class='margin-controller' style='margin-left:14px;' type='checkbox' value=' "+ position +" ' />");
    var templateCheckbox = $(checkbox).append(completeTemplate);
     if (i<=half) {
       $(templateCheckbox).appendTo($("#firstPositions"))

     }
     else {
        $(templateCheckbox).appendTo($("#secondPositions"))
     }
  }
}
