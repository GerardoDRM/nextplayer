<!DOCTYPE html>
<html>

<head>
  <title>{{title}}</title>
  <!-- Latest compiled and minified CSS -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <!--STYLES-->
  <link rel="stylesheet" href="/styles/importer.css">
  <link rel="stylesheet" href="/styles/main.css">
  <link rel="stylesheet" href="/styles/jquery-ui.min.css">

  <!--STYLES END-->
</head>

<body class="color-profile" ng-app="UsersModule">
  <nav class="navbar navbar-default ">
    <div class="container-fluid ">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/user/home">
          <img class="logo" alt="Brand" src="../images/logo.png"> </a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right navbar-text">
          <li><a href="/user/home">Home</a></li>
          <li><a href="/">Perfil</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/combines">Combines</a></li>
          <li><a href="/logout">Log out</a></li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
  <input type="hidden" id="userSport" />
  <input type="hidden" value="<%= message.id %>" id="userId">
  <input type="hidden" value="<%= message.preview_id %>" id="previewId">
  <!-- Feedback -->
  <div id="feedback" class="feedback">
    <h3 id="feedback-msg"></h3>
  </div>
  {% block content %}{% endblock %}
  <footer class="footer">
    <div class="container">
      <div class="col-xs-12">
        <div class="row contact-foot">
          <div class="col-xs-12 col-sm-4">
            <p>
              Tel. 01 2222 61 90 30
            </p>
            <p> Email:info@nextplayers.mx </p>
          </div>
          <div class="col-xs-12 col-sm-4">
            <p>NextPlayers.mx</p>
          </div>
          <div class="col-xs-12 col-sm-4">
            <p>Términos de privacidad y política</p>
          </div>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="icons-social">
          <a href="#" class="facebookF" title="Facebook"></a>
          <a href="#" class="twitterF" title="Twitter"></a>
          <a href="#" class="instagramF" title="Instagram"></a>
        </div>
      </div>
    </div>
  </footer>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
  <script src="/js/dependencies/jquery-ui.min.js"></script>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min.js"></script>
  <script src="/js/dependencies/moment.min.js"></script>

  <!--SCRIPTS-->
  <script src="/js/dependencies/sails.io.js"></script>
  <script src="/js/public/signup/SignupModule.js"></script>
  <script src="/js/public/signup/SignupController.js"></script>
  <script src="/js/public/login/LoginModule.js"></script>
  <script src="/js/public/login/LoginController.js"></script>
  <!--SCRIPTS END-->
  <!--Profiles-->
  <script src="/js/public/user/countries.js"></script>
  <script src="/js/public/user/UsersModule.js"></script>
  <script src="/js/public/user/ProfileViewController.js"></script>
  <script src="/js/public/user/UserUpperBody.js"></script>
  <script src="/js/public/players/BasicInfoController.js"></script>
  <script src="/js/public/players/ExclusiveController.js"></script>
  <script src="/js/public/user/GalleryController.js"></script>
  <script src="/js/public/user/MembershipController.js"></script>
  <script src="/js/public/players/SportController.js"></script>
  <script src="/js/public/coachs/CoachInfoController.js"></script>
  <script src="/js/public/organization/BasicInfoController.js"></script>
  <script src="/js/public/organization/StaffController.js"></script>
  <script src="/js/public/organization/AchivementsController.js"></script>
  <script src="/js/public/organization/AccessController.js"></script>
  <script src="/js/public/organization/OrgPreviewController.js"></script>
  <script src="/js/public/blog/BlogController.js"></script>
  <script src="/js/public/homeProfile/HomeProfileController.js"></script>
  <script src="/js/public/homeProfile/HomeOrgController.js"></script>
  <script src="/js/public/homeProfile/SearchController.js"></script>


  {% block custom-scripts %} {% endblock custom-scripts %}

  <script>
    $(document).ready(function() {

      // Clone select list data in a custom select list
      // Replicate info
      $('#select-sport').each(function() {
        var numberOfOptions = $(this).children('option').length;
        $(this).wrap('<div class="select-sport"></div>');
        $(this).after('<div class="select-box"></div>');

        var $styledSelect = $('.select-box');
        $styledSelect.text($(this).children('option').eq(0).text());

        var $list = $('<ul />', {
          'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
          $('<li />', {
            text: $(this).children('option').eq(i).text(),
            rel: $(this).children('option').eq(i).val(),
            click: function() {
              $styledSelect.text($(this).text());
              //remove selected one
              $('#select-sport').find('option:selected').removeAttr('selected');
              //Using the value
              $('#select-sport').find('option[value="' + $(this).text() + '"]').attr("selected", true);
            }
          }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
          e.stopPropagation();
          $('.select-box.active').each(function() {
            $(this).removeClass('active').next('ul.select-options').hide();
          });
          $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $(document).click(function() {
          $styledSelect.removeClass('active');
          $list.hide();
        });

      }); // End custom select

      // Login Image update
      $(".select-options").children().click(function() {
        //Get val
        var userType = $('#select-sport').find('option:selected').val();
        if (userType == "Jugador") {
          $("#img-login").attr("src", "../images/jugador_escudo.png");
        } else if (userType == "Coach") {
          $("#img-login").attr("src", "../images/coach_escudo.png");
        } else if (userType == "Organización") {
          $("#img-login").attr("src", "../images/equipo_escudo.png");
        }

      });

      // Tabs which are used on navigation bar
      var tabItems = $('.menu-click');
      var tabContentWrapper = $('.cd-tabs-content');
      // This action will change the content for each tab
      tabItems.on("click", function(event) {
        var selectedItem = $(this);
        if (!selectedItem.hasClass('selected')) {
          var selectedTab = selectedItem.data('content'),
            selectedContent = tabContentWrapper.find('li[data-content="' + selectedTab + '"]');
          tabItems.removeClass('selected');
          selectedItem.addClass('selected');
          selectedContent.addClass('selected').siblings('li').removeClass('selected');
        }
      });

      // Validate Forms
      // Validate Checkbox
      $('#membership-form').validate({
        rules: {
          'group': {
            required: true
          }
        },
        messages: {
          'group': {
            required: "Debes de seleccionar el tipo de membresia"
          }
        }
      });
      jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es requerido",
        minlength: jQuery.validator.format("Por favor debe de haber almenos {0} caracteres."),
        email: "Ingresa un correo valido"
      });

      // Chat UI animation
      $("#button-chat").click(function() {
        if ($("#chat-structure").css('display') == 'block') {
          $("#chat-structure").hide(500);
        } else {
          $("#chat-structure").show(500);
          $("#conversation").hide(500);
          $("#inbox").show(500);
        }
      });

      $(".inbox-contact").click(function() {
        $("#inbox").hide(500);
        $("#conversation").show(500);
      });

      $("#return-inbox").click(function() {
        $("#conversation").hide(500);
        $("#inbox").show(500);
      });

    });
  </script>

</body>

</html>
