<div  ng-controller="BasicInfoController">
<form class="form-inline align-labels">
  <div class="col-sm-12 col-md-6">
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Nombre</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" type="text" name="name" ng-model="user.name">
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Ciudad</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" type="text" name="lastname" ng-model="user.lastname">
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Estado</label>
        </div>
      </div>
      <div class="col-sm-6 countries-eff">
        <input class="form-group-modified-input" type="text" name="lastname" ng-model="user.lastname">
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Dirección</label>
        </div>
      </div>
      <div class="col-sm-6 countries-eff">
        <input class="form-group-modified-input" type="text" name="lastname" ng-model="user.lastname">
      </div>
    </div>

    <!-- End Firts Col-->
  </div>
  <div class="col-sm-12 col-md-6">
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Sitio Web</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" type="text" name="school" ng-model="player.school">
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Correo</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" type="number" name="grade" ng-model="player.schoolGrade">
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
    <textarea class="form-control" style="background-color:#e9eaed; width:100%;" rows="3"></textarea>
    </div>
  </div>

</div>

</form>
<div class="save-button">
<button class="input-signup" ng-click="update()">Guardar</button>
</div>
</div>
