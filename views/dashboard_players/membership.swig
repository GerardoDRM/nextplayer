<div class="row" ng-controller="MembershipController">
  <form class="form-inline align-labels">
    <div class="col-sm-12 col-md-6" style="font-weight: bold;
margin-top: 10%;
font-size: 25px;">
      <div class="checkbox align-labels">
        <label>
          <input type="checkbox" value="players club" ng-model="membership.accept.s1"> Membresía Players Club
          <br> $1500.00
          </br>
        </label>
      </div>
    </div>
    <div class="col-sm-12 col-md-6">
      <h2 class="align-labels" style="margin-bottom:10%;">
        Datos de pago
      </h2>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label for="exampleInputName2">Nombre del Propietario</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="text" name="name" ng-model="membership.name" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label for="exampleInputName2">Número de tarjeta</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="text" minlenght="16" maxlength="16" name="card" ng-model="membership.card" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label for="exampleInputName2">CV</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="number" maxlength="4" name="cv" ng-model="membership.cv" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label for="exampleInputName2">Fecha de vencimiento</label>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="row">
            <div class="col-sm-6">
              <input class="form-group-modified-input" placeholder="mm" type="number" name="month" ng-model="membership.month" required>
            </div>
            <div class="col-sm-6">
              <input class="form-group-modified-input" placeholder="yyyy" type="number" min="2016" max="2050"  name="year" ng-model="membership.year" required>
            </div>

          </div>
        </div>
      </div>
      <div class="row margin-gallery">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <input class="form-buttom button-member--cancel" type="submit" value="Borrar tarjeta" name="delete">
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <button class="form-buttom button-member--confirm" ng-click="buy()">Comprar</button>
          </div>
        </div>
      </div>
    </div>

  </form>
</div>
