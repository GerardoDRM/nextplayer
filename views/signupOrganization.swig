{% extends 'base.swig' %} {% block content %}
<div class="advisement">

</div>
<div class="input-sign"  ng-app="SignupModule" ng-controller="SignupController" ng-cloak>
  <form  ng-submit="submitSignupForm()" name="signup" id="form-signup">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="top-sign">
            <img src="../images/coach_escudo.png" alt="...">
            <h1> Organización </h1>

          </div>
          <input type="text" class="input-signup" placeholder="Escuela" style="margin-top:30px" name="school" ng-model="signupForm.school" required>
          <input type="text" class="input-signup" placeholder="Puesto" style="margin-top:30px" name="post" ng-model="signupForm.post" required>

          <input type="hidden" id="user-type" value="coach">
        </div>
        <div class="col-sm-6 text-center ">
          <input type="text" class="input-signup" placeholder="Nombre" style="margin-top:30px" name="name" ng-model="signupForm.name" required>

          <input type="text" class="input-signup" placeholder="Apellidos" name="lastname" ng-model="signupForm.lastname" required>

          <input type="email" class="input-signup" placeholder="Correo"  name="email" ng-model="signupForm.email" required>

          <input type="password" class="input-signup" placeholder="Contraseña" name="password" ng-model="signupForm.password" required>

            <input type="submit" value="Registrarse" class="input-signup">


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
        <p> Registrate - Solo equipos/universidades con Membresía tendrán acceso a nuestra base de datos. </p>
      </div>
      <div class="col-sm-4">
        <h2> 2 </h2>
        <p>Encuentra talento - Nuestra base de datos incluye perfiles de jugadores de toda la República.</p>
      </div>
      <div class="col-sm-4">
        <h2> 3 </h2>
        <p> Conéctate con jugadores y/o coaches que te ayudarán a elevar tu programa al próximo nivel. </p>
      </div>

    </div>
  </div>
</div>


  <div class="more-info">
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.  </p>
  </div>


{% endblock content %}
