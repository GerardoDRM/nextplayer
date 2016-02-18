{% extends 'baseProfile.swig' %}
{% block content %}
<div ng-controller="HomeProfileController">
  <div class="container">
    <div class="row container-inner-main">
      <div class="col-sm-3 no-padding">
        <div class="inner-block half-box">
          <div class="interest">
            <h2>Me interesan
            </h2>
          </div>
          <div class="interest-team">
            <ul id="space-for-following">
            </ul>
          </div>
        </div>
        <div class="inner-block half-box">
          <div class="interest">
            <h2>Les intereso</h2>
          </div>
          <div class="interest-team">
            <ul id="space-for-followers">

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
          <div id="space-for-notice"></div>
        </div>
        <div class="inner-block semi-full-box">
          <div class="interest">
            <h2>Catálogo
            </h2>
          </div>
          <div class="row profile-card no-margin" id="space-for-teams">


          </div>
        </div>
      </div>

      <div class="col-sm-3 dissapear no-padding">
        {# <div class="inner-block full-box">
          <img alt="..." src="../images/equipo.png" width="100%;">
          <img alt="..." src="../images/equipo.png" width="100%;">
        </div> #}
      </div>
    </div>
  </div>
  <a class="chat" id="button-chat" ng-click="showInbox($event)"></a>
  <!-- Modal Chat -->
  <div class="modalChat" id="chat-structure">
    <div class="inbox-container" id="inbox">
      <div class="header">
        <h2>Inbox</h2>
      </div>
      <ul class="message-list" id="space-for-contacts">
      </ul>
    </div>
    <div class="inbox-container" id="conversation">
      <div class="header">
      <span aria-hidden="true" class="glyphicon glyphicon-triangle-left" id="return-inbox" ng-click="showInbox($event)"></span>
        <h2 id="roomName"></h2>
      </div>
      <ul id="messages-space">
      </ul>
      <div class="message-input">
        <input type="text" ng-model="message" enter="sendMessage()"/>
      </div>
    </div>
  </div>
</div>
{% endblock content %}
