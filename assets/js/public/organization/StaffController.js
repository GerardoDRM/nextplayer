angular.module('UsersModule').controller('StaffController', ['$scope', '$http', '$compile', function($scope, $http, $compile) {
  /* Status code photos
   * @code 0 = not change
   * @code 1 = update / insert
   * @code 2 = delete
   */
  $scope.count = 0;
  $scope.arrayPhotos;
  $scope.arrayInfo;
  $scope.pattern = /file-staff(\d+)/;

  $("#staff-btn").click(function() {
    $scope.count = 0;
    $scope.arrayPhotos = [];
    $scope.arrayInfo = [];
    $('#space-for-staff').empty();
    $("#staffForm")[0].reset();
    $http({
      method: 'GET',
      url: '/user/org/staff',
      params: {
        "user": $("#userId").val()
      }
    }).then(function successCallback(response) {
      var staffList = response.data;
      for (var i = 0; i < staffList.length; i++) {
        if (staffList[i] != null) {
          createStaff($scope.count, $compile, $scope);
          $scope.count++;
          $("#staffRef" + i).val(i);
          $("#name" + i).val(staffList[i]["name"]);
          $("#position" + i).val(staffList[i]["position"]);
          $("#sport" + i).val(staffList[i]["sport"]);
          // Update UI
          if (staffList[i]["path"] != "" && staffList[i]["path"] != "/assets/uploads/") {
            var fileElement = $("#file-staff" + i)[0];
            var phrase = staffList[i]["path"];
            var myRegexp = /uploads\/(.*)/;
            var match = myRegexp.exec(phrase);
            updateUIPreview(fileElement, match[0]);
            $scope.arrayPhotos[i] = {
              "file": staffList[i]["path"],
              "status": 0
            };
          }
        }
      }
    }, function errorCallback(response) {
    });
  });

  $scope.update = function() {
    if ($("#staffForm").valid()) {
      staffCounter = $scope.count;
      for (var i = 0; i < staffCounter; i++) {
        $scope.arrayInfo[i] = {
          "array_pos": parseInt($("#staffRef" + i).val()),
          "name": $('#name' + i).val(),
          "position": $("#position" + i).val(),
          "sport": $("#sport" + i).val(),
          "file_photo": $scope.arrayPhotos[i] === undefined ? "" : $scope.arrayPhotos[i]
        };
      }
      // Loading
      // $("#loading").css({
      //   opacity: 1,
      //   "pointer-events": "auto"
      // });
      $http({
        method: 'PUT',
        url: '/user/org/staff',
        data: {
          "staff": $scope.arrayInfo,
          "user": $("#userId").val()
        }
      }).then(function successCallback(response) {
        console.log(response);
        addFeedback("Los cambios han sido guardados exitosamente", "success");
        $("#staff-btn").trigger("click");
        // $("#loading").css({opacity: 0, "pointer-events": "none"});
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  };

  $scope.deletePhoto = function($event) {
    var selectImage = $($event.target).parent().parent().prev();
    $(selectImage[0]).css({
      "display": "block"
    });
    var previewImage = $($event.target).parent().parent();
    $(previewImage[0]).css({
      "display": "none"
    });

    // Clear file
    var file = $(selectImage).children()[1];
    $(file).val(undefined);

    // Delete from list and update status
    var inputId = $(selectImage).children()[1];
    var matches = Number(inputId.id.match(/file-staff(\d+)/)[1]);
    // Delete just from array
    $scope.arrayPhotos[matches] !== undefined ? $scope.arrayPhotos[matches] = {
      "file": "",
      "status": 2
    } : $scope.arrayPhotos[matches] = undefined;
  };

  $scope.deleteComplete = function($event) {
    var deleteEvent = $event.target;
    var position = parseInt($(deleteEvent).next().val());
    // Remove just from view
    if (!isNaN(position)) {
      $http({
        method: 'DELETE',
        url: '/user/org/staff',
        data: {
          "position": position,
          "user": $("#userId").val()
        }
      }).then(function successCallback(response) {
        addFeedback("Se ha removido un elemento del staff", "success");
        $("#staff-btn").trigger("click");
        // $("#loading").css({opacity: 0, "pointer-events": "none"});
      }, function errorCallback(response) {
        console.log(response);
      });
    }
    // Delete from list and update status
    $(deleteEvent).parent().remove();
    var inputId = $(deleteEvent).next().next().children()[1];
    var matches = Number(inputId.id.match(/file-staff(\d+)/)[1]);
    // Delete just from array
    $scope.arrayPhotos.splice(matches, 1);
    $scope.count -= 1;
  }
}]);


// Create Dynamic experience rows
var createStaff = function(i, compile, scope) {
  angular.element(document.getElementById('space-for-staff')).append(compile(
    '<div class="col-sm-4" style="margin-bottom:10px;">' +
    '<a class="anchor-coach" href="javascript:void(0);" ng-click="deleteComplete($event);">- Remover staff</a>' +
    '<input type="hidden" id="staffRef' + i + '">' +
    '<div class="photo">' +
    '<img alt="..." src="../images/photo.png"/>' +
    '<input type="file" filearray id="file-staff' + i + '" name="file-staff' + i + '" style="top:15px"/>' +
    '</div>' +
    '<div class="photo-preview" style="margin-bottom:25px;">' +
    '<div class="inner-filter"><a ng-click="deletePhoto($event)"></a></div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-sm-6">' +
    '<div class="form-group-modified align-labels">' +
    '<label >Nombre</label>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<input class="form-group-modified-input" type="text" name="name' + i + '" id="name' + i + '"required>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-sm-6">' +
    '<div class="form-group-modified align-labels">' +
    '<label >Puesto</label>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<input class="form-group-modified-input" type="text" name="position' + i + '" id="position' + i + '" required>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col-sm-6">' +
    '<div class="form-group-modified align-labels">' +
    '<label >Deporte</label>' +
    '</div>' +
    '</div>' +
    '<div class="col-sm-6">' +
    '<input class="form-group-modified-input" type="text" name="sport' + i + '" id="sport' + i + '" required>' +
    '</div>' +
    '</div>' +
    '</div>'
  )(scope));

  $("input[name='file-staff" + i + "']").rules("add", { // <- apply rule to new field
    required: true
  });
  $("input[name='name" + i + "']").rules("add", { // <- apply rule to new field
    required: true
  });
  $("input[name='position" + i + "']").rules("add", { // <- apply rule to new field
    required: true
  });
  $("input[name='sport" + i + "']").rules("add", { // <- apply rule to new field
    required: true
  });
};

angular.module('UsersModule').directive("staff", function($compile) {
  return function(scope, element, attrs) {
    element.bind("click", function() {
      if (scope.count < 10) {
        createStaff(scope.count, $compile, scope);
        scope.count++;
      }
    });
  };
});

angular.module('UsersModule').directive("filearray", [function() {
  return {
    restrict: "EA",
    scope: false,
    link: function(scope, element, attributes) {
      element.bind("change", function(changeEvent) {
        var reader = new FileReader();
        reader.onload = function(loadEvent) {
          scope.$apply(function() {
            var photo = {
              "file": "",
              "status": ""
            };
            var data = loadEvent.target.result;
            var secureFile = data.match(/^data:image\/(png|jpg|jpeg)/) != null ? true : false;
            var imageCode = data;
            if (secureFile) {
              // Check file size
              if (changeEvent.target.files[0].size < 1000000) {
                data = data.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                photo["file"] = data;
                photo["status"] = 1;

                // Update UI
                updateUIPreview(element[0], imageCode);

                // Check if is the same element
                var matches = element[0].id.match(scope.pattern);
                var id = Number(matches[1]);
                // Add photo object
                scope.arrayPhotos[id] = photo;
              } else {
                addFeedback("El tamaño de la imagen tiene que ser menor a 1MB");
              }
            } else {
              addFeedback("Debes de adjuntar una imagen");
            }
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);

      });
    }
  }
}]);


var updateUIPreview = function(element, data) {
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
}
