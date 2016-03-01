{% extends 'base.swig' %} {% block content %}

<div class="carousel slide" data-ride="carousel" id="carousel-example-generic">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li class="active" data-slide-to="0" data-target="#carousel-example-generic"></li>
    <li data-slide-to="1" data-target="#carousel-example-generic"></li>
    <li data-slide-to="2" data-target="#carousel-example-generic"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">

    <div class="item active">
      <div class="carousel-images">
        <div class="margin-top">
          <h1 class="dissapear">
            DARE
          </h1>
          <h3 class="dissapear">
            TO
          </h3>
          <h2 class="dissapear">
            DREAM
          </h2>
          <p class="dissapear">
            Sueñas con jugar al siguiente nivel?
          </p>
          <p class="dissapear">
            únete a nextplayers, creando tu perfil con
          </p>
          <p class="dissapear">
            todos tus datos, fotos y vídeos.
          </p>

          <h3 class="dissapear">
            ¡ES GRATIS!
          </h3>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="carousel-images-dos"></div>
    </div>

    <div class="item">
      <div class="carousel-images-tres"></div>
    </div>

  </div>

  <!-- Controls -->
  <a class="left carousel-control" data-slide="prev" href="#carousel-example-generic" role="button">
    <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" data-slide="next" href="#carousel-example-generic" role="button">
    <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

<!-- After carousel -->

<div class="midtern-header">
  <h1>
    ¡BIENVENIDO A NEXTPLAYERS!
  </h1>
  <p>
    la única plataforma de reclutamiento deportivo en México
  </p>

</div>
<div class="container-fluid">
  <div class="container">
    <div class="middle-body">
      <div class="row">
        <div class="col-sm-8">
          <h1>
            CREA TU PERFIL
          </h1>
          <div class="row">
            <div class="col-sm-4">
              <a href="/signup/coach">
                <img alt="..." src="../images/coach_escudo.png">
              </a>
              <h2>COACHES
              </h2>
            </div>
            <div class=" col-sm-4">
              <a href="/signup/organization">
                <img alt="..." src="../images/equipo_escudo.png">
              </a>
              <h2>EQUIPOS
              </h2>
            </div>
            <div class=" col-sm-4">
              <a href="/signup/player">
                <img alt="..." src="../images/jugador_escudo.png">
              </a>
              <h2>JUGADORES
              </h2>
            </div>
          </div>
          <p>REGISTRÉNSE PARA ACCEDER A NUESTRA BASE DE DATOS
          </p>
        </div>
        <div class="col-sm-4 nike-img ">

        </div>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid " style="background-color: #e9eaed ;">
  <div class="container">
    <div class="middle-middle">
      <div class="row row-middle">
        <div class="col-sm-12 col-md-3">
          <h2 class="dissapear">
            PERFILES MUESTRA
          </h2>
        </div>
        <div class="col-sm-4 col-md-3">
          <a onclick="showPreviewSample('team')">
            <img alt="..." src="../images/equipo_muestra.png">
          </a>
        </div>
        <div class="col-sm-4 col-md-3">
          <a onclick="showPreviewSample('player')">
            <img alt="..." src="../images/jugador_muestra.png">
          </a>
        </div>
        <div class="col-sm-4 col-md-3">
          <a onclick="showPreviewSample('coach')">
            <img alt="..." src="../images/coach_muestra.png">
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid">
  <div class="container">
    <div class="middle-counter">
      <div class="row row-after">
        <div class="col-xs-6 col-sm-3">
          <img alt="..." src="../images/contador_soccer.png">
          <!--  <h2 class="dissapear"> 21 </h2> -->
        </div>
        <div class="col-xs-6 col-sm-3">
          <img alt="..." src="../images/contador_americano.png">
          <!--  <h2 class="dissapear"> 21 </h2> -->
        </div>
        <div class="col-xs-6 col-sm-3">
          <img alt="..." src="../images/contador_tenis.png">
          <!--  <h2 class="dissapear"> 21 </h2> -->
        </div>
        <div class="col-xs-6 col-sm-3">
          <img alt="..." src="../images/contador_baloncesto.png">
          <!--  <h2 class="dissapear"> 21 </h2> -->
        </div>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid" style="background-color: #e9eaed ;">
  <div class="container">
    <div class="mision-vision">
      <div class="row">
        <div class="col-sm-6">
          <h2>
            MISIÓN
          </h2>
          <p>
            En Next Players estamos comprometidos a ayudar atletas, coaches y equipos alcanzar su potencial. Facilitaremos la búsqueda de talento y conexión entre jugadores y reclutadores con mayor alcance para contribuir a mejorar la calidad del nivel deportivo en el país. Apoyaremos a atletas, coaches y equipos a desarrollar sus aptitudes físicas y mentales.
          </p>
        </div>
        <div class="col-sm-6">
          <h2>
            VISIÓN
          </h2>
          <p>Seremos una plataforma innovadora que está al tanto de las nuevas tendencias tecnológicas y deportivas para lograr ser una empresa reconocida a nivel mundial en el reclutamiento deportivo.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modalDialog" id="dialogSample">
  <div class="dialogSample">
    <img id="dialogImgSample" style="width: 100%;">
  </div>
</div>
{% endblock %}
