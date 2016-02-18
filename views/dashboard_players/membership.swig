<div class="row" ng-controller="MembershipController">
  <form class="form-inline align-labels" id="membership-form">
    <div class="col-sm-12 col-md-6" style="font-weight: bold;
margin-top: 10%;
font-size: 25px;">
      <div class="checkbox align-labels">
        <label>
          <input type="checkbox" value="players club" ng-model="membership.group.s1" name="group" required > Membresía Players Club
          <br> $1500.00
          </br>
        </label>
        <div class="days-counter" id="daysCounter"><h4>Restan {{ membership.days_counter }} días de tu suscripción</h4></div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6">
      <h2 class="align-labels" style="margin-bottom:10%;">
        Datos de pago
      </h2>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label >Nombre del Propietario</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="text" name="name" ng-model="membership.name" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label >Número de tarjeta</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="text" minlenght="16" maxlength="16" name="card" ng-model="membership.card" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label >CV</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="number" maxlength="4" name="cv" ng-model="membership.cv" required>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label >Fecha de vencimiento</label>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="row">
            <div class="col-sm-6">
              <input class="form-group-modified-input" placeholder="mm" type="number"  min="1" max="12" name="month" ng-model="membership.month" required>
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
            <a class="form-buttom button-member--cancel" ng-click="delete()" id="cancelBtn">Borrar tarjeta</a>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <a class="form-buttom button-member--confirm" ng-click="buy()" id="buyBtn">Comprar</a>
          </div>
        </div>
      </div>
    </div>

  </form>
</div>
