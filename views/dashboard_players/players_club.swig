<div ng-controller="ExclusiveController">
  <form class="form-inline align-labels">
    <h2>¿Por qué quiero ser reclutado?</h2>
    <textarea class="form-control text-height-one" rows="3" name="me" ng-model="exclusive.me"></textarea>
    <button class="input-signup" ng-click="update()">Guardar</button>
  </form>
</div>
