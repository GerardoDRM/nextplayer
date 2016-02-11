{% extends 'baseProfile.swig' %}
{% block content %}
<div class="container" ng-controller="SearchController">
  <div class="green-header-title">
    <h2>Búsqueda</h2>
  </div>
  <div class="row container-inner-main">
    <div class="col-sm-3 no-padding">
      <div class="inner-block" style="height:650px">
        <div class="filter">
          <h2 style="text-align:center">Filtros</h2>
          <p>Deporte</p>
          <select ng-model="search.sport" searchreader>
            <option value="">n/a</option>
            <option ng-repeat="sport in sports track by $index" value="{{sport}}">
              {{sport}}
            </option>
          </select>
          <p>Edad</p>
          <select ng-model="search.age" ng-options="n for n in [] | range:8:70" searchreader>
            <option value="">n/a</option>
          </select>
          <p>Peso</p>
          <div class="checkbox">
            <label>
              <input ng-model="search.weight.w0" searchreader type="checkbox">
              65-75 kg
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input ng-model="search.weight.w1" searchreader type="checkbox">
              75-85 kg
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input ng-model="search.weight.w2" searchreader type="checkbox">
              85-95 kg
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input ng-model="search.weight.w3" searchreader type="checkbox">
              95+ kg
            </label>
          </div>
          <!-- Height Section -->
          <p>Altura</p>
          <div class="checkbox">
            <label>
              <input ng-model="search.height.h0" searchreader type="checkbox">
              1.65-1.75 m
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input ng-model="search.height.h1" searchreader type="checkbox">
              1.75-1.85 m
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input ng-model="search.height.h2" searchreader type="checkbox">
              1.85-1.95 m
            </label>
          </div>
          <div class="checkbox">
            <label>
              <input ng-model="search.height.h3" searchreader type="checkbox">
              1.95+ m
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-9 no-padding">
      <div class="inner-block" style="height:650px">
        <h2>Resultados</h2>
        <div class="row profile-card no-margin" id="space-for-profiles"></div>
        <button ng-click="showMore()">Ver mas</button>
      </div>
    </div>
  </div>
</div>

{% endblock content %}
