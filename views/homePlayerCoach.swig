{% extends 'baseProfile.swig' %} {% block content %}

<div class="container">
  <div class="row">
    <div class="col-sm-3" style="background-color: white;">
      <div style="height:250px;">
        <div class="interest">
          <h2>Me interesan </h2>
        </div>
        <div class="interest-team">
          <ul>
            <li class="li-description ">
              <div class="row">
                <div class="col-sm-4">
                  <img alt="..." class="photo-icon-interest" src="../images/equipo.png">
                </div>
                <div class="col-sm-2">
                  <p>UDLAP </p>
                  <p> Puebla </p>
                </div>
              </div>
        </div>
        </li>
        </ul>
      </div>
      <div style="height:250px;">
        <div class="interest">
          <h2>Les intereso </h2>
        </div>
        <div class="interest-team">
          <ul>
            <li class="li-description ">
              <div class="row">
                <div class="col-sm-4">
                  <img alt="..." class="photo-icon-interest" src="../images/equipo.png">
                </div>
                <div class="col-sm-2">
                  <p>UDLAP </p>
                  <p> Puebla </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-sm-6" style="background-color: white;">
      <div style="height:500px;">
        <div class="interest">
          <h2>Catálogo </h2>
        </div>
        <h2> Puebla
          <h2>
            <div class="row">
              <div class="col-xs-4">

                <div class="catalogue-image">

                </div>
              </div>
              <div class="col-xs-4">
                <div class="catalogue-image">

                </div>
              </div>
              <div class="col-xs-4">
                <div class="catalogue-image">

                </div>
              </div>
            </div>
      </div>
    </div>


    <div class="col-sm-3 dissapear" style="background-color: white;">

      <img alt="..." class="photo-icon-catalogue" src="../images/equipo.png">
      <img alt="..." class="photo-icon-catalogue" src="../images/equipo.png">

    </div>
  </div>

  <a id="botton-chat" class="chat"></a>


  <div id="live-chat">

		<header class="clearfix">

			<a href="#" class="chat-close">x</a>

			<h4>John Doe</h4>

			<span class="chat-message-counter">3</span>

		</header>

		<div class="chat">

			<div class="chat-history">

				<div class="chat-message clearfix">

					<img src="http://lorempixum.com/32/32/people" alt="" width="32" height="32">

					<div class="chat-message-content clearfix">

						<span class="chat-time">13:35</span>

						<h5>John Doe</h5>

						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, explicabo quasi ratione odio dolorum harum.</p>

					</div> <!-- end chat-message-content -->

				</div> <!-- end chat-message -->

				<hr>

				<div class="chat-message clearfix">

					<img src="http://gravatar.com/avatar/2c0ad52fc5943b78d6abe069cc08f320?s=32" alt="" width="32" height="32">

					<div class="chat-message-content clearfix">

						<span class="chat-time">13:37</span>

						<h5>Marco Biedermann</h5>

						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, nulla accusamus magni vel debitis numquam qui tempora rem voluptatem delectus!</p>

					</div> <!-- end chat-message-content -->

				</div> <!-- end chat-message -->

				<hr>

				<div class="chat-message clearfix">

					<img src="http://lorempixum.com/32/32/people" alt="" width="32" height="32">

					<div class="chat-message-content clearfix">

						<span class="chat-time">13:38</span>

						<h5>John Doe</h5>

						<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>

					</div> <!-- end chat-message-content -->

				</div> <!-- end chat-message -->

				<hr>

			</div> <!-- end chat-history -->

			<p class="chat-feedback">Your partner is typing…</p>

			<form action="#" method="post">

				<fieldset>

					<input type="text" placeholder="Type your message…" autofocus>
					<input type="hidden">

				</fieldset>

			</form>

		</div> <!-- end chat -->

	</div> 










{% endblock content %}
