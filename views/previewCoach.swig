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
        <a class="dissapear" href="javascript:void(0);" ng-click="viewDashboard()">Edita tu perfil</a>
      </div>
    </div>
    <div class="col-sm-4 border-right-column">
      <div class="left-profile">
        <div class="profile-picture" id="profilePhoto"></div>
        <div class="responsive-button">
          <a href="javascript:void(0);" ng-click="viewDashboard()">Edita tu perfil</a>
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
    <div class="col-sm-8" id="profile-experience">


    </div>
  </div>

</div>

{% endblock content %}

{% block custom-scripts %}
  <script>
    $("body").css({"background-color": "white"});
  </script>
{% endblock custom-scripts %}
