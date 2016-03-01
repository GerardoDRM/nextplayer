<div ng-controller="BasicInfoController">
  <form class="form-inline align-labels" id="basic-player-form">
    <div class="col-sm-12 col-md-6">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Nombre</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="name" ng-model="user.name" required type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Apellido</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="lastname" ng-model="user.lastname" required type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Estado</label>
          </div>
        </div>
        <div class="col-sm-6 countries-eff">
          <select id="states-list" name="states" required></select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>País</label>
          </div>
        </div>
        <div class="col-sm-6 countries-eff">
          <select id="countries-list" name="country" required></select>
        </div>
      </div>
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
          <select class="form-group-modified-input form-date" name="born-year" ng-model="born.year" required ng-options="n for n in [] | range:1980:2009" id="born">
            <option value="">yyyy</option>
          </select>
        </div>
      </div>
      <div id="tutor"></div>
      <!-- End Firts Col-->
    </div>
    <div class="col-sm-12 col-md-6">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Escuela</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="school" ng-model="player.school" required type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Promedio</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="grade" ng-model="player.schoolGrade" required step="0.01" type="number">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="exampleInputEmail2">Año de Graduación
              <br>
              de la Secundaria
            </br>
          </label>
        </div>
      </div>
      <div class="col-sm-6 countries-eff">
        <select name="year" ng-model="player.schoolYear" ng-options="n for n in [] | range:2005:2020" required style="margin-bottom:10%;"></select>
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
  <div class="col-sm-12">
    <h3>
      <strong>*NOTA: Tu perfil no será publicado hasta que tus datos básicos estén completos</strong>
    </h3>
  </div>
  <div class="col-sm-12 save-button">
    <button class="input-signup" ng-click="update()">Guardar</button>
  </div>
</form>

<div class="modalDialogBasic" id="responsive-basic">
  <div class="dialogSampleBasic">
    <img alt="..." src="../images/equipo_escudo.png">
    <h2>Para subir tu Foto de perfil, imágenes o Vídeos por favor inicia sesión en una computadora.</h2>
  </div>
</div>

</div>
