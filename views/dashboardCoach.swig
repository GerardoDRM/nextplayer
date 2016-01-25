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
          <div class="col-sm-4">
            <input class="form-buttom  " type="submit" value="Publicar"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row border-coach-one no-margin--sides">
      <div class="col-sm-12  font-basic">
          <p>
            Información básica
          </p>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label for="exampleInputName2">Nombre</label>
                </div>
              </div>
              <div class="col-sm-6">
                <input class="form-group-modified-input" name="name" ng-model="user.name" type="text">
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label for="exampleInputEmail2">Apellido</label>
                </div>
              </div>
              <div class="col-sm-6">
                <input class="form-group-modified-input" name="lastname" ng-model="user.lastname" type="text">
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label for="exampleInputEmail2">Estado</label>
                </div>
              </div>
              <div class="col-sm-6 countries-eff">
                <select id="states-list" name="states" ng-model="user.state"></select>
              </div>
            </div>

            <!-- End Firts Col-->
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label for="exampleInputEmail2">País</label>
                </div>
              </div>
              <div class="col-sm-6 countries-eff">
                <select id="countries-list" name="country" ng-model="user.country"></select>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label for="exampleInputEmail2">Fecha de nacimiento</label>
                </div>
              </div>
              <div class="col-sm-6">
                <input class="form-group-modified-input" name="born" ng-model="player.born" type="text">
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group-modified">
                  <label for="exampleInputEmail2">Teléfono</label>
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

      <div class="row border-coach-two no-margin--sides">
        <div class="col-sm-12  font-basic">
          <form class="form-inline align-labels">
            <p class="experience">
              Experiencia
            </p>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputName2">Equipo</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input class="form-group-modified-input" name="team" ng-model="coach.team" type="text">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Posición</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input class="form-group-modified-input" name="position" ng-model="coach.position" type="text">
                </div>
              </div>

              <!-- End Firts Col-->
            </div>
            <div class="col-sm-6">

              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Fechas</label>
                  </div>
                </div>
                <div class="col-sm-6 margin-years">
                  <div class="years">
                    <select id="years-list" name="years" ng-model="coach.year"></select>
                    <select id="twenties-list" name="twenties" ng-model="coach.twentie"></select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Descripción/Logros</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <textarea class="form-control color-textarea text-height-two" name="awards" ng-model="coach.award" rows="3" type="text"></textarea>

                </div>
              </div>
            </div>
            <!-- cd-tabs-content -->

          </div>
        </div>
        <a class="anchor-coach" href="http://www.w3schools.com">+ Agregar nueva experiencia</a>

        <input class="input-signup" type="submit" value="Guardar">
      </form>
    </div>
    {% endblock content %}
