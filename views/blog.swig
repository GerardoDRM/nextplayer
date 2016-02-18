{% extends 'baseProfile.swig' %}
{% block content %}
<div class="container" ng-controller="BlogController">

  <div class="row">
    <div class="col-sm-3 dissapear">
      <h2>
        Entradas
      </h2>
      <ul class="blog-date">
        <li>
          <a href="javascript:void(0)" ng-click="getMonths($event)"><p class="years">2016</p></a>
          <ul class="blog-months">
            <li ng-repeat="m in months track by $index"><a href="javascript:void(0)" ng-click="showPosts(m.index,'2016')"><p>{{m.value}}</p></a></li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="col-sm-6" id="space-for-posts">
    </div>
    <div class="col-sm-3">
      <h2>
        Comentarios
      </h2>
      <textarea maxlength="150" class="form-group-modified-input" style="background-color:white; height:auto;" ng-model="blog.content" rows="4" placeholder="Escribe tu comentario..."></textarea>
      <div class="save-button" style="text-align:right;">
        <button class="input-signup" ng-click="postComment()" style="margin-top:-2px; margin-bottom:10px;">Publicar</button>
      </div>
      <div class="row" id="space-for-comments">

      </div>
    </div>
  </div>

</div>

{% endblock content %}
