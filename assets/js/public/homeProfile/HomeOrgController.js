angular.module('UsersModule').controller('HomeOrgController', ['$scope', '$http', '$q', '$compile', function($scope, $http, $q, $compile) {
  $scope.session = {};

  // Close commentElement
  $("#dialogComment").click(function(){
    $("#dialogComment").css({
      opacity: 0,
      "pointer-events": "none"
    });
  });
  // Session dialog
  $("#dialogSessions").click(function(){
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
  $q.all([$scope.noticeInfo, $scope.orgsInfo, $scope.followers, $scope.following]).then(function(results) {
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
    var followersList = results[2].data;
    $scope.followers_counter = followersList.length;
    for (var i = 0; i < followersList.length; i++) {
      _createFollowers($compile, $scope, followersList[i]);
    }

    ////////////////////
    ///// Following ///
    ///////////////////
    var followingList = results[3].data;
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
    console.log($scope.session);
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
  }


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

    angular.element(document.getElementById('space-for-following')).append(compile(
      '<div class="col-sm-6">' +
      '<div class="row profile-card no-margin">' +
      '<div class="col-sm-4">' +
      '<a href="/profile/' + following._id + '\">' +
      '<div class="card">' +
      '<div class="catalogue-image" style="background: url(../' + match[0] + ') 50% 50% / cover no-repeat"></div>' +
      '<p>' + name  + " " + following.lastname +
      '</br>' +
      '(' + following.sport.title + ')</p>' +
      '<img class="shield" src="../images/equipo_escudo.png">' +
      '</div>' +
      '</a>' +
      '</div>' +
      '<div class="col-sm-8">' +
      '<div class="row prospects-description">' +
      '<h3>' +
      'Añadido por:' +
      '</h3>' +
      '<div class="col-sm-6 no-padding">' +
      '<h4 style="margin:0;">' + following.recruiter + '</h4>' +
      '</div>' +
      '<div class="col-sm-6" style="display:inline">' +
      '<a ng-click=showCommentForm(\''+ following._id +'\',$event)><img alt="..." class="message-image" src="../images/comment.svg"></a>' +
      '<a><img alt="..." class="message-image" src="../images/mensage.svg"></a>' +
      '</div>' +
      '<p>' + following.comment + '</p>' +
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

    angular.element(document.getElementById('space-for-followers')).append(compile(
      '<li>' +
      '<a href="/profile/' + follower._id + '\">' +
      '<div class="row">' +
      '<div class="col-xs-4">' +
      '<img alt="..." src="../' + match[0] + '">' +
      '</div>' +
      '<div class="col-xs-8">' +
      '<p class="title">' + follower.name + ' ' + follower.lastname + '</p>' +
      '<p>' + follower.state + '</p>' +
      '<p>' + follower.sport.title + '</p>' +
      '</div>' +
      '</div>' +
      '</a>' +
      '</li>'
    )(scope));
  }
}]);

// Create Access rows
var createAccessOpt = function(i, compile, scope, access) {
  console.log(access.active, Date.now());
  var disabled = "";
  if (access.status !== undefined && access.status == 1 && access.active >= Date.now()) {
    disabled = "disabled"
  }
  angular.element(document.getElementById('space-for-access')).append(compile(
    '<div class="col-sm-6">' +
    '<h3>Acceso ' + (i + 1) + '</h3>' +
    '<p>' + access.name + '<input type="radio" ng-model="session" value="' + i + '" ' + disabled + '></p>' +
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
