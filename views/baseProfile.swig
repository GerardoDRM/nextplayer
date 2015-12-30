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
  <!--STYLES END-->
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

          <li><a href="/login">Blog</a></li>
          <li><a href="#">Combines</a></li>
            <li><a href="#">Log out</a></li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </div>
    <!-- /.container-fluid -->
  </nav>

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

  <!--SCRIPTS-->
  <script src="/js/dependencies/sails.io.js"></script>
  <script src="/js/public/signup/SignupModule.js"></script>
  <script src="/js/public/signup/SignupController.js"></script>
  <script src="/js/public/login/LoginModule.js"></script>
  <script src="/js/public/login/LoginController.js"></script>
  <!--SCRIPTS END-->
  <script>
    var states = ["Aguascalientes", "Baja California", "Baja California Sur",
      "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Distrito Federal",
      "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco",
      "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
      "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
      "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán"
    ];

    var countries = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda",
      "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas",
      "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia",
      "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután",
      "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano",
      "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba",
      "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia",
      "Eslovenia", "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón",
      "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea - Bisáu",
      "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón",
      "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto",
      "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas",
      "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro",
      "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos",
      "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricanaç",
      "República Checa", "República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana",
      "Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía",
      "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka",
      "Suazilandia", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania",
      "Tayikistán", "Timor Orienta", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania",
      "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia",  "Zimbabue"
    ];

    var years = ["1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001",
"2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016"];

  var twenty = ["1985","1986","1987","1988","1989","1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000","2001",
"2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016"];

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

      // Selection states
      for (i in states) {
        $("#states-list").append($("<option>", {
          value: states[i],
          text: states[i]
        }));
      }

      // Selection country
      for (j in countries) {
        $("#countries-list").append($("<option>", {
          value: countries[j],
          text: countries[j]
        }));
      }

      for (k in years) {
        $("#years-list").append($("<option>", {
          value: years[k],
          text: years[k]
        }));
      }

      for (n in twenty) {
        $("#twenties-list").append($("<option>", {
          value: twenty[n],
          text: twenty[n]
        }));
      }

    });
  </script>

</body>

</html>
