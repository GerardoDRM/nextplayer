{% extends 'base.swig' %} {% block content %}
<div class="container">
<div class="form-login" style="height: 600px;"  ng-app="UsersModule" ng-controller="ForgotPasswordController" ng-cloak>
<div class="top-login">
  <img style="width:39%;" id="img-login" src="../images/equipo_escudo.png" alt="nextplayer escudo">
</div>
<h1 style="text-align:center;">Tú usuario ha sido creado, por favor revisa tu email, para verificar tu cuenta en NextPlayers y poder hacer login</h1>
</div>
</div>

{% endblock content %}
