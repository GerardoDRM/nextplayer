<div ng-controller="StaffController">
  <form class="form-inline">

    <div class="row">
      <div class="col-sm-12">
        <div class="form-group-modified" style="margin-bottom:25px;">
          <a class="anchor-coach" staff href="javascript:void(0);" style="margin-left:0px;">+ Añadir staff</a>
        </div>
      </div>

    </div>
    <div class="row" id="space-for-staff">
      <div class="col-sm-4">
        <div class="staff-image" style="margin-bottom:25px;"></div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group-modified align-labels">
              <label >Nombre</label>
            </div>
          </div>
          <div class="col-sm-6">
            <input class="form-group-modified-input" type="text" name="name" ng-model="membership.name" required>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group-modified align-labels">
              <label >Puesto</label>
            </div>
          </div>
          <div class="col-sm-6">
            <input class="form-group-modified-input" type="text" name="name" ng-model="membership.name" required>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group-modified align-labels">
              <label >Deporte</label>
            </div>
          </div>
          <div class="col-sm-6">
            <input class="form-group-modified-input" type="text" name="name" ng-model="membership.name" required>
          </div>
        </div>
      </div>

    </div>

  </form>

</div>
