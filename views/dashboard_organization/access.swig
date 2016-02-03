<div ng-controller="AccessController">
  <form class="form-inline" ng-submit="submitSportForm()">
    <div class="col-md-6">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group-modified" style="margin-bottom:25px;">
          <a class="anchor-coach" style="margin-left:0px;" experience href="javascript:void(0);">+ Añadir reclutador</a>
          </div>
        </div>

      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Nombre</label>
          </div>
        </div>
        <div class="col-sm-6">
            <input class="form-group-modified-input"  type="text" name="team" ng-model="sport.team">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Puesto</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input"  type="text" name="team" ng-model="sport.team">
        </div>
      </div>
    </div>




</form>
<div class="save-button">
<button class="input-signup" ng-click="update()">Guardar</button>
</div>
</div>
