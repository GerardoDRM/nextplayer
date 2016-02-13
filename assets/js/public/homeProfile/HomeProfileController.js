angular.module('UsersModule').controller('HomeProfileController', ['$scope', '$http', '$q', '$compile', function($scope, $http, $q, $compile) {

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
    '<li>' +
    '<a href="/profile/' + following._id + '">' +
    '<div class="row">' +
    '<div class="col-xs-4">' +
    '<img alt="..." src="../'+ match[0] +'">' +
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
  if (profile !== undefined) {
    var phrase = profile;
    var myRegexp = /uploads\/(.*)/;
    match = myRegexp.exec(phrase);
  }

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
    '<img alt="..." src="../'+ match[0] +'">' +
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
  if (profile !== undefined) {
    var phrase = profile;
    var myRegexp = /uploads\/(.*)/;
    match = myRegexp.exec(phrase);
  }

  angular.element(document.getElementById('space-for-teams')).append(compile(
    '<div class="col-xs-6 col-sm-4">' +
    '<a href="/profile/' + team._id + '">' +
    '<div class="card">' +
    '<div class="catalogue-image" style="background: url(../' + match[0] + ') 50% 50% / cover no-repeat"></div>' +
    '<p>' + team.details.organization_name + '</p>' +
    '<img class="shield" src="../images/equipo_escudo.png">' +
    '</div></a>' +
    '</div>'
  )(scope));
}