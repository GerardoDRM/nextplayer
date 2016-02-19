{% extends 'baseProfile.swig' %}
{% block content %}
<div class="middle-organization" ng-cloak>
  <div class="container">
    <div class="row">
      <div class="col-sm-5 font-organization dissapear">
        <h2>¡Aprovecha el
        </br>descuento por inauguración !</h2>
    </div>
    <div class="col-sm-7">
      <div class="recuitrers">
        <h3>Recuitrers Club</h3>
        <h2 style="text-decoration: line-through;">$50,000</h2>
        <h2>$35,000</h2>
        <h3>Por año</h3>
        <p>10 cuentas individuales a nuestra base de datos de coaches.</p>
        <p>Búsqueda avanzada (altura,peso,estado,año de egreso, etc.)</p>
        <p>Artículo de blog gratis.</p>
      </div>
    </div>

  </div>

</div>
</div>
<div class="container" style="background-color: white;">
<div class="pay-organization" ng-app="UsersModule" ng-controller="MembershipController">

  <h3 class="align-labels" style="margin-bottom:10%;">
    Datos de pago
  </h3>
  <form id="membership-form">
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified align-labels">
          <label >Nombre del Propietario</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" name="name" ng-model="membership.name" required type="text">
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified align-labels">
          <label >Número de tarjeta</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" maxlength="16" minlenght="16" name="card" ng-model="membership.card" required type="text">
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group-modified align-labels">
          <label >CV</label>
        </div>
      </div>
      <div class="col-sm-6">
        <input class="form-group-modified-input" maxlength="4" name="cv" ng-model="membership.cv" required type="number">
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
          <div class="col-xs-6">
            <input class="form-group-modified-input" max="12" min="1" name="month" ng-model="membership.month" placeholder="mm" required type="number">
          </div>
          <div class="col-xs-6">
            <input class="form-group-modified-input" max="2050" min="2016" name="year" ng-model="membership.year" placeholder="yyyy" required type="number">
          </div>
        </div>
      </div>
    </div>
    <div class="row margin-gallery">
      <div class="col-sm-12">
        <div style="margin: 12px auto;">
          <a class="form-buttom button-member--confirm" ng-click="buyClub()" style="padding: 7px 25%;">Comprar</a>
        </div>
      </div>
    </div>
  </form>
</div>
</div>

{% endblock content %}
