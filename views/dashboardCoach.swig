{% extends 'baseProfile.swig' %}
{% block content %}

<div class="container container-dash no-padding" ng-app="CoachInfoModule" ng-cloak ng-controller="CoachInfoController">
  <form class="form-inline align-labels">
    <div class="images-profile background-img-profile">
      <div class="row no-margin--sides">
        <div class="col-sm-3 no-padding dissapear">
          <div class="middle-image profile-photo">
            <div class="default-photo full-wrapper">
              <img alt="..." class="photo-icon" src="../images/photo.png">
            </div>
          </div>
        </div>
        <div class="col-sm-9 no-padding image-picture-two">
          <div class="col-sm-4 dissapear">
            <img alt="..." class="icons-sport" src="../images/contador_temporal.png">
          </div>
          <div class="col-sm-4">
            <div class="title">
              <h2>
                Edita tu perfil
              </h2>
            </div>
          </div>
          <div class="col-sm-4" style="margin-top:80px;">
            <a ng-click="viewProfile()">Ver Perfil</a>
          </div>
        </div>
      </div>
    </div>
    <div class="coach-container no-margin--sides">
      <div class="row coach-row">
        <h3>
          Información básica
        </h3>
        <div class="col-sm-6">
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group-modified">
                <label >Nombre</label>
              </div>
            </div>
            <div class="col-sm-6">
              <input class="form-group-modified-input" name="name" ng-model="user.name" type="text">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group-modified">
                <label >Apellido</label>
              </div>
            </div>
            <div class="col-sm-6">
              <input class="form-group-modified-input" name="lastname" ng-model="user.lastname" type="text">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group-modified">
                <label >Estado</label>
              </div>
            </div>
            <div class="col-sm-6">
              <input class="form-group-modified-input" name="states" ng-model="user.state"/>
            </div>
          </div>

          <!-- End Firts Col-->
        </div>
        <div class="col-sm-6">
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group-modified">
                <label >País</label>
              </div>
            </div>
            <div class="col-sm-6 countries-eff">
              <select id="countries-list" name="country" ng-model="user.country">
                <option ng-repeat="country in countries" value="{{ country }}">{{ country }}</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group-modified">
                <label >Fecha de nacimiento</label>
              </div>
            </div>
            <div class="col-sm-6">
              <input calendar class="form-group-modified-input" id="datepicker" name="born" ng-model="user.born" type="text">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group-modified">
                <label >Teléfono</label>
              </div>
            </div>
            <div class="col-sm-6">
              <input class="form-group-modified-input" name="phone" ng-model="user.phone" type="text">

            </div>
          </div>
        </div>
        <!-- cd-tabs-content -->

      </div>
    </div>
    <div id="space-for-experience"></div>
    <div class="coach-container">
      <a class="anchor-coach" experience href="javascript:void(0);">+ Agregar nueva experiencia</a>
      <div class="save-button" style="margin-top:0; margin-right:44px;">
      <button class="input-signup" ng-click="update()">Guardar</button>
      </div>
    </div>

  </form>
</div>
{% endblock content %}
