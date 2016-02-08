angular.module('UsersModule').controller('HomeProfileController', ['$scope', '$http', '$q', '$compile', function($scope, $http, $q, $compile) {

  $scope.noticeInfo = $http({
    method: 'GET',
    url: '/notices'
  });
  $scope.orgsInfo = $http({
    method: 'GET',
    url: '/organizations/all'
  });
  // $scope.roomsInfo = $http({
  //   method: 'GET',
  //   url: '//' + $scope.hotelName
  // });
  // $scope.gallery = $http({
  //   method: 'GET',
  //   url: '//' + $scope.hotelName
  // });
  $q.all([$scope.noticeInfo, $scope.orgsInfo]).then(function(results) {
    console.log(results);
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


var createTeams = function(compile, scope, team) {
  var profile = team.profile_photo;
  var match;
  if(profile !== undefined) {
    var phrase = profile;
    var myRegexp = /uploads\/(.*)/;
    match = myRegexp.exec(phrase);
  }

  angular.element(document.getElementById('space-for-teams')).append(compile(
    '<div class="col-xs-6 col-sm-4">' +
    '<a href="/profile/' + team._id + '">' +
    '<div class="card">' +
    '<div class="catalogue-image" style="background: url(../' + match[0] + ') 50% 50% / cover no-repeat"></div>' +
    '<p>'+ team.details.organization_name +'</p>' +
    '<img class="shield" src="../images/equipo_escudo.png">' +
    '</div></a>' +
    '</div>'
  )(scope));
}
