{% extends 'base.swig' %} {% block content %}
<div class="organization-advisement">

</div>

<div class="middle-organization">
  <div class="container">
  <div class="row">
    <div class="col-sm-5 font-organization dissapear"><h2> ¡Aprovecha el </h2> <h2> descuento </h2> <h2> por inauguración !</h2> </div>
    <div class="col-sm-7"> <div class="recuitrers">
      <h3> Recuitrers Club </h3>
        <h2> $50,000 </h2>
        <h2> $35,000 </h2>
        <h3> Por año </h3>
        <p>10 cuentas individuales a nuestra base de datos de coaches. </p>
        <p> Búsqueda avanzada (altura,peso,estado,año de egreso, etc.) </p>
        <p> Artículo de blog gratis. </p>
    </div>  </div>

  </div>

</div>
</div>
<div class="container">
<div class="pay-organization">

  <h3 class="align-labels" style="margin-bottom:10%;">
    Datos de pago
  </h3>
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
</div>





{% endblock content %}
