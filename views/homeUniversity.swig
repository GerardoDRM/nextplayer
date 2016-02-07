{% extends 'baseProfile.swig' %}
{% block content %}

<div class="container">
  <div class="row container-inner-main">
    <div class="col-sm-3 no-padding">
      <div class="inner-block" style="height:250px">
        <div class="interest">
          <h2>Seguidores (600)
          </h2>
        </div>
        <div class="interest-team">
          <ul>
            <li>
              <div class="row">
                <div class="col-xs-4">
                  <img alt="..." src="../images/equipo.png">
                </div>
                <div class="col-xs-8">
                  <p class="title">UDLAP</p>
                  <p>Puebla</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-9 no-padding">
      <div class="inner-block" style="height:250px;">
        <div class="interest">
          <h2>Anuncios
          </h2>
        </div>
        <div class="advicement">
          <h3>20.12.2016</h3>
          <p>El dia de hoy se presenta..........</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row container-inner-main">
    <div class="col-sm-12 no-padding">
      <div class="inner-block semi-full-box">
        <div class="interest">
          <h2>Prospectos</h2>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <!-- First Col -->
            <div class="row profile-card no-margin">
              <div class="col-sm-4">
                <div class="card">
                  <div class="catalogue-image"></div>
                  <p>Udlap</p>
                  <img class="shield" src="../images/equipo_escudo.png">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="prospects-description">
                  <h3>
                    Añadido por:
                  </h3>
                  <div class="col-sm-6">
                    Javier Torres
                  </div>
                  <div class="col-sm-6">
                    <img alt="..." class="message-image" src="../images/mensage.svg">
                  </div>

                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                  </p>

                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <!-- Second Col -->
            <div class="row profile-card no-margin">
              <div class="col-sm-4">
                <div class="card">
                  <div class="catalogue-image"></div>
                  <p>Juan Jose </br> (Futbol soccer)</p>
                  <img class="shield" src="../images/equipo_escudo.png">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="prospects-description">
                  <h3>
                    Añadido por:
                  </h3>
                  <div class="col-sm-6 no-padding">
                    Javier Torres
                  </div>
                  <div class="col-sm-6">
                    <a><img alt="..." class="message-image" src="../images/mensage.svg"></a>
                  </div>

                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{% endblock content %}
