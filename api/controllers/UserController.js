/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
var stripe = require("stripe")(
  "sk_test_uXFg6L2zyI568ZpmaAZbIJfZ"
);
var moment = require('moment');


module.exports = {

  /**
   * Check the provided email address and password, and if they
   * match a real user in the database, sign in to Activity Overlord.
   */
  login: function(req, res) {

    // Try to look up user using the provided email address
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function(err) {
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function() {
          return res.notFound();
        },

        success: function() {

          // Store user id in the user session
          req.session.me = user.id;

          // All done- let the client know that everything worked.
          return res.ok();
        }
      });
    });

  },


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
          sport: {
            title: req.param('sport')
          },
          role: req.param('role')
        }, function userCreated(err, newUser) {
          if (err) {

            console.log("err: " + err);
            console.log("err.invalidAttributes: ");

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
  }, // end signup
  /**
   * Log out of Activity Overlord.
   * (wipes `me` from the sesion)
   */
  logout: function(req, res) {

    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.backToHomePage();
      }

      // Wipe out the session (log out)
      req.session.me = null;

      // Either send a 200 OK or redirect to the home page
      return res.backToHomePage();

    });
  },

  'facebook': function(req, res, next) {
    passport.authenticate('facebook', {
        scope: ['email']
      },
      function(err, user) {
        req.logIn(user, function(err) {
          if (err) {
            req.session.flash = 'There was an error';
            res.redirect('/login');
          } else {
            req.session.me = user;
            res.redirect('/');
          }
        });
      })(req, res, next);
  },

  'facebook/callback': function(req, res, next) {
    passport.authenticate('facebook',
      function(req, res) {
        res.redirect('/');
      })(req, res, next);
  },


  ////////////////////////////
  ///////Get User Info ///////
  ////////////////////////////

  // Get User Basic Info
  getUserBasic: function(req, res) {
    var user = req.param("user");
    // Get user and update info
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        var basicKeys = ["name", "lastname", "state", "country", "born", "phone"];
        var applicantDetailsKeys = [];
        var basicInfo = {
          "general": {},
          "details": {}
        };
        if (userDB.role == "player") {
          applicantDetailsKeys = ["school", "schoolGrade", "schoolYear"];
        } else {
          applicantDetailsKeys = ["experience"];
        }
        // Getting just Basic Info
        for (var i = 0; i < basicKeys.length; i++) {
          basicInfo.general[basicKeys[i]] = userDB[basicKeys[i]];
        }
        // Adding sport
        basicInfo.general["sport"] = userDB.sport !== undefined ? userDB.sport["title"] : undefined;
        // Getting applicant Info
        for (var j = 0; j < applicantDetailsKeys.length; j++) {
          basicInfo.details[applicantDetailsKeys[j]] = userDB.details[applicantDetailsKeys[j]];
        }
        res.json(basicInfo);
      }
    });
  },

  getUserSport: function(req, res) {
    var user = req.param("user");
    // Get user and update info
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        var sportInfo = {};
        var sportDetails = ["title"];
        if (userDB.role == "player") {
          sportDetails = sportDetails.concat(["height", "weight", "team", "measures", "positions"]);
        }
        // Getting just Sport Info
        for (var i = 0; i < sportDetails.length; i++) {
          sportInfo[sportDetails[i]] = userDB.sport[sportDetails[i]];
        }
        res.json(sportInfo);
      }
    });
  },

  getUserClub: function(req, res) {
    var user = req.param("user");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        var clubInfo = {};
        var clubDetails = [];
        if (userDB.role == "player") {
          clubDetails = clubDetails.concat(["me"]);
        }
        // Getting just Exclusive Info
        for (var i = 0; i < clubDetails.length; i++) {
          clubInfo[clubDetails[i]] = userDB.exclusive[clubDetails[i]];
        }
        res.json(clubInfo);
      }
    });
  },

  getUserStripe: function(req, res) {
    var user = req.param("user");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        var stripeInfo = {};
        if (userDB.membership !== undefined) {
          var cardList = getCustomerCard(userDB.membership.stripeId);
          cardList.then(function(cards) {
            // Case User with registered card
            if (cards.data.length > 0) {
              stripeInfo.month = cards.data[0].exp_month;
              stripeInfo.year = cards.data[0].exp_year;
              stripeInfo.card = "************" + cards.data[0].last4;
              stripeInfo.name = cards.data[0].name;
            }
            res.json(stripeInfo);
          });
        } else {
          res.json({});
        }
      }
    });
  },

  ////////////////////////////
  ////User Updating Actions///
  ////////////////////////////

  // Update User Basic Info
  basicinfo: function(req, res) {
    // Get params
    var user = req.param("user");
    var applicantDetails = req.param("applicant");
    // Get user and update info
    User.findOne({
      id: user.id
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        // General Info
        for (var basic in user) {
          userDB[basic] = user[basic];
        }
        // Applicant Details
        for (var detail in applicantDetails) {
          userDB.details[detail] = applicantDetails[detail];
        }
        // Update Info
        userDB.save(function(error) {
          if (error) {
            res.json(500);
          }
        });
      }
    });
    res.json("Ok");
  },
  // Update User Sport Info
  sport: function(req, res) {
    // Get params
    var sport = req.param("sport");
    var user = req.param("user");
    // Get user and update info
    User.findOne({
      id: user.id
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        // Delete not required key
        delete sport.position;
        // Sport Details
        userDB.sport["positions"] = {};
        for (var detail in sport) {
          userDB.sport[detail] = sport[detail];
        }
        // Update Info
        userDB.save(function(error) {
          if (error) {
            res.json(500);
          }
        });
      }
    });
    res.json("Ok");
  },
  // Update User Players Club Info
  club: function(req, res) {
    // Get params
    var club = req.param("exclusive");
    var user = req.param("user");
    // Get user and update info
    User.findOne({
      id: user.id
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        // Club Details
        if (userDB.exclusive === undefined) userDB.exclusive = {};
        for (var detail in club) {
          userDB.exclusive[detail] = club[detail];
        }
        // Update Info
        userDB.save(function(error) {
          if (error) {
            res.json(500);
          }
        });
      }
    });
    res.json("Ok");
  },

  // Update User Membership Info
  membership: function(req, res) {
    // Get params
    var membership = req.param("membership");
    var user = req.param("user");
    // Get user and update info
    User.findOne({
      id: user.id
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        // Membership Details
        // Case No Membership register
        if (userDB.membership === undefined) userDB.membership = {};
        // Case no register
        if (userDB.membership.stripeId === undefined) {
          // Create Stripe Customer
          stripe.customers.create({
            description: 'Customer ' + userDB.name,
            email: userDB.email
          }).then(function(customer) {
            // Update Info
            userDB.membership.stripeId = customer.id;
            userDB.save(function(error) {
              if (error) res.json(500);
            });
            // Create card
            var card = createCard(customer.id, membership);
            card.then(function(card_result) {
              // Create Charge
              createCharge(customer.id, 1500, "Players Club").then(function(charge) {
                console.log(charge);
                res.json("Ok");
              }, stripeError);
            }, stripeError);
          }, stripeError); // end Create customer
        } else {
          console.log("Current User");
          // Get card
          var stripeId = userDB.membership.stripeId;
          var cardList = getCustomerCard(stripeId);
          cardList.then(function(cards) {
            console.log(cards);
            // Case User with registered card
            if (cards.data.length > 0) {
              // Create Charge
              createCharge(stripeId, 1500, "Players Club");
            } else {
              // Case User without card
              // Create card
              var card = createCard(stripeId, membership);
              card.then(function(card_result) {
                // Create Charge
                createCharge(stripeId, 1500, "Players Club");
              }, stripeError(reason));
            }
          }, stripeError(reason));
        } // end else
      } // end else
    }); // end query
  },

  ////////////////////////////
  ////User Delete Actions  ///
  ////////////////////////////

  // Delete User Card Info
  deleteCard: function(req, res) {
    // Get params
    var user = req.param("user");
    // Get user and update info
    User.findOne({
      id: user.id
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        // Delete register card
        stripe.customers.listCards(userDB.membership.stripeId, function(err, cards) {
          // Get Card and delete it
          var card = cards.data[0];
          stripe.customers.deleteCard(
            userDB.membership.stripeId,
            card.id,
            function(err, confirmation) {
              // asynchronously called
              console.log(confirmation);
            }
          );
        });
      }
    });
    res.json("Ok");
  }
};

// Stripe Functions
var createCard = function(customer, membership) {
  // Create Stripe Card
  return stripe.customers.createSource(
    customer, {
      source: {
        "object": "card",
        "exp_month": membership.month,
        "exp_year": membership.year,
        "number": membership.card,
        "cvc": membership.cvc,
        "name": membership.name
      }
    }); // end Create card
}

var createCharge = function(customer, amount, description) {
  // Create Charge
  stripe.charges.create({
    amount: amount * 100,
    currency: "mxn",
    customer: customer,
    description: "Charge for " + description
  }); // end Create Charge
}

var getCustomerCard = function(customer) {
  // Check Card
  return stripe.customers.listCards(customer);
}


var stripeError = function(reason) {
  console.log(reason);
}
