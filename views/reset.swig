{% extends 'base.swig' %} {% block content %}
<div class="container">
<div class="form-login" style="height: 600px;"  ng-app="UsersModule" ng-controller="ForgotPasswordController" ng-cloak>
<div class="top-login">
  <img style="width:39%;" id="img-login" src="../images/equipo_escudo.png" alt="nextplayer escudo">
</div>
<h1 style="text-align:center;">Escriba su nueva contraseña:</h1>
  <form ng-submit="submitResetForm()" name="reset" id="form-reset">
    <input type="hidden" id="token" value="<%= message.token %>"/>
    <input type="password" class="input-login" required placeholder="Contraseña" id="password" name="password" ng-model="password" required>
    <input type="password" class="input-login" required placeholder="Confirmar Contraseña" name="password2" required>
    <input type="submit" value="Cambiar" class="input-login">
  </form>
</div>
</div>

{% endblock content %}
