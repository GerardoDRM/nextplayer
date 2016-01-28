{% extends 'baseProfile.swig' %}
{% block content %}

<div class="container">
  <div class="row container-inner-main">
    <div class="col-sm-3 no-padding">
      <div class="inner-block half-box">
        <div class="interest">
          <h2>Me interesan
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
      <div class="inner-block half-box">
        <div class="interest">
          <h2>Les intereso
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

    <div class="col-sm-6 no-padding">
      <div class="inner-block quarter-box">
        <div class="interest">
          <h2>Anuncios
          </h2>
        </div>
        <div class="advicement">
          <h3>20.12.2016</h3>
          <p>El dia de hoy se presenta..........</p>
        </div>
      </div>
      <div class="inner-block semi-full-box">
        <div class="interest">
          <h2>Catálogo
          </h2>
        </div>
        <div class="row profile-card no-margin">
          <div class="col-xs-6 col-sm-4">
            <div class="card">
              <div class="catalogue-image"></div>
              <p>Udlap</p>
              <img class="shield" src="../images/equipo_escudo.png">
            </div>
          </div>
          <div class="col-xs-6 col-sm-4">
            <div class="card">
              <div class="catalogue-image"></div>
              <p>Udlap</p>
              <img class="shield" src="../images/equipo_escudo.png">
            </div>
          </div>
          <div class="col-xs-6 col-sm-4">
            <div class="card">
              <div class="catalogue-image"></div>
              <p>Udlap</p>
              <img class="shield" src="../images/equipo_escudo.png">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-3 dissapear no-padding">
      <div class="inner-block full-box">
        <img alt="..." src="../images/equipo.png" width="100%;">
        <img alt="..." src="../images/equipo.png" width="100%;">
      </div>
    </div>
  </div>
</div>
<a class="chat" id="button-chat"></a>

<!-- Modal Chat -->
<div class="modalChat" id="chat-structure">
  <div class="inbox-container" id="inbox">
    <div class="header">
      <h2>Inbox</h2>
    </div>
    <ul class="message-list">
      <li class="inbox-contact">
        <div class="row">
          <div class="col-sm-4">
            <img src="http://i.usatoday.net/sports/_photos/2011/09/26/St-Xaviers-Specht-to-coach-Team-USA-in-bowl-80DUI6A-x-large.jpg">
          </div>
          <div class="col-sm-6">
            <p>UDLAP</p>
          </div>
        </div>

      </li>
    </ul>
  </div>
  <div class="inbox-container" id="conversation">
    <div class="header">
    <span class="glyphicon glyphicon-triangle-left" aria-hidden="true" id="return-inbox"></span>
    <h2>UDLAP</h2>
    </div>
    <ul>
      <li>
        <div class="message">
          <p>Esto es un mensaje</p>
        </div>
      </li>
      <li>
        <div class="message own-message">
          <p>Esto es un mensaje</p>
        </div>
      </li>
      <li>
        <div class="message own-message">
          <p>Esto es un mensaje</p>
        </div>
      </li>
      <li>
        <div class="message">
          <p>Esto es un mensaje</p>
        </div>
      </li>
    </ul>
    <div class="message-input">
      <input type="text"/>
    </div>
  </div>
</div>

{% endblock content %}
