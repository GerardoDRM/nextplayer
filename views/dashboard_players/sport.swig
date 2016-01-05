<div ng-app="SportModule" ng-controller="SportController">
  <form class="form-inline" ng-submit="submitPlayersForm()">
    <div class="col-md-6">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Altura</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="number">
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
          <input class="form-group-modified-input" type="text">
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
          <input class="form-group-modified-input" type="text">
          <span>kg.</span>
        </div>
      </div>
      <div class="row">
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
        <input class="form-group-modified-input" type="email">
      </div>
    </div>
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
      <div class="col-sm-6">
        <label>
          <input type="checkbox" value="">
          Quarterback
        </label>
        <label>
          <input type="checkbox" value="">
          Linebacker
        </label>
        <label>
          <input type="checkbox" value="">
          Runningback
        </label>
        <label>
          <input type="checkbox" value="">
          Safety
        </label>
        <label>
          <input type="checkbox" value="">
          Wide receiver
        </label>
        <label>
          <input type="checkbox" value="">
          Cornerback
        </label>
      </div>
      <div class="col-sm-6">
        <label>
          <input type="checkbox" value="">
          Tight Endt
        </label>
        <label>
          <input type="checkbox" value="">
          Línea ofensivo
        </label>
        <label>
          <input type="checkbox" value="">
          Línea defensivo
        </label>
      </div>
    </div>
  </div>
  <input type="submit" value="Guardar" class="input-signup">

</form>
</div>
