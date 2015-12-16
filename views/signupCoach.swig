{% extends 'base.swig' %} {% block content %}
<div class="advisement">

</div>
<div class="input-sign"  ng-app="SignupModule" ng-controller="SignupController" ng-cloak>
  <form  ng-submit="submitSignupForm()" name="signup">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="top-sign">
            <img src="../images/coach_escudo.png" alt="...">
            <h1> Coach </h1>
            <h1> Selecciona tu deporte </h1>

          </div>
          <select id="select-sport" class="select-hidden">
            <option value="Fútbol americano" selected="selected">Fútbol americano</option>
            <option value="Fútbol soccer">Fútbol soccer</option>
            <option value="Basquetball">Basquetball</option>
            <option value="Tennis">Tennis</option>
            <option value="Atletismo">Atletismo</option>
            <option value="Voleiball">Voleiball</option>
          </select>
          <input type="hidden" id="user-type" value="coach">
        </div>
        <div class="col-sm-6 text-center ">
          <input type="text" class="input-signup" placeholder="Nombre" style="margin-top:30px" name="name" ng-model="signupForm.name">

          <input type="text" class="input-signup" placeholder="Apellidos" name="lastname" ng-model="signupForm.lastname">

          <input type="email" class="input-signup" placeholder="Correo"  name="email" ng-model="signupForm.email">

          <input type="password" class="input-signup" placeholder="Contraseña" name="password" ng-model="signupForm.password">

            <input type="submit" value="Registrarse" class="input-signup" placeholder="Registrarse" name="log in" ng-model="signupForm.password">

          <input class="form-buttom sign-facebook input-space" type="submit" value="Login con facebook" style="color: white; background-color: #3b5999;   font-weight: normal;" />
          <input type="hidden" name="_csrf" value="<%= _csrf %>" />
        </div>
      </div>

    </div>

  </form>
</div>

<div class="container">
  <div class="function">
    <h1> ¿Cómo funciona? </h1>
    <div class="row">
      <div class="col-sm-4">
        <h2> 1 </h2>
        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et </p>
      </div>
      <div class="col-sm-4">
        <h2> 2 </h2>
        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et </p>
      </div>
      <div class="col-sm-4">
        <h2> 3 </h2>
        <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et </p>
      </div>

    </div>
  </div>
</div>


  <div class="more-info">
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.  </p>
  </div>


{% endblock content %}
