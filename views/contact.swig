{% extends 'baseProfile.swig' %} {% block content %}

<div class="middle-organization">
<div style="height:370px">
</div>

<h1 class="contact-header"> Contacto </h1>

</div>

<div class="container" style="background-color:white;">

<div class="row">
  <div class="col-sm-4">
  <input class="form-group-modified-input" style="margin-top:5%;" name="lastname" ng-model="user.lastname" type="text" placeholder="Nombre">
</div>
</div>
<div class="row">
  <div class="col-sm-4">
  <input class="form-group-modified-input" name="lastname" ng-model="user.lastname" type="text" placeholder="Apellido">
</div>
</div>
<div class="row">
  <div class="col-sm-4">
  <input class="form-group-modified-input" name="lastname" ng-model="user.lastname" type="text" placeholder="Correo">
</div>
</div>

<div class="row">
  <div class="col-sm-6">
  <textarea class="form-control text-height-one" style="margin: 0px; width: 100%;  height: 250px; background-color:#e9eaed;" rows="3" name="me" ng-model="exclusive.me"></textarea>
</div>
</div>
<div class="save-button" style="text-align:center;">
<button class="input-signup" style="margin-top:20px; margin-bottom:10px;" ng-click="update()">Enviar</button>
</div>

</div>

{% endblock content %}
