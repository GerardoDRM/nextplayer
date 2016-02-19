{% extends 'base.swig' %} {% block content %}
<!--<div class="advisement">

</div> -->
<div class="form-sign" ng-app="SignupModule" ng-controller="SignupController" ng-cloak>
  <form ng-submit="submitSignupForm()" name="signup" id="form-signup">
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
          <input type="hidden" id="user-type" value="coach">
        </div>
        <div class="col-sm-6 text-center ">
          <input type="text" class="input-signup" placeholder="Nombre" style="margin-top:30px" name="name" ng-model="signupForm.name" required>

          <input type="text" class="input-signup" placeholder="Apellidos" name="lastname" ng-model="signupForm.lastname" required>

          <input type="email" class="input-signup" placeholder="Correo" name="email" ng-model="signupForm.email" required>

          <select class="input-signup" name="model" id="modelCoach">
            <option value="" selected="selected">Tipo de Coach</option>
            <option value="Secundaria">Secundaria</option>
            <option value="Preparatoria">Preparatoria</option>
            <option value="Universidad">Universidad</option>
            <option value="Profesional">Profesional</option>
          </select>

          <input type="password" class="input-signup" placeholder="Contraseña" name="password" ng-model="signupForm.password" required>

          <input type="submit" value="Registrarse" class="input-signup">
          <input type="hidden" name="_csrf" value="<%= _csrf %>" />
          <p class="note-terms"><input type="checkbox" name="agree"/> *Nota: Acepto los <a href="/terms" style="color:white">términos y condiciones</a> </p>
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
        <p> Crea tu perfil gratuito con tus datos, incluyendo tu CV de coach. </p>
      </div>
      <div class="col-sm-4">
        <h2> 2 </h2>
        <p> Conectate - Equipos y universidades registrados tendrán acceso a toda tu información y se pondrán en contacto contigo si les llamas la atención.</p>
      </div>
      <div class="col-sm-4">
        <h2> 3 </h2>
        <p> Firma con un equipo o universidad - Continúa tu pasión por el deporte. </p>
      </div>

    </div>
  </div>
</div>


<div class="more-info">
  <p>
    !Despega Tu Carrera Profesional! Nextplayers es una plataforma donde podrás registrar y dar de alta tu CV deportivo. Darás a conocer tu experiencia laboral y logros profesionales. Nextplayers te pondrá al alcance de diferentes universidades o clubes profesionales
    que buscan talento de coaches para su programa.
  </p>
</div>


{% endblock content %}
