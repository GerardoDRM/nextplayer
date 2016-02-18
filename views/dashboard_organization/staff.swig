<div ng-controller="StaffController">
  <form class="form-inline" id="staffForm">

    <div class="row">
      <div class="col-sm-12">
        <div class="form-group-modified" style="margin-bottom:25px;">
          <a class="anchor-coach" href="javascript:void(0);" staff style="margin-left:0px;">+ Añadir staff</a>
        </div>
      </div>

    </div>
    <div class="row" id="space-for-staff"></div>

  </form>
  <div class="save-button">
    <button class="input-signup" ng-click="update()">Guardar</button>
  </div>

  <div class="modalDialog" id="loading">
    <div class="dialogLoading">
      <h3>
        Espere un momento porfavor
      </h3>
      <img src="../images/load_icon.gif">
    </div>
  </div>
</div>
