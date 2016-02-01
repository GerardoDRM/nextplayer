angular.module('UsersModule', []);


angular.module('UsersModule').directive("experience", function($compile) {
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
angular.module('UsersModule').directive("calendar", function() {
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

angular.module('UsersModule').filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min); //Make string input int
    max = parseInt(max);
    for (var i = min; i < max; i++)
      input.push(i);
    return input;
  };
});

angular.module('UsersModule').directive("fileread", ['$http', function($http) {
  return {
    scope: {
      fileread: "="
    },
    link: function(scope, element, attributes) {
      element.bind("change", function(changeEvent) {
        var reader = new FileReader();
        reader.onload = function(loadEvent) {
          scope.$apply(function() {
            var data = loadEvent.target.result;
            var secureFile = data.match(/^data:image\/(png|jpg|jpeg)/) != null ? true : false;
            if (secureFile) {
              // Check file size
              if (changeEvent.target.files[0].size < 1000000) {
                var selectImage = $(element).parent();
                $(selectImage[0]).css({
                  "display": "none"
                });
                var previewImage = $(element).parent().next();
                $(previewImage[0]).css({
                  "display": "block",
                  "background-image": "url(" + data + ")",
                  "background-size": "cover",
                  "background-repeat": "no-repeat"
                });

                // Check image model
                var identifier = $(element).parent().prev();
                var fd = new FormData();
                fd.append('file', changeEvent.target.files[0]);
                fd.append('user', $("#userId").val());
                if (identifier.hasClass("gallery")) {
                  fd.append('model', 'gallery');
                  fd.append('position', $(identifier).val());
                } else if (identifier.hasClass("profile")) {
                  fd.append('model', 'profile');
                }
                // Upload Image
                $http.post('/user/gallery/photos', fd, {
                  transformRequest: angular.identity,
                  headers: {
                    'Content-Type': undefined
                  }
                }).then(function successCallback(response) {
                  console.log(response);
                  $(element).val(undefined);
                }, function errorCallback(response) {
                  console.log(response);
                });

              } else {
                addFeedback("El tamaño de la imagen tiene que ser menor a 1MB");
              }
            } else {
              addFeedback("Debes de adjuntar una imagen con formato jpg, jpeg o png");
            }
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);

      });
    }
  }
}]);


var checkVideoProvider = function(url) {
  var services = {
    hudl: {
      pattern: /^.*hudl\.com\/(athlete|team)\/(\d.+\/highlights.*\/).*/,
      frame: '//www.hudl.com/embed/'
    },
    youtube: {
      pattern: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/,
      frame: '//www.youtube.com/embed/'
    }
  };
  for (var serv in services) {
    var match = url.match(services[serv].pattern);
    console.log(match);
    if (match) {
      var urlsrc = "";
      if (serv == "hudl") urlsrc = services[serv].frame + match[1] + "/" + match[2];
      else if (serv == "youtube")  urlsrc = services[serv].frame + match[2];
      return '<iframe width="100%" height="100%" src="' + urlsrc + '" frameborder="0" allowfullscreen></iframe>';
    }
  }
  return 500;
}

function addFeedback(msg) {
    $("#feedback").addClass("msg");
    $("#feedback-msg").html(msg);
    setTimeout(function () {
        $("#feedback").removeClass("msg");
        $("#feedback-msg").html("");
    }, 6000);
}
