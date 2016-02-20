<!DOCTYPE html>
<html>

<head>
  <title>NextPlayers</title>
  <!-- Latest compiled and minified CSS -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta charset="UTF-8">
  <meta name="description" content="En Next Players estamos comprometidos a ayudar atletas, coaches y equipos alcanzar su potencial. Facilitaremos la búsqueda de talento y conexión entre jugadores y reclutadores, con mayor alcance.">
  <meta name="keywords" content="Next players, Nextplayers, reclutamiento deportivo, futbol americano, futbol soccer, basquetbol, becas deportivas, universidad, deporte universitario, atleta, beca">
  <meta name="author" content="Craft Code">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <!--STYLES-->
  <link rel="stylesheet" href="/styles/importer.css">
  <link rel="stylesheet" href="/styles/main.css">
  <!--STYLES END-->
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>

</head>

<body>
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
        <a class="navbar-brand" href="/">
          <img class="logo" alt="Brand" src="../images/logo.png"> </a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right navbar-text">
          <li><a href="/">Home</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Registro <span class="caret"></span></a>
            <ul class="dropdown-menu">

              <li><a href="/signup/player">Jugador</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="/signup/coach">Coach</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="/signup/organization">Organización</a></li>
            </ul>
          </li>
          <li><a href="/login">Login</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
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
            <img src="../images/logoNext.jpg" width="60px">
            <p> Email:info@nextplayers.mx </p>
          </div>
          <div class="col-xs-12 col-sm-4">
            <a style="color:white;" href="https://www.facebook.com/NextPlayersMX/?fref=ts" target="_blank"><p><img src="../images/social.svg" width="20px">NextPlayers.mx</p></a>
              <a style="color:white;" href="https://twitter.com/nextplayersmx" target="_blank"><p><img src="../images/twitter.svg" width="20px">@NextPlayersMX</p></a>
            <p><a style="color:white;"  href="http://www.craftcode.rocks"  target="_blank"><img src="../images/craft.svg" width="65px">Powered by CraftCode</a></p>
          </div>
          <div class="col-xs-12 col-sm-4">
          <a style="color:white;" href="/terms">  <p>Términos de uso</p> </a>
            <a style="color:white;" href="/privacity">  <p>Aviso de privacidad</p> </a>
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
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min.js"></script>


  <!--SCRIPTS-->
  <script src="/js/dependencies/sails.io.js"></script>
  <script src="/js/public/contact/ContactSendModule.js"></script>
  <script src="/js/public/contact/ContactSendController.js"></script>
  <script src="/js/public/user/UsersModule.js"></script>
  <script src="/js/public/signup/SignupModule.js"></script>
  <script src="/js/public/signup/SignupController.js"></script>
  <script src="/js/public/login/LoginModule.js"></script>
  <script src="/js/public/login/LoginController.js"></script>
  <script src="/js/public/user/ForgotPasswordController.js"></script>

  <!--SCRIPTS END-->
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

        // Adding glyficon
        $('<span class="glyphicon glyphicon-triangle-bottom glyphicon-direction" aria-hidden="true"></span>').appendTo($(".select-sport"));

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


      jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es requerido",
        minlength: jQuery.validator.format("Por favor debe de haber almenos {0} caracteres."),
        email: "Ingresa un correo valido",
        equalTo: "La Contraseña debe de ser la misma"
      });
      // Validate
      $("#form-signup").validate({
        rules: {
          model: {
            required: true
          },
          agree: {
            required: true
          }
        }
      });
      $("#form-login").validate();
      $("#form-contact").validate();
      $("#form-forgot").validate();
      $("#form-reset").validate({
        rules: {
          password2: {
            equalTo: "#password"
          }
        }
      });

      $("#dialogSample").click(function() {
        $("#dialogSample").css({
          opacity: 0,
          "pointer-events": "none"
        });
      });
      $(".dialogSample").click(function(e) {
        e.stopPropagation();
      });

    });

    // Sample profiles
    function showPreviewSample(model) {
      if (model == "team") {
        $("#dialogImgSample").attr("src", "../images/perfil_muestra_equipo.jpg");
      } else if (model == "player") {
        $("#dialogImgSample").attr("src", "../images/perfil_muestra_jugador.jpg");
      } else if (model == "coach") {
        $("#dialogImgSample").attr("src", "../images/perfil_muestra_coach.jpg");
      }
      $("#dialogSample").css({
        opacity: 1,
        "pointer-events": "auto"
      });
    }
  </script>

</body>

</html>
