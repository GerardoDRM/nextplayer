/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // create: function(req, res, next) {
  // 	User.create(req.params.all(), function userCreated(err, user){
  // 		if (err) return next(err);
  //
  // 		res.json(user);
  // 	});
  // }

  signup: function(req, res) {
    var Passwords = require('machinepack-passwords');
    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {

      },
      // OK.
      success: function(encryptedPassword) {
        User.create({
          name: req.param('name'),
          lastname: req.param('lastname'),
          email: req.param('email'),
          encryptedPassword: encryptedPassword,
          lastLoggedIn: new Date(),
          sport: req.param('sport'),
          role: req.param('role')
        }, function userCreated(err, newUser) {
          if (err) {

            console.log("err: ", err);
            console.log("err.invalidAttributes: ", err.invalidAttributes)

            // If this is a uniqueness error about the email attribute,
            // send back an easily parseable status code.
            if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
              return res.emailAddressInUse();
            }

            // Otherwise, send back something reasonable as our error response.
            return res.negotiate(err);
          }

          // Log user in
          req.session.me = newUser.id;

          // Send back the id of the new user
          return res.json({
            id: newUser.id
          });
        });
      },
    });
  } // end signup
};
