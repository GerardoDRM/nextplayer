<!DOCTYPE html>
<!--


555555555555555555      000000000          000000000
5::::::::::::::::5    00:::::::::00      00:::::::::00
5::::::::::::::::5  00:::::::::::::00  00:::::::::::::00
5:::::555555555555 0:::::::000:::::::00:::::::000:::::::0
5:::::5            0::::::0   0::::::00::::::0   0::::::0
5:::::5            0:::::0     0:::::00:::::0     0:::::0
5:::::5555555555   0:::::0     0:::::00:::::0     0:::::0
5:::::::::::::::5  0:::::0 000 0:::::00:::::0 000 0:::::0
555555555555:::::5 0:::::0 000 0:::::00:::::0 000 0:::::0
            5:::::50:::::0     0:::::00:::::0     0:::::0
            5:::::50:::::0     0:::::00:::::0     0:::::0
5555555     5:::::50::::::0   0::::::00::::::0   0::::::0
5::::::55555::::::50:::::::000:::::::00:::::::000:::::::0
 55:::::::::::::55  00:::::::::::::00  00:::::::::::::00
   55:::::::::55      00:::::::::00      00:::::::::00
     555555555          000000000          000000000



  This is the default "500: Server Error" page.
  User agents that don't "Accept" HTML will see a JSON version instead.
  You can customize the control logic for your needs in `config/500.js`

  Sails considers a request in a "500: Server Error" state when
  your app throws a catchable error (not inside of an asynchronous callback).

  You can also trigger this response from one of your controllers or policies with:
  `return res.serverError( e );`
  (where `e` is an optional message, error, or array of errors to include in the response)

-->
<html>
  <head>
    <title>Server Error</title>
    <link href='http://sailsjs.org/styles/fonts.css' rel='stylesheet'/>
    <style>
    /* Styles included inline since you'll probably be deleting this page anyway */
    html,body{text-align:left;font-size:1em}html,body,img,form,textarea,input,fieldset,div,p,div,ul,li,ol,dl,dt,dd,h1,h2,h3,h4,h5,h6,pre,code{margin:0;padding:0}ul,li{list-style:none}img{display:block}a img{border:0}a{text-decoration:none;font-weight:normal;font-family:inherit}*:active,*:focus{outline:0;-moz-outline-style:none}.clearfix:after{clear:both;content:".";display:block;font-size:0;height:0;line-height:0;visibility:hidden}.errorpage .ocean{background:url('http://sailsjs.com/images/waves.png') #0c8da0 no-repeat center 0;height:315px}.errorpage .ocean img{margin-right:auto;margin-left:auto}.errorpage .waves{display:block;padding-top:25px;margin-right:auto;margin-left:auto}.errorpage .main{display:block;margin-top:90px}.errorpage .logo{width:150px;margin-top:3.5em;margin-left:auto;margin-right:auto}.errorpage .fishy{display:block;padding-top:27px}.errorpage .help, .errorpage .error{padding-top:2em}.errorpage h1{font-family:"Open Sans","Myriad Pro",Arial,sans-serif;font-weight:bold;font-size:1.7em;color:#001c20;text-align:center}.errorpage h2{font-family:"Open Sans","Myriad Pro",Arial,sans-serif;font-weight:300;font-size:1.5em;color:#001c20;text-align:center}.errorpage p{font-family:"Open Sans","Myriad Pro",Arial,sans-serif;font-size:1.25em;color:#001c20;text-align:center}.errorpage a{color:#118798}.errorpage a:hover{color:#b1eef7}
      pre {display: block; width: 75%; margin-left: auto; margin-right: auto;}
      code {display:block;width:100%;padding:0;margin:0;overflow:scroll;}
      .fivehundred .ocean{background-color:#118798;height:275px;position:relative}.fivehundred .ocean .waves{display:block;position:absolute;bottom:-1px;left:10%;width:80%;max-width:700px;margin-right:auto;margin-left:auto;z-index:2}.fivehundred .ocean .whale{display:block;padding-top:27px;position:absolute;z-index:5;bottom:-50px;width:50%;max-width:550px;margin-left:7%}@media screen and (min-width:800px){.fivehundred .ocean .whale{bottom:-70px;left:18%}.fivehundred .ocean .waves{left:20%}}.fivehundred .container{width:70%;margin:auto}.fivehundred .main{display:block;margin-top:70px;width:90%;max-width:1100px;margin:0 auto;padding-top:80px}.fivehundred .main a:hover{color:#001c20}.fivehundred .logo{width:150px;margin:0 auto 10px}.fivehundred .error{ margin:4em auto 35px}.fivehundred h1{font-family:"Open Sans","Myriad Pro",Arial,sans-serif;font-weight:700;font-size:1.7em;color:#001c20;text-align:center}.fivehundred h2{font-family:"Open Sans","Myriad Pro",Arial,sans-serif;font-weight:300;font-size:1.5em;color:#001c20;text-align:center}.fivehundred p{font-family:"Open Sans","Myriad Pro",Arial,sans-serif;font-size:1.25em;color:#001c20;text-align:center}.fivehundred a{color:#118798}.fivehundred a:hover{color:#b1eef7}pre{white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;background-color:#e7ecef;outline:1px solid #ced7d6;padding:3px 3%}code{font-family:Monaco,monospace;font-weight:300;font-size:.8em}
      </style>
    </head>
    <body>
    <div class="fivehundred">
      <div class="ocean" style="background:black;" >
        <a class="navbar-brand" href="/">
          <img class="logo" style="width:70%; margin-top:0;" alt="Brand" src="../images/logo.png"> </a>
      </div>
      <div class="main">
        <h1>
          Se ha producido un error
        </h1>
        <h3> Las posibles causas pueden ser: </h3>
          <p>Aún no se ha verificado el e-mail y se esta intentando resetear la contraseña. </p>
        <p>Actualizaciones en el servidor </p>

        <p>Error de sistema </p>
        <h2>
          Something isn't right here.
        </h2>
      </div>
    </div>
  </body>
</html>
