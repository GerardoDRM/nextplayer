<div ng-controller="ExclusiveController">
  <form class="form-inline align-labels">
    <h2>¿Por qué quiero ser reclutado?</h2>
    <textarea class="form-control text-height-one" style="margin: 0px; width: 386px;  height: 123px;" rows="3" name="me" ng-model="exclusive.me"></textarea>
 <h3 style="margin-top:20px"> ¿Qué coaches han visto mi perfil? </h3>
 <h3> Subir más fotos </h3>
 <h3> Subir más vídeos </h3>
  </form>
  <div class="save-button">
  <button class="input-signup" ng-click="update()">Guardar</button>
  </div>
</div>
