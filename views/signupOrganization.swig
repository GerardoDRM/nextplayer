{% extends 'base.swig' %}
{% block content %}
<!--<div class="advisement">

</div> -->
<div class="form-sign" ng-app="SignupModule" ng-cloak ng-controller="SignupController">
  <form id="form-signup" name="signup" ng-submit="submitSignupForm()">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="top-sign">
            <img alt="..." src="../images/equipo_escudo.png">
            <h1>
              Organización
            </h1>

          </div>
        </div>
        <div class="col-sm-6 text-center ">
          <input id="user-type" type="hidden" value="organization">
          <input class="input-signup" name="organization_name" ng-model="signupForm.organization_name" placeholder="Universidad / Equipo" required type="text">

          <input class="input-signup" name="name" ng-model="signupForm.name" placeholder="Nombre" required style="margin-top:30px" type="text">

          <input class="input-signup" name="lastname" ng-model="signupForm.lastname" placeholder="Apellidos" required type="text">

          <input class="input-signup" name="email" ng-model="signupForm.email" placeholder="Correo" required type="email">

          <input class="input-signup" name="password" ng-model="signupForm.password" placeholder="Contraseña" required type="password">

          <input class="input-signup" type="submit" value="Registrarse">

          <input name="_csrf" type="hidden" value="<%= _csrf %>"/>
          <p class="note-terms"><input name="agree" type="checkbox"/>
          <input type="checkbox" name="agree" /> *Nota: Acepto <a href="/terms" style="color:#40E0D0">términos de uso</a> y he leído el <a href="/privacity" style="color:#40E0D0">aviso de privacidad</a> </p>
        </div>
      </div>

    </div>

  </form>
</div>

<div class="container">
  <div class="function">
    <h1>
      ¿Cómo funciona?
    </h1>
    <div class="row">
      <div class="col-sm-4">
        <h2>
          1
        </h2>
        <p>
          Registrate - Solo equipos/universidades con Membresía tendrán acceso a nuestra base de datos.
        </p>
      </div>
      <div class="col-sm-4">
        <h2>
          2
        </h2>
        <p>Encuentra talento - Nuestra base de datos incluye perfiles de jugadores de toda la República.</p>
      </div>
      <div class="col-sm-4">
        <h2>
          3
        </h2>
        <p>
          Conéctate con jugadores y/o coaches que te ayudarán a elevar tu programa al próximo nivel.
        </p>
      </div>

    </div>
  </div>
</div>

<div class="more-info">
  <p>!Reclutamiento Deportivo! Nextplayers es una plataforma donde vas a tener acceso a combines y a noticias de jugadores. Podrás buscar, filtrar y contactar talento deportivo. Se te brindará un acceso personalizado donde vas a estar actualizado del
    talento que hay a nivel nacional e internacional. Lo mejor de todo, recibirás notificaciones en tiempo real de las actualizaciones del jugador que sigues.

  </p>
</div>

{% endblock content %}
