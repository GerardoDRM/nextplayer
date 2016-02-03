{% extends 'base.swig' %}
{% block content %}

<div class="middle-organization">
  <h1 class="contact-header">
    Contacto
  </h1>
</div>
<div class="container" style="background-color:white;" ng-app="ContactSendModule" ng-controller="ContactSendController">
  <form id="form-contact">
  <div class="row">
    <div class="col-sm-4">
      <input class="form-group-modified-input" name="name" ng-model="mail.name" placeholder="Nombre" style="margin-top:5%;" type="text" required>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-4">
      <input class="form-group-modified-input" name="subject" ng-model="mail.subject" placeholder="Asunto" type="text" required>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-4">
      <input class="form-group-modified-input" name="email" ng-model="mail.email" placeholder="Correo" type="email" required>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-6">
      <textarea class="form-control" name="message" placeholder="Comentarios" ng-model="mail.message" rows="3" style="width: 100%;  height: 250px; background-color: #e9eaed;" required></textarea>
    </div>
  </div>
  <div class="save-button" style="text-align:center;">
    <button class="input-signup" style="margin: 10px 0;" ng-click="sendMessage()">Enviar</button>
  </div>
  </form>
</div>

{% endblock content %}
