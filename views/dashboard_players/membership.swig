<div class="row" ng-controller="MembershipController">
  <form ng-submit="submitMembershipForm()" class="form-inline align-labels">
    <div class="col-sm-12 col-md-6" style="font-weight: bold;
margin-top: 10%;
font-size: 25px;">
      <div class="checkbox align-labels">
        <label>
          <input type="checkbox" value=""> Membresía Players Club
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
            <label for="exampleInputName2">Nombre</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="text" name="name" ng-model="membership.name">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label for="exampleInputName2">Apellidos</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="text" name="lastname" ng-model="membership.lastname">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label for="exampleInputName2">Número de tarjeta</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="number" name="card" ng-model="membership.card">
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified align-labels">
            <label for="exampleInputName2">CV</label>
          </div>
        </div>
        <div class="col-sm-6">
          <input class="form-group-modified-input" type="text" name="cv" ng-model="membership.cv">
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
              <input class="form-group-modified-input" placeholder="mm" type="number" name="month" ng-model="membership.month">
            </div>
            <div class="col-sm-6">
              <input class="form-group-modified-input" placeholder="yyyy" type="number" name="year" ng-model="membership.year">
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
            <input class="form-buttom button-member--confirm" type="submit" value="Comprar" name="buy">
          </div>
        </div>
      </div>
    </div>

  </form>
</div>
