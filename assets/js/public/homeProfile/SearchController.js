angular.module('UsersModule').controller('SearchController', ['$scope', '$http', '$q', '$compile', function($scope, $http, $q, $compile) {
  $scope.sports = ["Fútbol americano", "Fútbol soccer", "Basquetball", "Tennis", "Atletismo", "Voleiball"];
  $scope.search = {};
  $scope.weight = {
    "w0": {
      "min": 65,
      "max": 75
    },
    "w1": {
      "min": 76,
      "max": 85
    },
    "w2": {
      "min": 86,
      "max": 95
    },
    "w3": {
      "min": 96,
      "max": 200
    }
  };
  $scope.height = {
    "h0": {
      "min": 1.65,
      "max": 1.75
    },
    "h1": {
      "min": 1.76,
      "max": 1.85
    },
    "h2": {
      "min": 1.86,
      "max": 1.95
    },
    "h3": {
      "min": 1.96,
      "max": 3
    }
  };
  $scope.skip = 0;
  $scope.filter = {sport:undefined, age: undefined, range: {}};

  //////////////////////////
  //// Search Filter ///////
  /////////////////////////
  $scope.rangeFilter = function(spec, measure) {
    var values = [];
    // Check available values
    for (var i in spec) {
      if (spec[i]) {
        values.push(measure[i]);
      }
    }
    values = values.sort(function(a, b) {
      return a.min-b.min;
    });
    // Get min and max
    return values.length > 0 ? {
      "$gte": values[0].min,
      "$lte": values[values.length - 1].max
    } : undefined;
  };

  $scope.serviceFilter = function(filters) {
    $http({
      method: 'PUT',
      url: '/search/filters',
      data: {
        "search": filters,
        "skip": $scope.skip
      }
    }).then(function successCallback(response) {
      var profiles = response.data;
      for(var i=0; i<profiles.length; i++) {
        createCardsProfle($compile, $scope, profiles[i]);
      }
    }, function errorCallback(response) {
    });
  };

  $scope.showMore = function() {
    $scope.skip += 10;
    $scope.serviceFilter($scope.filter);
  };
  // At first instance
  $scope.serviceFilter($scope.filter);

  $scope.updateActive = function(id) {
    $http({
      method: 'PUT',
      url: '/user/org/sessions',
      data: {
        "user": $("#userId").val(),
        "session":  $("#session").val()
      }
    }).then(function successCallback(response) {
      console.log(response);
      window.location = "/profile/" + id + "?session=" + $("#session").val();
    }, function errorCallback(response) {
    });
  }

}]);


function getAge(date) {
  var today = new Date();
  var birthDate = new Date(date);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

var checkForNulls = function(x) {
  return x === undefined ? "" : x;
}

var createCardsProfle = function(compile, scope, profile_info) {
  var profile = profile_info.profile_photo;
  var match = [];
  if (profile !== undefined) {
    var phrase = profile;
    var myRegexp = /uploads\/(.*)/;
    match = myRegexp.exec(phrase);
  }

  // Elements
  var photo = match.length > 0 ? 'background: url(../' + match[0] + ') 50% 50% / cover no-repeat' : "";
  var shield = profile_info.role == "player" ? "jugador_escudo" : "coach_escudo";

  angular.element(document.getElementById('space-for-profiles')).append(compile(
    '<div class="col-xs-6 col-sm-4">' +
    '<a href="javascript:void(0)" ng-click="updateActive(\''+ profile_info._id + '\')">' +
    '<div class="card">' +
    '<div class="catalogue-image" style="height:180px ;' + photo + '"></div>' +
    '<p>' + checkForNulls(profile_info.name) + " " + checkForNulls(profile_info.lastname) + '</p>' +
    '<p>' + checkForNulls(profile_info.sport.title) + '</p>' +
    '<img class="shield" style="top:45%;" src="../images/' + shield + '.png">' +
    '</div>'+
    '<p> Edad: ' + getAge(profile_info.born) + '</p>' +
    '<p> Altura: ' + checkForNulls(profile_info.sport.height) + '</p>' +
    '<p> Peso: ' + checkForNulls(profile_info.sport.weight) + '</p>' +
    '<p> Estado: ' + checkForNulls(profile_info.state) + '</p>' +
    '</a>' +
    '</div>'
  )(scope));
}

angular.module('UsersModule').directive("searchreader", ['$http','$compile', function($http, $compile) {
  return {
    restrict: "EA",
    scope: false,
    link: function(scope, element, attributes) {
      element.bind("change", function(changeEvent) {
        var search = scope.search;
        // Add values
        scope.filter.sport = (search.sport !== undefined && search.sport != "") ? search.sport : undefined;
        scope.filter.age = (search.age !== undefined && search.age != null) ? search.age : undefined;
        // Weight and Height //
        // get weight values
        var w = search.weight !== undefined ? scope.rangeFilter(search.weight, scope.weight) : undefined;
        // get height values
        var h = search.height !== undefined ? scope.rangeFilter(search.height, scope.height) : undefined;
        scope.filter.range = {
          weight: w,
          height: h
        };
        $("#space-for-profiles").empty();
        // Query filters
        scope.serviceFilter(scope.filter);
      });
    }
  }
}]);
