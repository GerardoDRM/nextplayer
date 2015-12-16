{% extends 'base.swig' %} {% block content %}
<div class="container">
  <div class="top-sign-login">
    <img src="../images/jugador_escudo.png" alt="...">
    
    <h1> Selecciona tipo de usuario </h1>

  </div>


  <div class="input-sign-login">
    <form>
      <select id="select-sport" class="select-hidden">
        <option value="0">Jugador</option>
        <option value="1">Coach</option>
        <option value="2">Organización</option>

      </select>
      <div class="form-group-login">

        <input type="email" class="input-signup-login "  placeholder="E-mail" style="color:black;">
      </div>
      <div class="form-group-login">

        <input type="password" class="input-signup-login"  placeholder="Contraseña">
        <input type="submit" value="Iniciar sesión" class="input-signup-login" placeholder="Iniciar sesión" name="log in" ng-model="signupForm.password">

      </div>

  </div>
  </form>
</div>
{% endblock content %}
