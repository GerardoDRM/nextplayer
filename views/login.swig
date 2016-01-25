{% extends 'base.swig' %} {% block content %}
<div class="container">
  <div class="top-login">
    <img id="img-login" src="../images/jugador_escudo.png" alt="...">

    <h1> Selecciona tipo de usuario </h1>

  </div>


  <div class="form-login" ng-app="LoginModule" ng-controller="LoginController" ng-cloak>
    <form ng-submit="submitLoginForm()" name="login" id="form-login">
      <select id="select-sport" class="select-hidden">
        <option value="Jugador">Jugador</option>
        <option value="Coach">Coach</option>
        <option value="Organización">Organización</option>
      </select>
        <input type="email" class="input-login"  required placeholder="E-mail" style="color:black;" name="email" ng-model="loginForm.email" required>
        <input type="password" class="input-login"  required placeholder="Contraseña" name="password" ng-model="loginForm.password" required>
        <input type="submit" value="Iniciar sesión" class="input-login">
        <a class="input-login facebook" href="/user/facebook">Login con Facebook</a>
  </div>
  </form>
</div>
{% endblock content %}
