{% extends 'baseProfile.swig' %}
{% block content %}

<div class="container container-dash no-padding">
  <div class="top-title-player" id="club-message">
    <h1 class="dissapear">
      Obtén la Membresía Players Club
      <br>
      para Beneficios exclusivos
    </br>
  </h1>
</div>

<div class="images-profile background-img-profile" ng-controller="UserUpperBody">
  <div class="row no-margin--sides">
    <div class="col-sm-3 no-padding dissapear">
      <input class="profile" type="hidden" value="0">
      <div class="middle-image profile-photo" id="profilePhoto">
        <div class="default-photo full-wrapper">
          <img alt="..." class="photo-icon" src="../images/photo.png">
        </div>
        <input fileread type="file"/>
      </div>
      <div class="profile-preview">
        <div class="inner-filter">
          <a ng-click="deletePhoto($event)"></a>
        </div>
      </div>
    </div>
    <div class="col-sm-9 no-padding image-picture-two">
      <div class="col-sm-4 dissapear">
        <img alt="..." class="icons-sport" id="change-sport">
      </div>
      <div class="col-sm-4">
        <div class="title">
          <h2>
            Edita tu perfil
          </h2>
        </div>
      </div>
      <div class="col-sm-4" style="margin-top:80px;">
        <a class="view-green--btn" ng-click="viewProfile()">Ver perfil</a>
      </div>
    </div>
  </div>
</div>
<div class="row no-margin--sides">
  <div class="col-sm-3 no-padding">
    <div class="dl-menuwrapper-admin " id="dl-menu">

      <ul class="dl-menu-admin" id="titles">
        <li>
          <a class="menu-click selected" data-content="basic" href="javascript:void(0)" id="basic-btn">

            <h3>

              Información básica
            </h3>
          </a>
        </li>
        <li>
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
        <li>
          <a class="menu-click" data-content="exclusive" href="javascript:void(0)" id="exclusive-btn">
            <h3>
              Beneficios Playes Club
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
  <div class="col-sm-9 no-padding">
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
      <li data-content="exclusive" id="exclusive">
        {% include "dashboard_players/players_club.swig" %}
      </li>
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
