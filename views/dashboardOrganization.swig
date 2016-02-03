{% extends 'baseProfile.swig' %} {% block content %}

<div class="container container-dash no-padding" ng-app="PlayerModule">
  <div class="top-title-player" id="club-message">
    <h1 class="dissapear">
      Sube PLAYERS CLUB y
      <br> obten beneficios exclusivos
      </br>
    </h1>
  </div>

  <div class="images-profile background-img-profile" ng-controller="PlayerUpperBody">
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
        <div class="col-sm-4" style="margin-top:80px;">
          <a ng-click="viewProfile()">Ver perfil</a>
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
          <li class="dissapear">
            <a class="menu-click" data-content="staff" href="javascript:void(0)" id="staff-btn">
              <h3>
                Staff</h3>
            </a>
          </li>
          <li class="dissapear">
            <a class="menu-click" data-content="gallery" href="javascript:void(0)" id="gallery-btn">
              <h3>
                Galería</h3>
            </a>
          </li>
          <li class="dissapear">
            <a class="menu-click" data-content="achievements" href="javascript:void(0)" id="achievements-btn">
              <h3>
                Logros
              </h3>
            </a>
          </li>
          <li class="dissapear">
            <a class="menu-click" data-content="access" href="javascript:void(0)" id="access-btn">
              <h3>
                Accesos
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
          {% include "dashboard_organization/basic_info.swig" %}
        </li>
        <li data-content="staff" id="staff">
          {% include "dashboard_organization/staff.swig"%}
        </li>
        <li data-content="gallery" id="gallery">
          {% include "dashboard_organization/gallery.swig"%}
        </li>
        <li data-content="achievements" id="achievements">
          {% include "dashboard_organization/achievements.swig" %}
        </li>
        <li data-content="access" id="access">
          {% include "dashboard_organization/access.swig"%}
        </li>
        <li data-content="membership" id="membership">
          {% include "dashboard_organization/membership.swig"%}
        </li>
      </ul>
      <!-- cd-tabs-content -->

    </div>
  </div>

</div>
</div>

{% endblock content %}
