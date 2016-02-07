<div ng-controller="BasicInfoOrganization">
  <form class="form-inline align-labels">
    <div class="col-sm-12 col-md-6">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Nombre del Responsable</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="name" ng-model="user.name" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Apellido del Responsable</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="lastname" ng-model="user.lastname" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Puesto del Responsable</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="job" ng-model="user.job" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Ciudad</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="city" ng-model="organization.city" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Estado</label>
          </div>
        </div>
        <div class="col-sm-6 countries-eff">
          <select id="states-list" name="states"></select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Dirección</label>
          </div>
        </div>
        <div class="col-sm-6 countries-eff">
          <input class="form-group-modified-input" name="address" ng-model="organization.address" type="text">
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
        <input class="form-group-modified-input" name="org" ng-model="organization.organization_name" type="text">
      </div>
    </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Sitio Web</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="website" ng-model="organization.website" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Correo de reclutamiento</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="email" ng-model="organization.email" type="email">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="exampleInputEmail2">Descripción

            </label>
          </div>
        </div>
        <div class="col-sm-6 countries-eff">
          <textarea class="form-control" rows="8" style="background-color:#e9eaed; width:100%;" ng-model="organization.about"></textarea>
        </div>
      </div>
    </div>

  </form>
  <div class="save-button">
    <button class="input-signup" ng-click="update()">Guardar</button>
  </div>
</div>
