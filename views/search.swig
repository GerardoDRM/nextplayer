{% extends 'baseProfile.swig' %} {% block content %}
<div class="container">
  <div class="interest">
    <h2> Búsqueda </h2>
  </div>
  <div class="row" style="margin-left:0px;">
    <div class="col-sm-3" style="height:650px; background-color:white;">
      <div class="filter">
        <h2> Filtros </h2>
        <p> Estado </p>
        <input class="form-group-modified-input" type="text" name="lastname" ng-model="membership.lastname">
        <p> Deporte</p>
        <input class="form-group-modified-input" type="text" name="lastname" ng-model="membership.lastname">
        <p> Peso </p>
        <div class="checkbox">
          <label>
            <input type="checkbox" value=""> 65-75 kg
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" value=""> 75-85 kg
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" value=""> 85-95 kg
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" value=""> 95+ kg
          </label>
        </div>

        <p> Altura </p>
        <div class="checkbox">
          <label>
            <input type="checkbox" value=""> 1.65-1.75 m
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" value=""> 1.75-1.85 m
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" value=""> 1.85-1.95 m
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" value=""> 1.95+ m
          </label>
        </div>
      </div>

    </div>

    <div class="col-sm-8" style="background-color:white; height:650px;">
      <h2> Resultados </h2>
      <div class="row">
        <div class="col-sm-4">

          <div class="prospects-image-search">

          </div>
          <p>Edad: 19 </p>
          <p>Altura: 1.80 m </p>
          <p>Peso: 73 kg </p>
          <p>Estado: Quintana Roo </p>

      </div>
      <div class="col-sm-4">
        <div class="prospects-image-search">

        </div>
        <p>Edad: 19 </p>
        <p>Altura: 1.80 m </p>
        <p>Peso: 73 kg </p>
        <p>Estado: Quintana Roo </p>
    </div>
    <div class="col-sm-4">
      <div class="prospects-image-search">

      </div>
      <p>Edad: 19 </p>
      <p>Altura: 1.80 m </p>
      <p>Peso: 73 kg </p>
      <p>Estado: Quintana Roo </p>
  </div>
    </div>
    <div class="row" style="    margin-top: 15px">
      <div class="col-sm-4">
        <div class="prospects-image-search">

        </div>
        <p>Edad: 19 </p>
        <p>Altura: 1.80 m </p>
        <p>Peso: 73 kg </p>
        <p>Estado: Quintana Roo </p>
    </div>
    <div class="col-sm-4">
      <div class="prospects-image-search">

      </div>
      <p>Edad: 19 </p>
      <p>Altura: 1.80 m </p>
      <p>Peso: 73 kg </p>
      <p>Estado: Quintana Roo </p>
  </div>
  <div class="col-sm-4">
    <div class="prospects-image-search">

    </div>
    <p>Edad: 19 </p>
    <p>Altura: 1.80 m </p>
    <p>Peso: 73 kg </p>
    <p>Estado: Quintana Roo </p>
</div>
  </div>


  </div>
</div>



{% endblock content %}
