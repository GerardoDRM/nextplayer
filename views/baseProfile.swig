<!DOCTYPE html>
<html>

<head>
  <title>NextPlayers</title>
  <!-- Latest compiled and minified CSS -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="En Next Players estamos comprometidos a ayudar atletas, coaches y equipos alcanzar su potencial. Facilitaremos la búsqueda de talento y conexión entre jugadores y reclutadores, con mayor alcance.">
  <meta name="keywords" content="Next players, Nextplayers, reclutamiento deportivo, futbol americano, futbol soccer, basquetbol, becas deportivas, universidad, deporte universitario, atleta, beca">
  <meta name="author" content="Craft Code">
  <meta name="google-site-verification" content="7LHxZHxFVPqkEVQBl3BkEF9t4H_XeyTOe_uj0a_1w2A" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
  <!--STYLES-->
  <link rel="stylesheet" href="/styles/importer.css">
  <link rel="stylesheet" href="/styles/main.css">
  <link rel="stylesheet" href="/styles/jquery-ui.min.css">

  <!--STYLES END-->

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
  <!-- Facebook Pixel Code -->
  <script>
    ! function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window,
      document, 'script', '//connect.facebook.net/en_US/fbevents.js');

    fbq('init', '1396521313988762');
    fbq('track', "PageView");
  </script>
  <noscript>
    <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1396521313988762&ev=PageView&noscript=1" />
  </noscript>
  <!-- End Facebook Pixel Code -->


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
        <img class="logo" alt="Brand" src="../images/logo.png">
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right navbar-text">
          {% if message.session %}
          <li><a href="/search/<%=message.session %>">Buscar</a></li>
          <li><a href="/inner/logout/<%=message.id %>/<%=message.session %>">Cerrar session de Reclutador</a></li>
          {% else %}
          <li><a href="/user/home">Home</a></li>
          <li><a href="/">Perfil</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/combines">Combines</a></li>
          <li><a href="/logout">Log out</a></li>
          {% endif %}
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>
  <input type="hidden" id="userSport" />
  <input type="hidden" value="<%= message.id %>" id="userId">
  <input type="hidden" value="<%= message.preview_id %>" id="previewId">
  <input type="hidden" value="<%=message.session%>" id="session" />
  <input type="hidden" value="<%=message.recruiter_name%>" id="recruiter" />
  <input type="hidden" value="0" id="basic_flag" />

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
            <p> Email:contacto@nextplayers.mx </p>
          </div>
          <div class="col-xs-12 col-sm-4">
            <a style="color:white;" href="https://www.facebook.com/NextPlayersMX/?fref=ts">
              <p>
                <img src="../images/social.svg" width="20px">NextPlayers.mx</p>
            </a>
            <a style="color:white;" href="https://twitter.com/nextplayersmx" target="_blank">
              <p>
                <img src="../images/twitter.svg" width="20px">@NextPlayersMX</p>
            </a>
            <p>
              <a style="color:white;" href="http://www.craftcode.rocks" target="_blank">
                <img src="../images/craft.png" width="65px">Powered by CraftCode</a>
            </p>
          </div>
          <div class="col-xs-12 col-sm-4">
            <a style="color:white;" href="/terms">
              <p>Términos de uso</p>
            </a>
            <a style="color:white;" href="/privacity">
              <p>Aviso de privacidad</p>
            </a>
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
  <script src="/js/dependencies/jquery-ui.min.js"></script>
  <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.14.0/jquery.validate.min.js"></script>
  <script src="/js/dependencies/moment.min.js"></script>

  <!--SCRIPTS-->
  <script src="/js/dependencies/sails.io.js"></script>
  <script src="/js/dependencies/app.js"></script>
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
      $('#carousel').carousel({
        interval: 3000,
        cycle: true
      });

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
        if ($("#basic_flag").val() == 0) return;
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
      jQuery.extend(jQuery.validator.messages, {
        required: "Este campo es requerido",
        minlength: jQuery.validator.format("Por favor debe de haber almenos {0} caracteres."),
        email: "Ingresa un correo valido"
      });
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
      // Validate Staff
      $("#staffForm").validate();
      // Validate Comment
      $("#form-comment").validate();

      $("#basic-player-form").validate({
        rules: {
          'country': {
            required: true
          }
        },
      });
      $("#basic-org-form").validate({
        rules: {
          'country': {
            required: true
          }
        },
      });
      $("#basic-coach-form").validate({
        rules: {
          'country': {
            required: true
          }
        },
      });


      // Chat UI animation
      $(".inbox-contact").click(function() {
        $("#inbox").hide(500);
        $("#conversation").show(500);
      });

      $("#return-inbox").click(function() {
        $("#conversation").hide(500);
        $("#inbox").show(500);
      });

    });

    function showSport(sport) {
      switch (sport) {
        case "Fútbol americano":
          $("#change-sport").attr("src", "../images/contador_americano.png");
          break;
        case "Atletismo":
          $("#change-sport").attr("src", "../images/contador_atletismo.png");
          break;
        case "Baloncesto":
          $("#change-sport").attr("src", "../images/contador_baloncesto.png");
          break;
        case "Fútbol rápido":
          $("#change-sport").attr("src", "../images/contador_futbol_rapido.png");
          break;
        case "Golf":
          $("#change-sport").attr("src", "../images/contador_golf.png");
          break;
        case "Rugby":
          $("#change-sport").attr("src", "../images/contador_rugby.png");
          break;
        case "Beisbol":
          $("#change-sport").attr("src", "../images/contador_baseball.png");
          break;
        case "Fútbol soccer":
          $("#change-sport").attr("src", "../images/contador_soccer.png");
          break;
        case "Taekwondo":
          $("#change-sport").attr("src", "../images/contador_taekwondo.png");
          break;
        case "Tenis Mesa":
          $("#change-sport").attr("src", "../images/contador_tenis_mesa.png");
          break;
        case "Tenis":
          $("#change-sport").attr("src", "../images/contador_tenis.png");
          break;
        case "Voleibol Sala":
          $("#change-sport").attr("src", "../images/contador_voleibol_sala.png");
          break;
        case "Voleibol Playa":
          $("#change-sport").attr("src", "../images/contador_voleibol_playa.png");
          break;
        default:
          console.log("Wrong Sport");
      }
    }
  </script>

</body>

</html>
