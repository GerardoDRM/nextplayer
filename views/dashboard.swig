{% extends 'base.swig' %} {% block content %}

<div class="container">
  <div class="top-title-player">
    <h1 class="dissapear"> Sube PLAYERS CLUB y
      <br> obten beneficios exclusivos </br>
    </h1>
  </div>


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
          <h2> Edita tu perfil </h2> </div>
        </div>
        <div class="col-sm-4">
          <input class="form-buttom  " type="submit" value="Publicar" />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-2 ">
      <div id="dl-menu" class="dl-menuwrapper-admin ">

        <ul id="titles" class="dl-menu-admin">
          <li>
            <a data-content="basic" href="javascript:void(0)" class="menu-click selected">

              <h3>

                Información básica </h3>
            </a>
          </li>
          <li class="dissapear">
            <a data-content="services" id="services-btn" href="javascript:void(0)" class="menu-click">
              <h3>
                Deporte</h3>
            </a>
          </li>
          <li class="dissapear">
            <a data-content="gallery" id="gallery-btn" href="javascript:void(0)" class="menu-click">
              <h3>
                Galería</h3>
            </a>
          </li>
          <li class="dissapear">
            <a data-content="rooms" id="rooms-btn" href="javascript:void(0)" class="menu-click">
              <h3>
                ¿Por qué quiero ser reclutado? </h3>
            </a>
          </li>
          <li>
            <a data-content="roomsManager" id="roomsManager-btn" href="javascript:void(0)" class="menu-click">
              <h3>
                Membresía </h3>
            </a>
          </li>
        </ul>
      </div>

    </div>
    <div class="col-sm-10  font-basic">
      <ul class="cd-tabs-content" style="height: auto;">
        <li data-content="basic" class="selected" id="basic">
          <form class="form-inline align-labels">
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
              <!-- End Firts Col-->
            </div>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Escuela</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputEmail2">Promedio</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="exampleInputEmail2">Año de ingreso
                      <br> de secundaria </br>
                    </label>
                  </div>
                </div>
                <div class="col-sm-6 countries-eff">
                  <select style="margin-bottom:10%;">
                    <option value="2012" selected="selected">2012</option>
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
                    <label for="exampleInputEmail2">Teléfono</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">

                </div>
              </div>
            </div>
        </li>
        <li data-content="services" id="services">
          <form class="form-inline">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputName2">Deporte</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
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
            </div>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputName2">Altura</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputName2">Peso</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputName2">Medidas
                      <br>
                      <p>(Solo si participa en combine)</p>
                      </br>
                    </label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
            </div>
          </form>
          <div class="check">
            <div class="col-sm-6 margin-position">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified">
                    <label for="exampleInputName2">Posición</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <p> Elige 3 (máximo) </p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value=""> Quarterback
                    </label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value=""> Linebacker
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value=""> Runningback
                    </label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value=""> Safety
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value=""> Wide receiver
                    </label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value=""> Cornerback
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value=""> Tight Endt
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value=""> Línea ofensivo
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" value=""> Línea defensivo
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li data-content="gallery" id="gallery">
          <div class="gallery-title">
            <h3> Sube tus fotos </h3>
          </div>
          <div class="row margin-gallery">
            <div class="col-md-4">
              <div class="photo">
                <img src="../images/photo.png" alt="...">
              </div>
            </div>
            <div class="col-md-4">
              <div class="photo">
                <img src="../images/photo.png" alt="..."> </div>
            </div>
            <div class="col-md-4">
              <div class="photo">
                <img src="../images/photo.png" alt="..."> </div>
            </div>
          </div>
          <div class="gallery-video">
            <h3 style="margin-top: 5%;"> Sube tus vídeos </h3>

            <div class="row margin-gallery">
              <div class="col-md-4">
                <div class="photo">
                  <img src="../images/video.png" alt="..."> </div>
              </div>
              <div class="col-md-4">
                <div class="photo">
                  <img src="../images/video.png" alt="..."> </div>
              </div>
              <div class="col-md-4">
                <div class="photo">
                  <img src="../images/video.png" alt="..."> </div>

              </div>
              <p class="p-sport">No tienes video de tus jugadas? Nosotros te podemos hacer uno.
                <br> <a> Contáctanos</a> para más información. (Subject: Quiero un vídeo.) </br>
              </p>
            </div>
          </div>
        </li>
        <li data-content="rooms" id="rooms">

        </li>
        <li data-content="roomsManager" id="roomsManager">
          <div class="row">
            <div class="col-sm-6" style="font-weight: bold;
    margin-top: 10%;
    font-size: 25px;">
              <div class="checkbox align-labels">
                <label>
                  <input type="checkbox" value=""> Membresía Players Club
                  <br> $1500.00 </br>
                </label>
              </div>
            </div>
            <div class="col-sm-6">
              <h2 class="align-labels" style="margin-bottom:10%;"> Datos de pago </h2>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified align-labels">
                    <label for="exampleInputName2">Nombre</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified align-labels">
                    <label for="exampleInputName2">Apellidos</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified align-labels">
                    <label for="exampleInputName2">Número de tarjeta</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified align-labels">
                    <label for="exampleInputName2">CV</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group-modified align-labels">
                    <label for="exampleInputName2">Fecha de vencimiento</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <input type="email" class="form-group-modified-input" id="exampleInputEmail2" placeholder="">
                </div>
              </div>
              <div class="row margin-gallery">
                <div class="col-sm-6">
                  <div class="form-group-modified align-labels">
                    <input class="form-buttom buttom-member-one " type="submit" value="Borrar tarjeta">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group-modified align-labels">
                  <input class="form-buttom buttom-member-two " type="submit" value="Comprar">
                </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li data-content="promo" id="promo">
        </li>
        <li data-content="history" id="history">
        </li>
      </ul>
      <!-- cd-tabs-content -->

    </div>
  </div>

</div>
</div>

{% endblock content %}
