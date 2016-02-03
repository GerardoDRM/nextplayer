{% extends 'base.swig' %} {% block content %}
<div class="container">
  <div class="top-login">
    <img id="img-login" src="../images/equipo_escudo.png" alt="nextplayer escudo">
  </div>
  <div class="form-login" ng-app="LoginModule" ng-controller="LoginController" ng-cloak>
    <form ng-submit="submitLoginForm()" name="login" id="form-login">
      <input type="email" class="input-login" required placeholder="E-mail" style="color:black;" name="email" ng-model="loginForm.email" required>
      <input type="password" class="input-login" required placeholder="Contraseña" name="password" ng-model="loginForm.password" required>
      <input type="submit" value="Iniciar sesión" class="input-login">
      <a href="/forgot" style="text-align:center;"><h4>He olvidado mi contraseña</h4></a>
    </form>
  </div>
</div>
{% endblock content %}
