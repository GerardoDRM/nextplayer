<div ng-controller="AchivementsController">
  <form class="form-inline" ng-submit="submitSportForm()">
    <div class="col-md-6">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Nombre</label>
          </div>
        </div>
        <div class="col-sm-6">
          <select style="margin-bottom:10%;" name="year" ng-model="player.schoolYear">
            <option selected="selected" value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group-modified">
            <label>Descripción</label>
          </div>
        </div>

      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group-modified">
        <textarea class="form-control" style="background-color:#e9eaed; width:100%;" rows="3"></textarea>
          </div>
        </div>

      </div>

    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group-modified" style="margin-top:25px;     border-top: 1px solid gray;">
        <a class="anchor-coach" style="margin-left:0px;" experience href="javascript:void(0);">+ Añadir logro</a>
        </div>
      </div>

    </div>




</form>

</div>
