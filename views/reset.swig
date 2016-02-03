{% extends 'base.swig' %} {% block content %}
<div class="container">
<div class="form-login" ng-app="UsersModule" ng-controller="ForgotPasswordController" ng-cloak>
  <form ng-submit="submitResetForm()" name="reset" id="form-reset">
    <input type="hidden" id="token" value="<%= message.token %>"/>
    <input type="password" class="input-login" required placeholder="Contraseña" id="password" name="password" ng-model="password" required>
    <input type="password" class="input-login" required placeholder="Confirmar Contraseña" name="password2" required>
    <input type="submit" value="Cambiar" class="input-login">
  </form>
</div>
</div>

{% endblock content %}
