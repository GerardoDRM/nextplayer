{% extends 'baseProfile.swig' %}
{% block content %}
<div ng-controller="HomeOrgController">
  <div class="container">
    <div class="row container-inner-main">
      <div class="col-sm-3 no-padding">
        <div class="inner-block" style="height:400px">
          <div class="interest">
            <h2>Seguidores ({{ followers_counter }})
            </h2>
          </div>
          <div class="interest-team">
            <ul id="space-for-followers">
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-9 no-padding">
        <div class="inner-block" style="height:400px;">
          <div class="interest">
            <h2>Anuncios
            </h2>
          </div>
          <div id="space-for-notice"></div>
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
            <a href="/search">Reclutar</a>
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
                    <p>Juan Jose
                    </br>
                    (Futbol soccer)</p>
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

                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
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
</div>
{% endblock content %}
