{% extends 'baseProfile.swig' %}
{% block content %}
<div ng-controller="HomeOrgController" ng-cloak>
  <div class="container">
    <div class="row container-inner-main">
      <div class="col-sm-3 no-padding">
        <div class="inner-block" style="height:400px">
          <div class="interest">
            <h2>Seguidores ({{ followers_counter }})
            </h2>
          </div>
          <div class="interest-team">
            <ul id="space-for-followers"></ul>
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
            <div style="margin-left: 70%; margin-top: 21px;">
              <a class="view-green--btn" href="javascript:void(0);" ng-click="getAccess()">Reclutar</a>
            </div>
            <div id="space-for-following"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Sessions -->
  <div class="modalDialog" id="dialogSessions">
    <div class="dialogSessions">
      <h1>Sesiones:</h1>
      <h4>
        *Nota: Una vez que la session este activa, es necesario cerrar la sesion cuando esta sea desocupada, de lo contrario cada session tendra un limite de una hora.</h4>
      <form>
        <div class="row" id="space-for-access"></div>
        <div class="save-button" style="text-align:center;">
          <button class="input-signup" ng-click="updateSession()" style="background:#2ae92e;" style="margin-top: 18px;">Entrar</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Comments -->
  <div class="modalDialog" id="dialogComment">
    <div class="dialogSessions">
      <h1>Comenta sobre este prospecto:</h1>
      <p>(Max. 200 caracteres)</p>
      <form id="form-comment">
        <textarea maxlength="200" ng-model="comment" placeholder="Escribe tu comentario" required></textarea>
        <div class="save-button" style="text-align:center;">
          <button class="input-signup" ng-click="addComment()" style="margin-top: 18px; background:#2ae92e;">Guardar</button>
        </div>
      </form>
    </div>
  </div>
  <a class="chat" id="button-chat" ng-click="showInbox($event)"></a>

  <!-- Modal Chat -->
  <div class="modalChat" id="chat-structure">
    <div class="inbox-container" id="inbox">
      <div class="header">
        <h2>Inbox</h2>
      </div>
      <ul class="message-list" id="space-for-contacts"></ul>
    </div>
    <div class="inbox-container" id="conversation">
      <div class="header">
        <span aria-hidden="true" class="glyphicon glyphicon-triangle-left" id="return-inbox" ng-click="showInbox($event)"></span>
        <h2 id="roomName"></h2>
      </div>
      <ul id="messages-space"></ul>
      <div class="message-input">
        <textarea ng-model="message" placeholder="Escriba un mensaje"></textarea>
        <a href="javascript:void(0);" ng-click="sendMessage()"><img src="../images/send.svg"></a>
      </div>
    </div>
  </div>
</div>
{% endblock content %}
