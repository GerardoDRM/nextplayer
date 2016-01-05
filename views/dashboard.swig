{% extends 'baseProfile.swig' %}
{% block content %}

<div class="container container-dash no-padding">
  <div class="top-title-player">
    <h1 class="dissapear">
      Sube PLAYERS CLUB y
      <br>
      obten beneficios exclusivos
    </br>
  </h1>
</div>

<div class="images-profile background-img-profile">
  <div class="row no-margin--sides">
    <div class="col-sm-3 no-padding dissapear">
      <div class="middle-image profile-photo">
        <div class="default-photo full-wrapper">
          <img class="photo-icon" alt="..." src="../images/photo.png">
        </div>
      </div>
    </div>
    <div class="col-sm-9 no-padding image-picture-two">
      <div class="col-sm-4 dissapear">
          <img class="icons-sport" alt="..." src="../images/contador_temporal.png">
      </div>
      <div class="col-sm-4">
        <div class="title">
          <h2>
            Edita tu perfil
          </h2>
        </div>
      </div>
      <div class="col-sm-4">
        <input class="form-buttom  " type="submit" value="Publicar"/>
      </div>
    </div>
  </div>
</div>
<div class="row no-margin--sides">
  <div class="col-sm-3 no-padding">
    <div class="dl-menuwrapper-admin " id="dl-menu">

      <ul class="dl-menu-admin" id="titles">
        <li>
          <a class="menu-click selected" data-content="basic" href="javascript:void(0)">

            <h3>

              Información básica
            </h3>
          </a>
        </li>
        <li class="dissapear">
          <a class="menu-click" data-content="sports" href="javascript:void(0)" id="sports-btn">
            <h3>
              Deporte</h3>
          </a>
        </li>
        <li class="dissapear">
          <a class="menu-click" data-content="gallery" href="javascript:void(0)" id="gallery-btn">
            <h3>
              Galería</h3>
          </a>
        </li>
        <li class="dissapear">
          <a class="menu-click" data-content="exclusive" href="javascript:void(0)" id="exclusive-btn">
            <h3>
              ¿Por qué quiero ser reclutado?
            </h3>
          </a>
        </li>
        <li>
          <a class="menu-click" data-content="membership" href="javascript:void(0)" id="membership-btn">
            <h3>
              Membresía
            </h3>
          </a>
        </li>
      </ul>
    </div>

  </div>
  <div class="col-sm-9  font-basic">
    <ul class="cd-tabs-content" style="height: auto;">
      <li class="selected" data-content="basic" id="basic">
        {% include "dashboard_players/basic_info.swig" %}
      </li>
      <li data-content="sports" id="sports">
        {% include "dashboard_players/sport.swig"%}
      </li>
      <li data-content="gallery" id="gallery">
        {% include "dashboard_players/gallery.swig"%}
      </li>
      <li data-content="exclusive" id="exclusive"></li>
      <li data-content="membership" id="membership">
        {% include "dashboard_players/membership.swig"%}
    </li>
  </ul>
  <!-- cd-tabs-content -->

</div>
</div>

</div>
</div>

{% endblock content %}
