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
          <label>Apellido</label>
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
        <select id="states-list" name="states" ng-model="user.state" ng-options="s for s in states">
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>País</label>
        </div>
      </div>
      <div class="col-sm-6 countries-eff">
        <select id="countries-list" name="country" ng-model="user.country">
          <option ng-repeat="country in countries" value="{{ country }}">{{ country }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Fecha de nacimiento</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" id="datepicker" type="text" name="born" ng-model="user.born" calendar>
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
        <input class="form-group-modified-input" type="text" name="school" ng-model="player.school">
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified">
          <label>Promedio</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" type="number" name="grade" ng-model="player.schoolGrade">
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
      <select style="margin-bottom:10%;" name="year" ng-model="player.schoolYear">
        <option selected="selected" value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6">
      <div class="form-group-modified">
        <label for="exampleInputEmail2">Teléfono</label>
      </div>
    </div>
    <div class="col-sm-6">
      <input class="form-group-modified-input" type="text" name="phone" ng-model="user.phone">

    </div>
  </div>
</div>

</form>
<div class="save-button">
<button class="input-signup" ng-click="update()">Guardar</button>
</div>
</div>
