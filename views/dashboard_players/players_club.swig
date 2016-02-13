<div ng-controller="ExclusiveController">

  <form class="form-inline align-labels" id="exclusive-form">
    <h2>¿Por qué quiero ser reclutado?</h2>
    <textarea class="form-control text-height-one" style="width: 386px;  height: 123px;     margin-bottom: 30px;" rows="3" name="me" ng-model="exclusive.me"></textarea>

  </form>
  <div class="card-exclusive">
    <div class="header"><h1>Beneficios</h1></div>
    <div>
    <h3> <span><img src="../images/check.svg"/></span> Ve quien ha visto tu perfil </h3>
    <h3> <span><img src="../images/check.svg"/></span> Sube hasta 8 fotos </h3>
    <h3> <span><img src="../images/check.svg"/></span> Sube hasta 4 vídeos </h3>
    <h3> <span><img src="../images/check.svg"/></span> Escribe ¿por qué quieres ser reclutado? </h3>
    </div>

  </div>
  <div class="save-button">
  <button class="input-signup" ng-click="update()">Guardar</button>
  </div>
</div>
