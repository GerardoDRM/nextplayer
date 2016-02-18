{% extends 'base.swig' %} {% block content %}
<!--<div class="advisement">

</div> -->
<div class="form-sign" ng-app="SignupModule" ng-controller="SignupController" ng-cloak>
  <form ng-submit="submitSignupForm()" name="signup" id="form-signup">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="top-sign">
            <img src="../images/jugador_escudo.png" alt="...">
            <h1> Jugador </h1>
            <h1> Selecciona tu deporte </h1>

          </div>
          <select id="select-sport" class="select-hidden">
            <option value="Fútbol americano" selected="selected">Fútbol americano</option>
            <option value="Fútbol soccer">Fútbol soccer</option>
            <option value="Tenis">Tenis</option>
            <option value="Tenis Mesa">Tenis Mesa</option>
            <option value="Atletismo">Atletismo</option>
            <option value="Voleibol Playa">Voleibol Playa</option>
            <option value="Fútbol rápido">Fútbol rápido</option>
            <option value="Beisbol">Beisbol</option>
            <option value="Golf">Golf</option>
            <option value="Rugby">Rugby</option>
            <option value="Taekwondo">Taekwondo</option>
            <option value="Baloncesto">Baloncesto</option>
            <option value="Voleibol Sala">Voleibol Sala</option>

          </select>
          <input type="hidden" id="user-type" value="player">
        </div>
        <div class="col-sm-6 text-center ">
          <input type="text" class="input-signup" placeholder="Nombre" style="margin-top:30px" name="name" ng-model="signupForm.name" required>

          <input type="text" class="input-signup" placeholder="Apellidos" name="lastname" ng-model="signupForm.lastname" required>

          <input type="email" class="input-signup" placeholder="Correo" name="email" ng-model="signupForm.email" required>

          <input type="password" class="input-signup" placeholder="Contraseña" name="password" ng-model="signupForm.password" required>

          <input type="submit" value="Registrarse" class="input-signup" placeholder="Registrarse">
          <input type="hidden" name="_csrf" value="<%= _csrf %>" />
          <p class="note-terms"> *Nota: Al registrarse usted esta aceptando los términos y condiciones </p>
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
        <p> Crea tu perfil gratuito - Ingresa tus datos, sube fotos y videos de tus mejores jugadas.</p>
      </div>
      <div class="col-sm-4">
        <h2> 2 </h2>
        <p> Conéctate con coaches/reclutadores - Equipos registrados tendrán acceso a toda tú información y se pondrán en contacto contigo si les llamas la atención. </p>
      </div>
      <div class="col-sm-4">
        <h2> 3 </h2>
        <p> Firma con un equipo o universidad - Cumple tu sueño de jugar al próximo nivel! </p>
      </div>

    </div>
  </div>
</div>


<div class="more-info">
  <p>
    !Mantente En La Mira! Nextplayers es una plataforma donde podrás crear un perfil con tus datos, fotos y highlights demostrando tu talento a universidades y equipos. Nextplayers pondrá a tu alcance comunicación directa con los reclutadores y te facilitará
    las herramientas necesarias para tu óptima preparación física y mental.
  </p>
</div>


{% endblock content %}
