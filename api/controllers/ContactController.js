/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// Node Mailer Config
var nodemailer = require('nodemailer');
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport('smtps://info@nextplayers.mx:reclutamiento2015@vps.webhostmex.com');
var mailOptions;
module.exports = {

  contact: function(req, res) {
    // Send Email Verfication
    mailOptions = {
      from: 'Nextplayers 👥 <info@nextplayers.mx>', // sender address
      to: 'info@nextplayers.mx', // list of receivers
      subject: "Tema:" + req.param("subject") + " \nCorreo:" + req.param('email'), // Subject line
      html: "De:" + req.param('name') + "</br> \n" + req.param("message") // html body
    };
    smtpTransport.sendMail(mailOptions, function(error, response) {
      if (error) {
        res.json(500);
      }
      res.ok();
    });
  }
};
