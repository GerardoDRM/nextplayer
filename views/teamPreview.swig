{% extends 'baseProfile.swig' %}
{% block content %}
<div ng-app="UsersModule" ng-controller="OrgPreviewController" ng-cloak>
  <div id="carousel" class="carousel slide dissapear" style="height:500px;" data-ride="carousel" id="carousel-example-generic">
    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox" id="space-for-photos">
    </div>
  </div>
  <div class="container container-team">
    <div class="row">
      <div class="col-sm-5 no-padding">
        <div class="photo-team-preview" id="profilePhoto"></div>
      </div>
      <div class="col-sm-7 head-preview" style="padding-right: 0px;">
        <h2>
          {{ org.details.organization_name }}
        </h2>
        <p>{{ org.details.city }},
          {{ org.state }}
        </p>
        <h1 class="head-body-bottom border-top-column">
          Acerca de
        </h1>
        <p class="body-paragraph-bottom">{{ org.details.about }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-5 border-right-column">
        <div class="left-profile">

          <div class="save-button" style="text-align:left">
            <button class="input-signup" ng-click="viewDashboard()" style=" margin:10px 0;" id="editProfile1">Editar perfil</button>
            <button class="input-signup" style=" margin:10px 0;" ng-click="follow()" id="follow1">Seguir</button>
          </div>
          <div class="special-two-col">
            <p class="head-paragraph">
              Dirección
            </p>
            <p class="body-paragraph-left">{{ org.details.address }}
            </p>
          </div>
          <div class="special-two-col">
            <p class="head-paragraph">
              Información
            </p>
            <p class="body-paragraph-left">{{ org.details.email }}
            </p>
            <a href="http://{{ org.details.website }}" target="_blank" style="color:blue;"><p class="body-paragraph-left">{{ org.details.website }}</p></a>
          </div>
          <div class="exclusive-club">

            <p class="head-paragraph border-top-column ">Staff
            </p>
            <div id="space-for-staff"></div>
          </div>
        </div>
      </div>
      <div class="col-sm-7">
        <h2>
          Logros
        </h2>
        <div id="space-for-achivements"></div>

        <div class="video-profile dissapear">
          <h1 class="head-body border-top-column">
            Vídeo
          </h1>
          <div id="space-for-videos" style="text-align:center;"></div>
        </div>
      </div>
    </div>

  </div>
</div>

{% endblock content %}

{% block custom-scripts %}
<script>
  $("body").css({"background-color": "white"});
</script>
{% endblock custom-scripts %}
