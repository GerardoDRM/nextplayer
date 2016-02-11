{% extends 'baseProfile.swig' %}
{% block content %}
<div class="container profile-view-container" ng-app="UsersModule" ng-controller="ProfileViewController">
  <div class="row">
    <div class="col-sm-12">
      <h1>{{ user.name }}
        {{ user.lastname }}
      </h1>
      <p class="sub-title">{{ user.state }},
        {{ user.country }}
      </p>
      <div class="input-profile">
        <a class="dissapear" href="javascript:void(0);" ng-click="viewDashboard()" id="editProfile1" style=" margin:10px 0;">Edita tu perfil</a>
        <a class="dissapear" href="javascript:void(0);" ng-click="follow()" id="follow1" style=" margin:10px 0;">Seguir</a>
      </div>
    </div>
    <div class="col-sm-4 border-right-column">
      <div class="left-profile">
        <div class="profile-picture" id="profilePhoto"></div>
        <div class="responsive-button">
          <a href="javascript:void(0);" ng-click="viewDashboard()" id="editProfile2" style=" margin:10px 0;">Edita tu perfil</a>
          <a class="dissapear" href="javascript:void(0);" ng-click="follow()" id="follow2" style=" margin:10px 0;">Seguir</a>
        </div>
        <div class="special-two-col">
          <p class="head-title">
            Contacto
          </p>
          <p>mail:
            {{ user.email }}
          </p>
          <p>Teléfono:
            {{ user.phone }}
          </p>
        </div>
        <div class="exclusive-club" id="exclusiveViews">

          <p class="head-paragraph border-top-column ">
            ¿Quién ha visto mi perfil?
          </p>
          <p>
            (Exclusivo Players Club)
          </p>
          <div class="row">
            <div class="col-xs-3">
              <div class="profile-photos-slide-exclusive"></div>
            </div>
            <div class="col-xs-3">
              <div class="profile-photos-slide-exclusive"></div>
            </div>
            <div class="col-xs-3">
              <div class="profile-photos-slide-exclusive"></div>
            </div>
            <div class="col-xs-3">
              <div class="profile-photos-slide-exclusive"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-8">
      <div>
        <div class="row">
          <div class="col-sm-6">
            <div class="row">
              <div class="col-xs-6">
                <p>Equipo
                </p>
              </div>
              <div class="col-xs-6">
                <p class="green-title">{{ user.sport.team }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <p>Promedio
                </p>
              </div>
              <div class="col-xs-6">
                <p class="green-title">{{ user.details.schoolGrade }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <p>
                  Escuela
                </p>
              </div>
              <div class="col-xs-6">
                <p class="green-title">{{ user.details.school }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <p>
                  Fecha de nacimiento
                </p>
              </div>
              <div class="col-xs-6">
                <p class="green-title">{{ user.born }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <p>
                  Egreso de Secundaria
                </p>
              </div>
              <div class="col-xs-6">
                <p class="green-title">
                  {{ user.details.schoolYear }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <p>
                  Posición
                </p>
              </div>
              <div class="col-xs-6">
                <p class="green-title">
                  {{ user.pos }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-6">
                <div class="row">
                  <div class="col-xs-6">
                    <p>Peso</p>
                  </div>
                  <div class="col-xs-6">
                    <p class="green-title">{{ user.sport.weight }}
                      kg</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6">
                    <p>Altura</p>
                  </div>
                  <div class="col-xs-6">
                    <p class="green-title">{{ user.sport.height }}
                      m</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-6">
                    <p>Tiempo 40.y
                    </p>
                  </div>
                  <div class="col-xs-6">
                    <p class="green-title">5.3S
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle-profile" id="exclusiveMe">
        <h1 class="head-body-bottom border-top-column">
          ¿Por qué quiero ser reclutado?
        </h1>
        <p>{{ user.exclusive.me }}</p>
      </div>
      <div class="profile-photos dissapear">
        <h1 class="head-body border-top-column">
          Fotos
        </h1>
        <div class="row" id="space-for-photos"></div>
      </div>
      <div class="video-profile dissapear">
        <h1 class="head-body border-top-column">
          Vídeo
        </h1>
        <div id="space-for-videos" style="text-align:center;"></div>
      </div>
    </div>
  </div>
  <!-- Photo view -->
  <div class="modalDialog" id="dialogGallery">
    <div class="dialogGallery"></div>
  </div>
</div>
{% endblock content %}

{% block custom-scripts %}
<script>
  $("body").css({"background-color": "white"});
</script>
{% endblock custom-scripts %}
