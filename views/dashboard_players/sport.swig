<div ng-controller="SportController">
  <form class="form-inline" ng-submit="submitSportForm()">
    <div class="col-md-6">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Altura</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" style="width:80%;" type="number" name="height"  ng-model="sport.height" step="0.01">
          <span>m.</span>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Equipo</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input"  type="text" name="team" ng-model="sport.team">
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Peso</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" style="width:80%;" type="number" name="weight" ng-model="sport.weight" step="0.01">
          <span>kg.</span>
        </div>
      </div>
      {# <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Medidas
              <br>
              <p>(Solo si participa en combine)</p>
            </br>
          </label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" type="email" name="measure" ng-model="sport.measure">
      </div>
    </div> #}
  </div>
  <div class="col-sm-6">
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label for="exampleInputName2">Posición</label>
        </div>
      </div>
      <div class="col-sm-6">
        <p>
          Elige 3 (máximo)
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6"  id="firstPositions">

      </div>
      <div class="col-sm-6" id="secondPositions">

      </div>
    </div>
  </div>


</form>
<div class="save-button">
<button class="input-signup" ng-click="update()">Guardar</button>
</div>
</div>
