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
  <form action="http://localhost:1337/user/gallery/photos" enctype="multipart/form-data" method="post">
    <input type="text" name="title"><br>
    <input type="file" name="photo" multiple="multiple"><br>
    <input type="submit" value="Upload">
    </form>
  <p class="p-sport">No tienes video de tus jugadas? Nosotros te podemos hacer uno.
    <br>
    <a>
      Contáctanos</a>
    para más información. (Subject: Quiero un vídeo.)
  </br>
</p>
</div>
