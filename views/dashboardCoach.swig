{% extends 'baseProfile.swig' %}
{% block content %}

<div class="container container-dash no-padding">
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
          <a class="view-green--btn" ng-click="viewProfile()">Ver Perfil</a>
        </div>
      </div>
    </div>
  </div>
  <div ng-cloak ng-controller="CoachInfoController">
    <div class="coach-container no-margin--sides">
      <div class="row coach-row">
        <form id="coach-form">
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
                <input class="form-group-modified-input" name="name" ng-model="user.name" required type="text">
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label >Apellido</label>
                </div>
              </div>
              <div class="col-sm-6">
                <input class="form-group-modified-input" name="lastname" ng-model="user.lastname" required type="text">
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label >País</label>
                </div>
              </div>
              <div class="col-sm-6 countries-eff">
                <select id="country" name="country" required></select>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label >Estado</label>
                </div>
              </div>
              <div class="col-sm-6 countries-eff">
                <select id="states" name="states" required></select>
              </div>
            </div>

            <!-- End Firts Col-->
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label>Fecha de nacimiento</label>
                </div>
              </div>
              <div class="col-sm-6">
                <select class="form-group-modified-input form-date" name="born-day" ng-model="born.day" ng-options="n for n in [] | range:1:32">
                  <option value="">dd</option>
                </select>
                <select class="form-group-modified-input form-date" name="born-month" ng-model="born.month" ng-options="n for n in [] | range:1:13">
                  <option value="">mm</option>
                </select>
                <select class="form-group-modified-input form-date" name="born-year" ng-model="born.year" required ng-options="n for n in [] | range:1940:1995" id="born">
                  <option value="">yyyy</option>
                </select>
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
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label >Video URL</label>
                </div>
              </div>
              <div class="col-sm-6">
                <input class="video" type="hidden" value="1">
                <div class="photo" ng-click="showVideoURL($event)">
                  <img alt="..." src="../images/video.png"/>
                </div>
                <div class="photo-preview">
                  <div class="video-container"></div>
                  <a ng-click="deleteVideo($event)"></a>
                </div>
              </div>
            </div>
          </div>
          <!-- cd-tabs-content -->
          <div class="col-sm-12">
            <h3>
            <strong>*NOTA: Tu perfil no será publicado hasta que tus datos básicos estén completos</strong>
            </h3>
          </div>
        </form>
      </div>
    </div>
    <div id="space-for-experience"></div>
    <div class="coach-container">
      <a class="anchor-coach" experience href="javascript:void(0);">+ Agregar nueva experiencia</a>
      <div class="save-button" style="margin-top:0; margin-right:44px;">
        <button class="input-signup" ng-click="update()">Guardar</button>
      </div>
    </div>
    <div class="modalDialog" id="dialogVideo">
      <div class="dialogVideo">
        <h1>URL:</h1>
        <form id="video-form">
          <input ng-model="video" required style="width:100%;" type="text"/>
          <div>
            <h3>
              Youtube
            </h3>
            <img src="../images/youtube3.png" style="width: 100%;">
            <h3>
              Hudl
            </h3>
            <img src="../images/holds.png" style="width: 100%;">
          </div>
          <div class="save-button">
            <button class="input-signup" ng-click="storeVideo()">Guardar</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</div>

{% endblock content %}
