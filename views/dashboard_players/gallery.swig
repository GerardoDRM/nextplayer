<div ng-controller="GalleryController">
  <div class="gallery-title">
    <h3>
      Sube tus fotos
    </h3>
  </div>
  <div class="row margin-gallery" id="space-for-photos"></div>
  <div class="gallery-video">
    <h3 style="margin-top: 5%;">
      Sube tus vídeos
    </h3>

    <div class="row margin-gallery" id="space-for-videos"></div>
  </div>
  <p>No tienes video de tus jugadas? Nosotros te podemos hacer uno.
    <br>
    <a style="color:#9bee9d" href="mailto:info@nextplayers.mx">
      Contáctanos</a>
    para más información. (Subject: Quiero un vídeo.)
  </br>
</p>

<div class="modalDialog" id="dialogVideo">
  <div class="dialogVideo">
    <h1>URL:</h1>
    <form id="video-form">
      <input style="width:100%;" ng-model="video.url" required type="text"/>
      <div>
        <h3> Youtube </h3>
        <img style="width: 100%;" src="../images/youtube3.png">
        <h3> Hudl </h3>
        <img style="width: 100%;" src="../images/holds.png">
      </div>
      <div class="save-button">
        <button class="input-signup" ng-click="storeVideo()">Guardar</button>
      </div>
    </form>
  </div>
</div>
</div>
