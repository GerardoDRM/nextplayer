{% extends 'base.swig' %} {% block content %}
<div class="container">
  <div class="top-sign-login">
    <img src="../images/jugador_escudo.png" alt="...">

    <h1> Selecciona tipo de usuario </h1>

  </div>


  <div class="input-sign-login" ng-app="LoginModule" ng-controller="LoginController" ng-cloak>
    <form ng-submit="submitLoginForm()" name="login">
      <select id="select-sport" class="select-hidden">
        <option value="Player">Jugador</option>
        <option value="Coach">Coach</option>
        <option value="Organization">Organización</option>
      </select>
      <div class="form-group-login">
        <input type="email" class="input-signup-login "  placeholder="E-mail" style="color:black;" name="email" ng-model="loginForm.email">
      </div>
      <div class="form-group-login">
        <input type="password" class="input-signup-login"  placeholder="Contraseña" name="password" ng-model="loginForm.password">
        <input type="submit" value="Iniciar sesión" class="input-signup-login">
      </div>
  </div>
  </form>
</div>
{% endblock content %}
