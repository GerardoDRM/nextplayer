angular.module('UsersModule', []);



//Directive for adding buttons on click that show an alert on click
angular.module('UsersModule').directive("calendar", function() {
  return function(scope, element, attrs) {
    var x = $(element);
    var currentDate = new Date();
    x.datepicker({
      dateFormat: 'dd-mm-yy',
      changeYear: true,
      yearRange: "1940:2016",
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
                // Check image model
                var identifier = $(element).parent().prev();
                var fd = new FormData();
                fd.append('user', $("#userId").val());
                if (identifier.hasClass("gallery")) {
                  fd.append('model', 'gallery');
                  fd.append('position', $(identifier).val());
                } else if (identifier.hasClass("profile")) {
                  fd.append('model', 'profile');
                }
                fd.append('file', changeEvent.target.files[0]);
                // Upload Image
                $http.post('/user/gallery/photos', fd, {
                  transformRequest: angular.identity,
                  headers: {
                    'Content-Type': undefined
                  }
                }).then(function successCallback(response) {
                  if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
                  else{
                    // Change Preview
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
                    addFeedback("Tú foto ha sido almacenada", 'success');
                  }
                  $(element).val(undefined);
                }, function errorCallback(response) {
                  addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
                });

              } else {
                addFeedback("El tamaño de la imagen tiene que ser menor a 1MB");
              }
            } else {
              addFeedback("Debes de adjuntar una imagen con formato jpg, jpeg ó png");
            }
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);

      });
    }
  }
}]);

// Key enter press
angular.module('UsersModule').directive('enter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enter);
                });
                event.preventDefault();
            }
        });
    };
});


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
    if (match) {
      var urlsrc = "";
      if (serv == "hudl") urlsrc = services[serv].frame + match[1] + "/" + match[2];
      else if (serv == "youtube")  urlsrc = services[serv].frame + match[2];
      return '<iframe width="100%" height="100%" src="' + urlsrc + '" frameborder="0" allowfullscreen></iframe>';
    }
  }
  return 500;
}

// Create Messages
var createMessages = function(compile, scope, message) {
  var messageType = "message";
  if (message.id == $("#userId").val()) {
    messageType = "message own-message";
  }
  angular.element(document.getElementById('messages-space')).append(compile(
    '<li>' +
    '<div class="' + messageType + '">' +
    '<p>' + message.content + '</p>' +
    '</div>' +
    '</li>'
  )(scope));
};

// Create Inbox list
var createInbox = function(compile, scope, contact) {
  var profile = contact.profile_photo;
  var match = [];
  if (profile !== undefined) {
    var phrase = profile;
    var myRegexp = /uploads\/(.*)/;
    match = myRegexp.exec(phrase);
  }
  var name = "";
  if(contact.details.organization_name !== undefined) {
    name = contact.details.organization_name;
  } else {
    name = contact.name + " " + contact.lastname;
  }
  angular.element(document.getElementById('space-for-contacts')).append(compile(
    '<li class="inbox-contact" ng-click="showConversation(\'' + contact._id + '\', \'' + name + '\')">' +
    '<div class="row">' +
    '<div class="col-sm-4">' +
    '<img src="../' + match[0] + '">' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<p>' + name + '</p>' +
    '</div>' +
    '</div>' +
    '</li>'
  )(scope));
};

function addFeedback(msg, status) {
    var cl = status == "success" ? "#70DA8B" : "#FFE6B2";
    var fontColor = status == "success" ? "#4DA463" : "#C5A14E";
    $("#feedback").addClass("msg");
    $("#feedback-msg").html(msg);
    $("#feedback").css({
      "background-color" : cl,
      "color": fontColor
    });
    setTimeout(function () {
        $("#feedback").removeClass("msg");
        $("#feedback-msg").html("");
    }, 6000);
}

// Connect to socket
function connectToSocket(chat, inbox, activeChat) {

  // Attach a listener which fires when a connection is established:
  io.socket.on('connect', function socketConnected() {

    if($("#userId").val() != "") {
      io.socket.get("/user/subscription/" + $("#userId").val() , function(data){
        console.log(data);
      });
    }

    // Listen for the "user" event, which will be broadcast when something
    // happens to a user we're subscribed to.  See the "autosubscribe" attribute
    // of the User model to see which messages will be broadcast by default
    // to subscribed sockets.
    io.socket.on('user', function messageReceived(message) {
      console.log(activeChat);
      switch (message.verb) {
        // Handle private messages.
        case 'messaged':
          chat.push(message.data);
          // Case open Inbox
          if(inbox.length > 0) {
            for(var i=0; i<chat.length; i++) {
              console.log(chat[i].from in inbox);
              if(inbox.indexOf(chat[i].from) > -1) {
                var contact = $("#space-for-contacts").children()[i];
                console.log(contact);
                $(contact).css({"background-color" : "#70DA8B"});
              }
            }
          } else if(activeChat !== undefined) {
            // Case Open Specific chat
            for(var i=0; i<chat.length; i++) {
              if(chat[i].from == activeChat) {
                chat.splice(i,1);
                $("#messages-space").append(
                '<li>' +
                '<div class="message">' +
                '<p>' + chat.msg + '</p>' +
                '</div>' +
                '</li>');
                break;
              }
            }
          }
          break;
        default:
          break;
      }

    });

    console.log('Socket is now connected!');
    // When the socket disconnects, hide the UI until we reconnect.
    io.socket.on('disconnect', function() {});
  });

}
