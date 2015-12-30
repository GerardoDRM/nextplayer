{% extends 'baseProfile.swig' %} {% block content %}

<div class="container no-padding">



  <div class="images-profile background-img-profile">
    <div class="row">
      <div class="col-sm-2 no-padding dissapear">
        <img src="../images/slide_2.jpg" alt="..." class="middle-image">
      </div>
      <div class="col-sm-10 no-padding image-picture-two">
        <div class="col-sm-4 dissapear">
          <div class="contador">
            <img src="../images/contador_temporal.png" alt="..."> </div>
        </div>
        <div class="col-sm-4">
          <div class="title">
            <h2> Edita tu perfil </h2>
          </div>
        </div>
        <div class="col-sm-4">
          <input class="form-buttom  " type="submit" value="Publicar" />
        </div>
      </div>
    </div>
  </div>
  <div class="row border-coach-one">
    <div class="col-sm-12  font-basic">
      <ul class="cd-tabs-content" style="height: auto;">
        <li data-content="basic" class="selected" id="basic">
          <form class="form-inline align-labels">
            <p> Información básica </p>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputName2">Nombre</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Apellido</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="text" class="form-group-modified-input" id="exampleInputName2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Estado</label>
                  </div>
                </div>
                <div class="col-sm-6 countries-eff">
                  <select id="states-list"></select>
                </div>
              </div>


              <!-- End Firts Col-->
            </div>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">País</label>
                  </div>
                </div>
                <div class="col-sm-6 countries-eff">
                  <select id="countries-list"></select>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Fecha de nacimiento</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="text" class="form-group-modified-input" id="exampleInputName2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Teléfono</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">

                </div>
              </div>
            </div>
        </li>





      </ul>
      <!-- cd-tabs-content -->

    </div>
  </div>

  <div class="row border-coach-two">
    <div class="col-sm-12  font-basic">
      <ul class="cd-tabs-content" style="height: auto;">
        <li data-content="basic" class="selected" id="basic">
          <form class="form-inline align-labels">
            <p class="experience"> Experiencia </p>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputName2">Equipo</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Posición</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="text" class="form-group-modified-input" id="exampleInputName2" placeholder="">
                </div>
              </div>



              <!-- End Firts Col-->
            </div>
            <div class="col-sm-6">

              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Fechas</label>
                  </div>
                </div>
                <div class="col-sm-6 margin-years">
                  <div class="years">
                    <select id="years-list"></select>
                    <select id="twenties-list"></select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Descripción/Logros</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <textarea class="form-control color-textarea" rows="3"></textarea>

                </div>
              </div>
            </div>
        </li>





      </ul>
      <!-- cd-tabs-content -->

    </div>
  </div>
  <div class="row">
    <div class="col-sm-12  font-basic">
      <ul class="cd-tabs-content" style="height: auto;">
        <li data-content="basic" class="selected" id="basic">
          <form class="form-inline align-labels">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <a class="anchor-coach" href="http://www.w3schools.com">+ Agregar nueva experiencia</a>

                  </div>
                </div>

              </div>




              <!-- End Firts Col-->
            </div>
    </div>
  </div>
</div>
  {% endblock content %}
