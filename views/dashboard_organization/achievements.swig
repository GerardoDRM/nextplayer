<div ng-controller="AchivementsController">
  <form class="form-inline" ng-submit="submitSportForm()">
  <div class="row">'
    <div class="col-sm-6" id="space-for-achivements"></div>
  </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group-modified" style="margin-top:25px; border-top: 1px solid gray;">
          <a achivement class="anchor-coach" href="javascript:void(0);" style="margin-left:0px;">+ Añadir logro</a>
        </div>
      </div>
    </div>
  </form>
  <div class="save-button">
    <button class="input-signup" ng-click="update()">Guardar</button>
  </div>
</div>
