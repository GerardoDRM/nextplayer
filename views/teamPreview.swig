{% extends 'baseProfile.swig' %} {% block content %}
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->


  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">

    <div class="item active">
      <div class="carousel-images">
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


<div class="container" style="width: 1061px;
    margin-top: -125px;">
  <div class="row">
    <div class="col-sm-5" style="padding-right:0px;">
      <div class="photo-team-preview ">
      </div>
    </div>
    <div class="col-sm-7 head-preview" style="    padding-right: 0px;">
      <h2> Universidad de las Américas Puebla


      </h2>
        <p>Puebla, México </p>
      <h1 class="head-body-bottom border-top-column"> Acerca de </h1>
      <p class="body-paragraph-bottom">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et </p>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-5 border-right-column">
      <div class="left-profile">

        <div class="save-button" style="text-align:left">
          <button style=" margin-bottom:20px;    margin-top: 20px;" class="input-signup" ng-click="storeSport()">Editar perfil</button>
        </div>
        <div class="special-two-col">
          <p class="head-paragraph"> Dirección </p>
          <p class="body-paragraph-left">Ex-Hacienda Santa Catarina </p>
          <p class="body-paragraph-left">Mártir S/N, 72810 </p>
          <p class="body-paragraph-left">San Andrés Cholula,Pue. </p>
        </div>
        <div class="special-two-col">
          <p class="head-paragraph"> Información </p>
          <p class="body-paragraph-left">reclutamiento@udlap.mx </p>
          <p class="body-paragraph-left">www.udlap.mx</p>
        </div>
        <div class="exclusive-club">

          <p class="head-paragraph border-top-column ">Staff </p>
          <div class="row">
            <div class="col-xs-3 ">
              <div class="profile-photos-slide-exclusive team-photos"> </div>
            </div>
            <div class="col-xs-5">
              <p class="head-paragraph"> Header coach </p>
              <p class="body-paragraph-left">Eric Fisher </p>
              <p class="body-paragraph-left">Fútbol Americano </p>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-3">
              <div class="profile-photos-slide-exclusive team-photos"> </div>
            </div>
            <div class="col-xs-5">
              <p class="head-paragraph"> Header coach </p>
              <p class="body-paragraph-left">Eric Fisher </p>
              <p class="body-paragraph-left">Fútbol Americano </p>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-3">
              <div class="profile-photos-slide-exclusive team-photos"> </div>
            </div>
            <div class="col-xs-5">
              <p class="head-paragraph"> Header coach </p>
              <p class="body-paragraph-left">Eric Fisher </p>
              <p class="body-paragraph-left">Fútbol Americano </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-7">

      <div>
        <h2> Logros </h2>

        <div class="row">
          <div class="col-sm-1">
            <p style="color:#2ae92e; font-weight:bold;">1990 </p>
          </div>
          <div class="col-sm-10">
            <p class="body-paragraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
            <p style="color:#2ae92e; font-weight:bold;">1990 </p>
          </div>
          <div class="col-sm-10">
            <p class="body-paragraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-1">
            <p style="color:#2ae92e; font-weight:bold;">1990 </p>
          </div>
          <div class="col-sm-10">
            <p class="body-paragraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-1">
            <p style="color:#2ae92e; font-weight:bold;">1990 </p>
          </div>
          <div class="col-sm-10">
            <p class="body-paragraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-1">
            <p style="color:#2ae92e; font-weight:bold;">1990 </p>
          </div>
          <div class="col-sm-10">
            <p class="body-paragraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>
          </div>
        </div>





      </div>

      <div class="video-profile dissapear">
        <h1 class="head-body border-top-column"> Vídeo </h1>
        <div style="text-align:center;">
          <iframe style="text-align:center;" width="90%" height="360" src="https://www.youtube.com/embed/q57qB6Kwroo" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>



</div>





{% endblock content %}
