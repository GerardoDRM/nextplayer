<div ng-controller="BasicInfoController">
  <form class="form-inline align-labels">
    <div class="col-sm-12 col-md-6">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Nombre</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="name" ng-model="user.name" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Apellido</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="lastname" ng-model="user.lastname" type="text">
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
            <label>País</label>
          </div>
        </div>
        <div class="col-sm-6 countries-eff">
          <select id="countries-list" name="country"></select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Fecha de nacimiento</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input calendar class="form-group-modified-input" id="datepicker" name="born" ng-model="user.born" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>E-mail del titular</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input calendar class="form-group-modified-input" id="datepicker" name="born" ng-model="user.born" type="text">
        </div>
      </div>
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
          <input class="form-group-modified-input" name="school" ng-model="player.school" type="text">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Promedio</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" name="grade" ng-model="player.schoolGrade" step="0.01" type="number">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="exampleInputEmail2">Año de ingreso
              <br>
              de secundaria
            </br>
          </label>
        </div>
      </div>
      <div class="col-sm-6 countries-eff">
        <select name="year" ng-model="player.schoolYear" ng-options="n for n in [] | range:2005:2020" style="margin-bottom:10%;"></select>
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
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Parentesco del titular</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input calendar class="form-group-modified-input" id="datepicker" name="born" ng-model="user.born" type="text">
      </div>
    </div>
  </div>
</form>
<div class="save-button">
  <button class="input-signup" ng-click="update()">Guardar</button>
</div>
<!-- Modal dialog for Sport -->
<div class="modalDialog" id="dialogSport">
  <div class="dialogSport">
    <h2>Por favor, elige tu deporte de interes:
    </h2>
    <form id="sport-form">
      <select ng-model="sport.title">
        <option selected="selected" value="Fútbol americano">Fútbol americano</option>
        <option value="Fútbol soccer">Fútbol soccer</option>
        <option value="Basquetball">Basquetball</option>
        <option value="Tennis">Tennis</option>
        <option value="Atletismo">Atletismo</option>
        <option value="Voleiball">Voleiball</option>
      </select>
      <div class="save-button">
        <button class="input-signup" ng-click="storeSport()">Guardar</button>
      </div>
    </form>
  </div>
</div>
</div>
