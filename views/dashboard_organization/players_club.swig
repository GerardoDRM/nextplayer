<div ng-controller="ExclusiveController">
  <form class="form-inline align-labels" id="exclusive-form">
    <h2>¿Por qué quiero ser reclutado?</h2>
    <textarea class="form-control text-height-one" style="margin: 0px; width: 386px;  height: 123px;" rows="3" name="me" ng-model="exclusive.me"></textarea>
 <h3 style="margin-top:20px"> * Ve quien ha visto tu perfil </h3>
 <h3> * Sube hasta 8 fotos </h3>
 <h3> * Subir hasta 4 vídeos </h3>
  </form>
  <div class="save-button">
  <button class="input-signup" ng-click="update()">Guardar</button>
  </div>
</div>
