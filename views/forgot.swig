{% extends 'base.swig' %} {% block content %}

<div class="container">
  <div class="form-login" ng-app="UsersModule" ng-controller="ForgotPasswordController" ng-cloak>
    <h1>Ha olvidado su password, porfavor ingrese su email:</h1>

    <form ng-submit="submitForgotForm()" name="forgot" id="form-forgot">
    <input type="email" class="input-login"  required placeholder="E-mail" style="color:black;"  ng-model="email" required/>
    <input type="submit" value="Enviar" class="input-login">
  </div>
  </form>
</div>

{% endblock content %}
