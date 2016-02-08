angular.module('UsersModule').controller('BlogController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  $scope.blog = {};
  $scope.months = [{
    "index": 1,
    "value": "Enero"
  }, {
    "index": 2,
    "value": "Febrero"
  }, {
    "index": 3,
    "value": "Marzo"
  }, {
    "index": 4,
    "value": "Abril"
  }, {
    "index": 5,
    "value": "Mayo"
  }, {
    "index": 6,
    "value": "Junio"
  }, {
    "index": 7,
    "value": "Julio"
  }, {
    "index": 8,
    "value": "Agosto"
  }, {
    "index": 9,
    "value": "Septiembre"
  }, {
    "index": 10,
    "value": "Octubre"
  }, {
    "index": 11,
    "value": "Noviembre"
  }, {
    "index": 12,
    "value": "Diciembre"
  }];

  var today = new Date();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();

  $scope.showPosts = function(month, year) {
    $("#space-for-posts").empty();
    $("#space-for-comments").empty();
    $scope.blog.id = undefined;
    $http({
      method: 'GET',
      url: '/blogs/' + month + '/' + year
    }).then(function successCallback(response) {
        console.log(response);
        var blogList = response.data;
        for (var i = 0; i < blogList.length; i++) {
          createBlogCard($compile, $scope, blogList[i]);
        }
      },
      function errorCallback(response) {
        console.log(response);
      });
  }
  // First get post from current date
  $scope.showPosts(month, year);

  $scope.showComments = function(id) {
    $("#space-for-comments").empty();
    $scope.blog.id = id;
    $http({
      method: 'GET',
      url: '/blog/comments/' + id
    }).then(function successCallback(response) {
        console.log(response);
        var comments = response.data;
        for (var i = 0; i < comments.length; i++) {
          createPostComments($compile, $scope, comments[i]);
        }
      },
      function errorCallback(response) {
        console.log(response);
      });
  }

  $scope.postComment = function() {
    if($scope.blog.id === undefined) addFeedback("Por favor seleccione un post para comentar", 'error');
    else {
      $http({
        method: 'PUT',
        url: '/blog/comments/' + $scope.blog.id,
        data: {
          "comment": $scope.blog
        }
      }).then(function successCallback(response) {
          if(response.data == 500) {addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');}
          $scope.showComments($scope.blog.id);
        },
        function errorCallback(response) {
          addFeedback("Se ha presentado un error, por favor vuelva a intentarlo", 'error');
        });
    }
  }

  $scope.getMonths = function($event) {
    var months = $($event.target).parent().next();
    if ($(months).css('display') == 'block') {
      $(months).fadeOut(1000);
    } else {
      $(months).show();
    }
  };
}]);


var createPostComments = function(compile, scope, comment) {
  angular.element(document.getElementById('space-for-comments')).append(compile(
    '<div class="col-sm-12" style="border-bottom: 3px solid">' +
    '<p style="font-weight:bold;">' + comment.author + '</p>' +
    '<p>' + comment.content + '</p>' +
    '</div>'
  )(scope));
}

var createBlogCard = function(compile, scope, post) {
  angular.element(document.getElementById('space-for-posts')).append(compile(
    '<a href="javascript:void(0)" ng-click="showComments(\'' + post._id + '\')">' +
    '<div class="row card-blog">' +
    '<h2>' + post.title + '</h2>' +
    '<p class="author">' + post.author + ' - ' + post.date + ' </p>' +
    '<p>' + post.content + '</p>' +
    '</div></a>'
  )(scope));
}
