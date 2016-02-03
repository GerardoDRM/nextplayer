{% extends 'baseProfile.swig' %} {% block content %}
<div class="container">

  <div class="row">
    <div class="col-sm-3">

      <h2> Entradas </h2>
      <ul style="list-style: none;">
        <li>
          <p style="font-weight:bold;">2016 </p>
      <ul style="list-style: none; padding-left: 38px;">    <li>
            <p>Enero </p>
          </li>
          <li>
            <p>Febrero </p>
          </li>
          <li>
            <p>Marzo </p>
          </li>
          <li>
            <p>Abril </p>
          </li>
          <li>
            <p>Mayo </p>
          </li>
          <li>
            <p>Junio </p>
          </li>
          <li>
            <p>Julio </p>
          </li>
          <li>
            <p>Agosto </p>
          </li>
          <li>
            <p>Septiembre </p>
          </li>
          <li>
            <p>Octubre </p>
          </li>
          <li>
            <p>Noviembre </p>
          </li>
          <li>
            <p>Diciembre </p>
          </li> </ul>
        </li>
        <li style="font-weight:bold;"> <p>2015 </p></li>
          <li style="font-weight:bold;"> <p>2014 </p></li>
            <li style="font-weight:bold;"> <p>2013 </p></li>
      </ul>
    </div>

    <div class="col-sm-6" style="background-color:white;">

      <h2> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </h2>
      <p style="font-style:italic; margin-bottom:10px;"> Juan Hernández -12 de Diciembre de 2016 </p>
      <p style="margin-bottom:10px;"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
        quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi.</p>
      <p style="margin-bottom:10px;"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
        quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi.</p>
      <p style="margin-bottom:10px;"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
        quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi.</p>
      <p style="margin-bottom:10px;"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
        quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi.</p>
      <p style="margin-bottom:10px;"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
        quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi.</p>

    </div>
    <div class="col-sm-3">

      <h2> (12) Comentarios </h2>
      <input class="form-group-modified-input" style="background-color:white;" placeholder="Escribe tu comentario..." type="text" name="school" ng-model="player.school">
      <div class="save-button" style="text-align:right;">
        <button class="input-signup" style="margin-top:-2px; margin-bottom:10px;" ng-click="update()">Publicar</button>
      </div>
      <p style="font-weight:bold;"> Anónimo </p>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, </p>

      <p style="font-weight:bold; border-top: 2px solid;"> Jorge Huerta </p>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>
    </div>



  </div>

</div>

{% endblock content %}
