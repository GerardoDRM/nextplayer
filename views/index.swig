{% extends 'base.swig' %} {% block content %}

<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">

    <div class="item active">
      <div class="carousel-images">
        <div class="margin-top">
        <h1 class="dissapear"> DARE </h1>
        <h3 class="dissapear"> TO </h3>
        <h2 class="dissapear"> DREAM </h2>
        <p class="dissapear"> Sueñas con jugar al siguiente nivel? </p>
        <p class="dissapear"> únete a nextplayers, creando tu perfil con </p>
        <p class="dissapear"> todos tus datos, fotos y vídeos. </p>

        <h3 class="dissapear"> ¡ES GRATIS! </h3>
      </div>
      </div>
    </div>
    <div class="item">
      <div class="carousel-images-dos">
      </div>
    </div>

    <div class="item">
      <div class="carousel-images-tres">
      </div>
    </div>

  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

<!-- After carousel -->

<div class="midtern-header">
  <h1> BIENVENIDO A NEXTPLAYERS! </h1>
  <p> la única plataforma de reclutamiento deportivo en México </p>

</div>
<div class="container-fluid">
  <div class="container">
    <div class="middle-body">
      <div class="row">
        <div class="col-sm-8">
          <h1> CREA TU PERFIL </h1>
          <div class="row">
            <div class="col-sm-4">
              <a href="/signup/coach">
                <img src="../images/coach_escudo.png" alt="...">
              </a>
              <h2>COACHES </h2>
            </div>
            <div class=" col-sm-4">
              <img src="../images/equipo_escudo.png" alt="...">
              <h2>EQUIPOS </h2>
            </div>
            <div class=" col-sm-4">
              <a href="/signup/player">
                <img src="../images/jugador_escudo.png" alt="...">
              </a>
              <h2>JUGADORES </h2>
            </div>
          </div>
          <p>REGISTRÉNSE PARA ACCEDER A NUESTRA BASE DE DATOS </p>
        </div>
        <div class="col-sm-4 nike-img ">
          <img src="../images/nike.jpg" alt="..." class="dissapear">
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
          <h2 class="dissapear"> PERFILES MUESTRA </h2>
        </div>
        <div class="col-sm-4 col-md-3">
          <img src="../images/equipo.png" alt="...">
        </div>
        <div class="col-sm-4 col-md-3">
          <img src="../images/jugador.png" alt="...">
        </div>
        <div class="col-sm-4 col-md-3">
          <img src="../images/coach.png" alt="...">
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
          <img src="../images/contador_temporal.png" alt="...">
          <!--  <h2 class="dissapear"> 21 </h2> -->
        </div>
        <div class="col-xs-6 col-sm-3">
          <img src="../images/contador_temporal.png" alt="...">
        <!--  <h2 class="dissapear"> 21 </h2> -->
        </div>
        <div class="col-xs-6 col-sm-3">
          <img src="../images/contador_temporal.png" alt="...">
          <!--  <h2 class="dissapear"> 21 </h2> -->
        </div>
        <div class="col-xs-6 col-sm-3">
          <img src="../images/contador_temporal.png" alt="...">
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
          <h2> MISIÓN </h2>
          <p>

            Nuestra misión es ayudar a todos los atletas de México que buscan una oportunidad de poder estudiar y por medio de sus habilidades tanto deportivas poder obtener una beca universitaria en las mejores escuelas de México. </p>
        </div>
        <div class="col-sm-6">
          <h2> VISIÓN </h2>
          <p>Nuestra visión es llegar a satisfacer las necesidades de todas las universidades en México y facilitar la búsqueda de los mejores atletas. </p>
        </div>
      </div>
    </div>
  </div>
</div>

{% endblock %}
