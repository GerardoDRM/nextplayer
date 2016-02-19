{% extends 'baseProfile.swig' %}
{% block content %}
<div class="container profile-view-container" ng-app="UsersModule" ng-controller="ProfileViewController" ng-cloak>
  <div class="row">
    <div class="col-sm-12">
      <h1>{{ user.name }}
        {{ user.lastname }}
      </h1>
      <p class="sub-title">{{ user.state }},
        {{ user.country }}
      </p>
      <div class="input-profile">
        <a class="dissapear" href="javascript:void(0);" id="editProfile1" ng-click="viewDashboard()" style=" margin:10px 0;">Edita tu perfil</a>
        <a class="dissapear" href="javascript:void(0);" id="follow1" ng-click="follow()" style=" margin:10px 0;">Seguir</a>
      </div>
    </div>
    <div class="col-sm-4 border-right-column">
      <div class="left-profile">
        <div class="profile-picture" id="profilePhoto">
          <img alt="..." id="change-sport">
        </div>
        <div class="responsive-button">
          <a href="javascript:void(0);" id="editProfile2" ng-click="viewDashboard()" style=" margin:10px 0;">Edita tu perfil</a>
          <a class="dissapear" href="javascript:void(0);" id="follow2" ng-click="follow()" style=" margin:10px 0;">Seguir</a>
        </div>
        <div class="special-two-col" style="width:100%;">
          <p>Fecha de nacimiento
            {{ user.born }}
          </p>
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
      </div>
    </div>
    <div class="col-sm-8" id="profile-experience"></div>
    <div class="col-sm-8">
      <div class="video-profile">
        <h1 class="head-body border-top-column">
          Vídeo
        </h1>
        <div id="space-for-videos" style="text-align:center;"></div>
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
