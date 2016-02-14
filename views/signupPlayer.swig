{% extends 'base.swig' %} {% block content %}
<div class="advisement">

</div>
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
            <option value="Basquetball">Basquetball</option>
            <option value="Tennis">Tennis</option>
            <option value="Atletismo">Atletismo</option>
            <option value="Voleiball">Voleiball-sala</option>
            <option value="Fútbol soccer">Fútbol rápido</option>
            <option value="Basquetball">Baseball</option>
            <option value="Tennis">Golf</option>
            <option value="Atletismo">Rugby</option>
            <option value="Voleiball">Taekwondo</option>
            <option value="Basquetball">Basquetball</option>
            <option value="Tennis">Tennis-mesa</option>
            <option value="Voleiball">Voleiball-playa</option>
          </select>
          <input type="hidden" id="user-type" value="player">
        </div>
        <div class="col-sm-6 text-center ">
          <input type="text" class="input-signup" placeholder="Nombre" style="margin-top:30px" name="name" ng-model="signupForm.name" required>

          <input type="text" class="input-signup" placeholder="Apellidos" name="lastname" ng-model="signupForm.lastname" required>

          <input type="email" class="input-signup" placeholder="Correo" name="email" ng-model="signupForm.email" required>

          <input type="password" class="input-signup" placeholder="Contraseña" name="password" ng-model="signupForm.password" required>

          <input type="submit" value="Registrarse" class="input-signup" placeholder="Registrarse">

          <a class="input-signup facebook" href="/user/facebook">Login con Facebook</a>
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
  <p>!Reclutamiento Deportivo! Nextplayers es una plataforma donde vas a tener acceso a combines y a noticias de jugadores. Podrás buscar, filtrar y contactar talento deportivo. Se te brindará un acceso personalizado donde vas a estar actualizado del talento
    que hay a nivel nacional e internacional. Lo mejor de todo, recibirás notificaciones en tiempo real de las actualizaciones del jugador que sigues.
  </p>
</div>


{% endblock content %}
