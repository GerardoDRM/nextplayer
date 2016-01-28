angular.module('CoachInfoModule').controller('CoachInfoController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.user = {};
  $scope.coach = {};
  $scope.count = 0;
  $scope.countries = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda",
    "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas",
    "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia",
    "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután",
    "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano",
    "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba",
    "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia",
    "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón",
    "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea - Bisáu",
    "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón",
    "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto",
    "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas",
    "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro",
    "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos",
    "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricanaç",
    "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana",
    "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía",
    "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka",
    "Suazilandia", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania",
    "Tayikistán", "Timor Orienta", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania",
    "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
  ];


  $http({
    method: 'GET',
    url: '/user/basicinfo',
    params: {
      "user": $("#userId").val()
    }
  }).then(function successCallback(response) {
    $scope.user = response.data["general"];
    var experienceList = response.data["details"].experience;
    for (var i = 0; i < experienceList.length; i++) {
      // Check template in use
      $("#space-for-experience").length > 0 ? createExperience(i, $compile, $scope) : createProfileExperience(i, $compile, $scope);
      $scope.count++;
      $scope.coach["e" + i] = experienceList[i];
    }
    // Adding global sport
    $("#userSport").val($scope.user.sport);
  }, function errorCallback(response) {
    console.log(response);
  });

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
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  $scope.viewProfile = function() {
    window.location = '/profile/' + $("#userId").val();
  }

  $scope.viewDashboard = function() {
    window.location = '/';
  }
}]);


// Create Dynamic experience rows
var createExperience = function(i, compile, scope) {
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


// Create Dynamic experience rows
var createProfileExperience = function(i, compile, scope) {
  angular.element(document.getElementById('profile-experience')).append(compile(
    '<div class="row">' +
    '<div class="col-sm-12">' +
    '<h2 class="head-title">Experiencia</h2>' +
    '<div class="row">' +
    '<div class="col-xs-2">' +
    '<p>Equipo</p>' +
    '</div>' +
    '<div class="col-xs-9">' +
    '<p class="green-title">{{ coach.e'+ i +'.team }}</p>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-xs-2">' +
    '<p>Fechas</p>' +
    '</div>' +
    '<div class="col-xs-9">' +
    '<p class="green-title"> {{ coach.e'+ i +'.startYear }} - {{ coach.e'+ i +'.endYear }}</p>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-xs-2">' +
    '<p>Posición</p>' +
    '</div>' +
    '<div class="col-xs-9">' +
    '<p class="green-title"> {{ coach.e'+ i +'.position }} </p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-12 middle-profile">' +
    '<h3 class="head-title ">Logros</h3>' +
    '<p class="border-column-botom ">{{ coach.e'+ i +'.award }}</p>' +
    '</div>' +
    '</div>'
  )(scope));
};

angular.module('CoachInfoModule').directive("experience", function($compile) {
  return function(scope, element, attrs) {
    element.bind("click", function() {
      if (scope.count < 5) {
        createExperience(scope.count, $compile, scope);
        scope.count++;
      }
    });
  };
});

//Directive for adding buttons on click that show an alert on click
angular.module('CoachInfoModule').directive("calendar", function() {
  return function(scope, element, attrs) {
    var x = $(element);
    var currentDate = new Date();
    x.datepicker({
      dateFormat: 'dd-mm-yy',
      changeYear: true,
      yearRange: "1980:2016",
      dayNamesMin: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    });
    x.datepicker("setDate", currentDate);
  };
});

angular.module('CoachInfoModule').filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min); //Make string input int
    max = parseInt(max);
    for (var i = min; i < max; i++)
      input.push(i);
    return input;
  };
});
