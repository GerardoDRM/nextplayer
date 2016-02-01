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
    <a>
      Contáctanos</a>
    para más información. (Subject: Quiero un vídeo.)
  </br>
</p>

<div class="modalDialog" id="dialogVideo">
  <div class="dialogVideo">
    <p>URL:</p>
    <form id="video-form">
      <input ng-model="video.url" required type="text"/>
      <div class="save-button">
        <button class="input-signup" ng-click="storeVideo()">Guardar</button>
      </div>
    </form>
  </div>
</div>
</div>
