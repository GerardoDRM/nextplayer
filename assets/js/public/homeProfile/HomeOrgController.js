var chatObjects = [];
var inboxList = [];
var active_chat;
var rosterElements = [];

angular.module('UsersModule').controller('HomeOrgController', ['$scope', '$http', '$q', '$compile', function($scope, $http, $q, $compile) {
  $scope.session = {};
  // Connect To socket
  connectToSocket();

  // Close commentElement
  $("#dialogComment").click(function() {
    $("#dialogComment").css({
      opacity: 0,
      "pointer-events": "none"
    });
  });
  // Session dialog
  $("#dialogSessions").click(function() {
    $("#dialogSessions").css({
      opacity: 0,
      "pointer-events": "none"
    });
  });
  $(".dialogSessions").click(function(e) {
    e.stopPropagation();
  });

  $scope.noticeInfo = $http({
    method: 'GET',
    url: '/notices'
  });
  $scope.followers = $http({
    method: 'GET',
    url: '/followed/' + $("#userId").val()
  });
  $scope.following = $http({
    method: 'GET',
    url: '/following/' + $("#userId").val()
  });
  $q.all([$scope.noticeInfo, $scope.followers, $scope.following]).then(function(results) {
    ////////////////////
    ///// Notices //////
    ///////////////////
    var noticesList = results[0].data;
    for (var i = 0; i < noticesList.length; i++) {
      createNotices($compile, $scope, noticesList[i]);
    }
    ////////////////////
    ///// Followers ///
    ///////////////////
    var followersList = results[1].data;
    $scope.followers_counter = followersList.length;
    for (var i = 0; i < followersList.length; i++) {
      _createFollowers($compile, $scope, followersList[i]);
    }

    ////////////////////
    ///// Following ///
    ///////////////////
    var followingList = results[2].data;
    for (var i = 0; i < followingList.length; i++) {
      _createFollowing($compile, $scope, followingList[i]);
    }
  });

  //////////////////////////
  //// Access / Sessions ///
  /////////////////////////
  // Check Access
  $scope.getAccess = function() {
    // Clean space
    $("#space-for-access").empty();
    $("#dialogSessions").css({
      opacity: 1,
      "pointer-events": "auto"
    });
    $scope.session = -1;
    $http({
      method: 'GET',
      url: '/user/org/access',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      var accessList = response.data;
      if (accessList !== undefined) {
        for (var i = 0; i < accessList.length; i++) {
          createAccessOpt(i, $compile, $scope, accessList[i]);
        }
      }
    }, function errorCallback(response) {});
  };

  $scope.updateSession = function() {
    if ($scope.session > -1) {
      $http({
        method: 'PUT',
        url: '/user/org/sessions',
        data: {
          "user": $("#userId").val(),
          "session": $scope.session
        }
      }).then(function successCallback(response) {
        window.location = "/search/" + $scope.session;
      }, function errorCallback(response) {});
    }
  };

  $scope.showCommentForm = function(id, $event) {
    $("#dialogComment").css({
      opacity: 1,
      "pointer-events": "auto"
    });
    $scope.comment_element = $($event.target).parent().parent().next()[0];
    $scope.comment = $($scope.comment_element).text();
    $scope.roster_id = id;
  }

  $scope.addComment = function() {
    if ($("#form-comment").valid()) {
      $http({
        method: 'PUT',
        url: '/org/roster/comments',
        data: {
          "user": $("#userId").val(),
          "roster": $scope.roster_id,
          "comment": $scope.comment
        }
      }).then(function successCallback(response) {
        $("#dialogComment").css({
          opacity: 0,
          "pointer-events": "none"
        });
        addFeedback("Se ha agregado el comentario", "success");
        $($scope.comment_element).text($scope.comment);
        $scope.comment_element = undefined;
        $scope.comment = undefined;
        $scope.roster_id = undefined;
      }, function errorCallback(response) {
        addFeedback("Ha ocurrido un error, vuelva a intentarlo en otro momento", "error");
      });
    }
  };

  $scope.showInbox = function($event) {
    active_chat = undefined;
    var elementReturn = $($event.target).is("span");
    if ($("#chat-structure").css('display') == 'block' && !elementReturn) {
      $("#chat-structure").hide(500);
      inboxList = [];
    } else {
      // Get inbox
      $http({
        method: 'GET',
        url: '/myrooms/info',
        params: {
          "user": $("#userId").val(),
        }
      }).then(function successCallback(response) {
        var contacts = response.data;
        if (contacts !== undefined) {
          // Clean space
          $("#space-for-contacts").empty();
          // Add messages
          for (var i = 0; i < contacts.length; i++) {
            inboxList[i] = contacts[i]._id;
            createInbox($compile, $scope, contacts[i]);
          }
        }
        // Case open Inbox
        if(inboxList.length > 0) {
          for(var i=0; i<chatObjects.length; i++) {
            if(inboxList.indexOf(chatObjects[i].from) > -1) {
              var contact = $("#space-for-contacts").children()[i];
              $(contact).css({"background-color" : "#70DA8B"});
            }
          }
        }
        // Chat UI animation
        $("#chat-structure").show(500);
        $("#conversation").hide(100);
        $("#inbox").show(100);
      }, function errorCallback(response) {});
    }
  };

  $scope.showConversation = function(id, name) {
    $scope.inbox = [];
    // Create room or Get messages
    $http({
      method: 'PUT',
      url: '/add/rooms',
      data: {
        "org": $("#userId").val(),
        "user": id
      }
    }).then(function successCallback(response) {
      var messages = response.data[0].messages;
      if (messages !== undefined) {
        // Clean space
        $("#messages-space").empty();
        // Add messages
        for (var i = 0; i < messages.length; i++) {
          createMessages($compile, $scope, messages[i]);
        }
      }
      $scope.currentDestination = id;
      active_chat = id;
      // Chat UI animation
      $("#chat-structure").show(500);
      $("#conversation").show(100);
      $("#inbox").hide(100);
      $("#roomName").html(name);
    }, function errorCallback(response) {});
    // Update notification
    $http({
      method: 'PUT',
      url: '/room/notification',
      data: {
        "viewer": $("#userId").val(),
        "sender": id
      }
    }).then(function successCallback(response) {
    }, function errorCallback(response) {});
  };

  $scope.sendMessage = function() {
    if($scope.message !== undefined) {
      // Send the private message
      io.socket.post('/chat/private/' + $("#userId").val(), {
        to: $scope.currentDestination,
        msg: $scope.message
      });

      var message = {
        id: $("#userId").val(),
        content: $scope.message
      };
      createMessages($compile, $scope, message);
      $scope.message = undefined;
    }

  };
  // Delete chat and following
  $scope.deleteFollowing = function(id, $event) {
    // Delete from DOM
    $($event.target).parent().remove();
    $scope.followers_delete = $http({
      method: 'PUT',
      url: '/followed/remove',
      data: {
        "followed": $("#userId").val(),
        "user": id
      }
    });
    $scope.following_delete = $http({
      method: 'PUT',
      url: '/following/remove',
      data: {
        "user": $("#userId").val(),
        "following": id
      }
    });
    $scope.conversation_delete = $http({
      method: 'DELETE',
      url: '/room',
      data: {
        "org": $("#userId").val(),
        "user": id
      }
    });
    $q.all([$scope.followers_delete, $scope.following_delete, $scope.conversation_delete]).then(function(results) {
      addFeedback("Se han realizado los cambios en tu roster", "success");
    });
  };

  var _createFollowing = function(compile, scope, following) {
    var profile = following.profile_photo;
    var match = [];
    var name;
    if (profile !== undefined) {
      var phrase = profile;
      var myRegexp = /uploads\/(.*)/;
      match = myRegexp.exec(phrase);
    }

    if (following.details.organization_name !== undefined) {
      name = following.details.organization_name;
    } else {
      name = following.name;
    }
    // Add pos to roster
    rosterElements.push(following._id);
    // Elements
    var photo = match.length > 0 ? 'background: url(../' + match[0] + ') 50% 50% / cover no-repeat' : "";
    var shield = following.role == "player" ? "jugador_escudo" : "coach_escudo";
    var commet = following.comment !== undefined ? following.comment : "No ha comentarios";

    angular.element(document.getElementById('space-for-following')).append(compile(
      '<div class="col-sm-6" style="height:250px;">' +
      '<a class="anchor-coach" style="color:red;" href="javascript:void(0);" ng-click="deleteFollowing(\'' + following._id + '\',$event);">- Remover de Prospectos</a>' +
      '<div class="row profile-card no-margin">' +
      '<div class="col-xs-8 col-sm-4">' +
      '<a href="/profile/' + following._id + '\">' +
      '<div class="card">' +
      '<div class="catalogue-image" style="' + photo + '"></div>' +
      '<p>' + name + " " + following.lastname +
      '</br>' +
      '(' + following.sport.title + ')</p>' +
      '<img class="shield" src="../images/' + shield + '.png">' +
      '</div>' +
      '</a>' +
      '</div>' +
      '<div class="col-xs-12 col-sm-8">' +
      '<div class="row prospects-description">' +
      '<h3>' +
      'Añadido por:' +
      '</h3>' +
      '<div class="col-xs-6">' +
      '<h4 style="margin:0;">' + following.recruiter + '</h4>' +
      '</div>' +
      '<div class="col-xs-6" style="display:inline">' +
      '<a ng-click=showCommentForm(\'' + following._id + '\',$event)><img alt="Comentar" class="message-image" src="../images/comment.svg"></a>' +
      '<a ng-click="showConversation(\'' + following._id + '\', \'' + name + '\')"><img alt="Mensajes" class="message-image" src="../images/mensage.svg"></a>' +
      '</div>' +
      '<div class="col-xs-12">' +
      '<p>' + commet + '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    )(scope));
  }

  var _createFollowers = function(compile, scope, follower) {
    var profile = follower.profile_photo;
    var match = [];
    if (profile !== undefined) {
      var phrase = profile;
      var myRegexp = /uploads\/(.*)/;
      match = myRegexp.exec(phrase);
    }

    var photo = match.length > 0 ? "../" + match[0] : "";

    angular.element(document.getElementById('space-for-followers')).append(compile(
      '<li>' +
      '<a href="/profile/' + follower._id + '\">' +
      '<div class="row">' +
      '<div class="col-xs-4">' +
      '<img alt="..." src="' + photo + '">' +
      '</div>' +
      '<div class="col-xs-8">' +
      '<p class="title">' + follower.name + ' ' + follower.lastname + '</p>' +
      '<p>' + follower.sport.title + '</p>' +
      '</div>' +
      '</div>' +
      '</a>' +
      '</li>'
    )(scope));
  }
}]);
db.blog.insertOne({title:"\"5 Tips para tener un Perfil Efectivo\"", author:"NextPlayers", date:new Date(), content:"<div style='text-align=center;'><a href='/blog'><img src='../images/welcome.jpg' width='50%'/></a></div>"})

// Create Access rows
var createAccessOpt = function(i, compile, scope, access) {
  var disabled = "";
  if (access.status !== undefined && access.status == 1 && access.active >= Date.now()) {
    disabled = "disabled"
  }
  angular.element(document.getElementById('space-for-access')).append(compile(
    '<div class="col-sm-6">' +
    '<h3>Acceso ' + (i + 1) + '</h3>' +
    '<p>' + access.name + '<input style="margin-left:20px;" type="radio" ng-model="session" value="' + i + '" ' + disabled + '></p>' +
    '</div>'
  )(scope));
};


var createNotices = function(compile, scope, notice) {
  angular.element(document.getElementById('space-for-notice')).append(compile(
    '<div class="advicement">' +
    '<h3>' + notice.title + '</h3>' +
    '<h4>' + notice.date + '</h4>' +
    '<p>' + notice.content + '</p>' +
    '</div>'
  )(scope));
}
