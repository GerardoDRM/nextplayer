var chatObjects = [];
var inboxList = [];
var active_chat;

angular.module('UsersModule').controller('HomeProfileController', ['$scope', '$http', '$q', '$compile', function($scope, $http, $q, $compile) {
  // Connect To socket
  connectToSocket();

  $scope.noticeInfo = $http({
    method: 'GET',
    url: '/notices'
  });
  $scope.orgsInfo = $http({
    method: 'GET',
    url: '/organizations/all'
  });
  $scope.followers = $http({
    method: 'GET',
    url: '/followed/' + $("#userId").val()
  });
  $scope.following = $http({
    method: 'GET',
    url: '/following/' + $("#userId").val()
  });
  $q.all([$scope.noticeInfo, $scope.orgsInfo, $scope.followers, $scope.following]).then(function(results) {
    ////////////////////
    ///// Notices //////
    ///////////////////
    var noticesList = results[0].data;
    for (var i = 0; i < noticesList.length; i++) {
      createNotices($compile, $scope, noticesList[i]);
    }

    ////////////////////
    ///// Teams  //////
    ///////////////////
    var teamsList = results[1].data;
    for (var i = 0; i < teamsList.length; i++) {
      createTeams($compile, $scope, teamsList[i]);
    }

    ////////////////////
    ///// Followers ///
    ///////////////////
    var followersList = results[2].data;
    for (var i = 0; i < followersList.length; i++) {
      createFollowers($compile, $scope, followersList[i]);
    }

    ////////////////////
    ///// Following ///
    ///////////////////
    var followingList = results[3].data;
    for (var i = 0; i < followingList.length; i++) {
      createFollowing($compile, $scope, followingList[i]);
    }

  });

  $scope.showInbox = function($event) {
    active_chat = undefined;
    var elementReturn = $($event.target).is("span");
    if ($("#chat-structure").css('display') == 'block' && !elementReturn) {
      $("#chat-structure").hide(500);
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
    inboxList = [];
    // Create room or Get messages
    $http({
      method: 'PUT',
      url: '/add/rooms',
      data: {
        "user": $("#userId").val(),
        "org": id
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
  }
}]);


var createNotices = function(compile, scope, notice) {
  angular.element(document.getElementById('space-for-notice')).append(compile(
    '<div class="advicement">' +
    '<h3>' + notice.title + '</h3>' +
    '<h4>' + notice.date + '</h4>' +
    '<p>' + notice.content + '</p>' +
    '</div>'
  )(scope));
}

var createFollowing = function(compile, scope, following) {
  var profile = following.profile_photo;
  var match = [];
  var name;
  if (profile !== undefined && profile != null) {
    var phrase = profile;
    var myRegexp = /uploads\/(.*)/;
    match = myRegexp.exec(phrase);
  }

  var photo = match.length > 0 ? "../" + match[0] : "";

  if (following.details.organization_name !== undefined) {
    name = following.details.organization_name;
  } else {
    name = following.name;
  }

  angular.element(document.getElementById('space-for-following')).append(compile(
    '<li>' +
    '<a href="/profile/' + following._id + '">' +
    '<div class="row">' +
    '<div class="col-xs-4">' +
    '<img alt="..." src="'+ photo +'">' +
    '</div>' +
    '<div class="col-xs-8">' +
    '<p class="title">' + name + '</p>' +
    '<p>' + following.state + '</p>' +
    '</div>' +
    '</div>' +
    '</a>'+
    '</li>'
  )(scope));
}

var createFollowers = function(compile, scope, follower) {
  var profile = follower.profile_photo;
  var match = [];
  var name;
  if (profile !== undefined && profile != null) {
    var phrase = profile;
    var myRegexp = /uploads\/(.*)/;
    match = myRegexp.exec(phrase);
  }

  var photo = match.length > 0 ? "../" + match[0] : "";

  if (follower.details.organization_name !== undefined) {
    name = follower.details.organization_name;
  } else {
    name = follower.name;
  }

  angular.element(document.getElementById('space-for-followers')).append(compile(
    '<li>' +
    '<a href="/profile/' + follower._id + '">' +
    '<div class="row">' +
    '<div class="col-xs-4">' +
    '<img alt="..." src="'+ photo +'">' +
    '</div>' +
    '<div class="col-xs-8">' +
    '<p class="title">' + name + '</p>' +
    '<p>' + follower.state + '</p>' +
    '</div>' +
    '</div>' +
    '</a>' +
    '</li>'
  )(scope));
}


var createTeams = function(compile, scope, team) {
  var profile = team.profile_photo;
  var match = [];
  if (profile !== undefined && profile != null) {
    var phrase = profile;
    var myRegexp = /uploads\/(.*)/;
    match = myRegexp.exec(phrase);
  }

  var photo = match.length > 0 ? 'background: url(../' + match[0] + ') 50% 50% / cover no-repeat' : "";

  angular.element(document.getElementById('space-for-teams')).append(compile(
    '<div class="col-xs-6 col-sm-4" style="height:195px;">' +
    '<a href="/profile/' + team._id + '">' +
    '<div class="card">' +
    '<div class="catalogue-image" style="' + photo + '"></div>' +
    '<p>' + team.details.organization_name + '</p>' +
    '<img class="shield" src="../images/equipo_escudo.png">' +
    '</div></a>' +
    '</div>'
  )(scope));
}
