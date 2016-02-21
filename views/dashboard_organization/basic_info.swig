<div ng-controller="BasicInfoOrganization">
  <form class="form-inline align-labels" id="basic-org-form">
    <div class="col-sm-12 col-md-6">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Nombre del Responsable</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="name" ng-model="user.name" type="text" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Apellido del Responsable</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="lastname" ng-model="user.lastname" type="text" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Puesto del Responsable</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="job" ng-model="user.job" type="text" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Ciudad</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="city" ng-model="organization.city" type="text" required>
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
            <label>Dirección</label>
          </div>
        </div>
        <div class="col-sm-6 countries-eff">
          <input class="form-group-modified-input" name="address" ng-model="organization.address" type="text" required>
        </div>
      </div>

      <!-- End Firts Col-->
    </div>
    <div class="col-sm-12 col-md-6">
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Nombre de Universidad / Equipo</label>
        </div>
      </div>
      <div class="col-sm-6 countries-eff">
        <input class="form-group-modified-input" name="org" ng-model="organization.organization_name" type="text" required>
      </div>
    </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Sitio Web</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="website" ng-model="organization.website" type="text" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Correo de reclutamiento</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="email" ng-model="organization.email" type="email" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="exampleInputEmail2">Descripción (max. 800 caracteres)

            </label>
          </div>
        </div>
        <div class="col-sm-6 countries-eff">
          <textarea class="form-control" rows="8" maxlength="800" style="background-color:#e9eaed; width:100%;" ng-model="organization.about" required></textarea>
        </div>
      </div>
    </div>
    <p><strong>*NOTA: Tu perfil no será publicado hasta que tus datos básicos estén registrados</strong></p>
  </form>
  <div class="save-button">
    <button class="input-signup" ng-click="update()">Guardar</button>
  </div>

  <div class="modalDialogBasic" id="responsive-basic">
    <div class="dialogSampleBasic">
        <img alt="..." src="../images/equipo_escudo.png">
    </div>
  </div>

</div>
