angular.module('UsersModule', []);



//Directive for adding buttons on click that show an alert on click
angular.module('UsersModule').directive("calendar", function() {
  return function(scope, element, attrs) {
    var x = $(element);
    var currentDate = new Date();
    x.datepicker({
      dateFormat: 'dd-mm-yy',
      changeYear: true,
      yearRange: "1940:2008",
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
      pattern: /^.*hudl\.com\/(athlete|team)\/(\d.+\/highlights\/.*)/,
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
      if (serv == "hudl") {console.log(match); urlsrc = services[serv].frame + match[1] + "/" + match[2];}
      else if (serv == "youtube")  urlsrc = services[serv].frame + match[2];
      console.log(urlsrc);
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
  var photo = match.length > 0 ? "../" + match[0] : "";

  var name = "";
  if(contact.details.organization_name !== undefined) {
    name = contact.details.organization_name;
  } else {
    name = contact.name + " " + contact.lastname;
  }

  // Add Notification
  var notification = "";
  if(contact.viewed !== undefined) {
    notification = "style='background:#70DA8B'";
  }

  angular.element(document.getElementById('space-for-contacts')).append(compile(
    '<li class="inbox-contact" ng-click="showConversation(\'' + contact._id + '\', \'' + name + '\')" ' + notification + '>' +
    '<div class="row">' +
    '<div class="col-xs-4">' +
    '<img src="' + photo + '">' +
    '</div>' +
    '<div class="col-xs-6">' +
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
function connectToSocket() {

  // Attach a listener which fires when a connection is established:
  io.socket.on('connect', function socketConnected() {

    if($("#userId").val() != "") {
      io.socket.get("/user/subscription/" + $("#userId").val() , function(data){
        // console.log(data);
      });
      io.socket.get("/login/socket/" + $("#userId").val() , function(data){
        // console.log(data);
      });
    }

    // Listen for the "user" event, which will be broadcast when something
    // happens to a user we're subscribed to.  See the "autosubscribe" attribute
    // of the User model to see which messages will be broadcast by default
    // to subscribed sockets.
    io.socket.on('user', function messageReceived(message) {
      switch (message.verb) {
        // Handle video updates.
        case 'created':
          addNotification(message);
          break;
        // Handle private messages.
        case 'messaged':
          getSocketMessage(message);
          break;
        default:
          break;
      }
    });

    // console.log('Socket is now connected!');
    // When the socket disconnects, hide the UI until we reconnect.
    io.socket.on('disconnect', function() {});
  });
}

// Add notificition
function addNotification(message) {
  var pos = rosterElements.indexOf(message.id);
  if(pos > -1) {
    var element = $("#space-for-following").children()[pos];
    $(element).append("<div class='new-video'><p>Nuevo Video</p></div>");
  }
}
// Interact With message from socket
function getSocketMessage(message) {
  chatObjects.push(message.data);
  // Case open Inbox
  if(inboxList.length > 0) {
    for(var i=0; i<chatObjects.length; i++) {
      if(inboxList.indexOf(chatObjects[i].from) > -1) {
        var contact = $("#space-for-contacts").children()[i];
        $(contact).css({"background-color" : "#70DA8B"});
      }
    }
  }
  if(active_chat !== undefined) {
    // Case Open Specific chat
    for(var i=0; i<chatObjects.length; i++) {
      if(chatObjects[i].from == active_chat) {
        $("#messages-space").append(
        '<li>' +
        '<div class="message">' +
        '<p>' + chatObjects[i].msg + '</p>' +
        '</div>' +
        '</li>');
        chatObjects.splice(i,1);
        break;
      }
    }
  }
}

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
