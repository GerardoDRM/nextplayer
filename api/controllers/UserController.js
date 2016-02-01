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
const fs = require('fs');

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
          sport: {
            title: req.param('sport')
          },
          role: req.param('role'),
          membership: {},
          details: {},
          exclusive: {}
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
          return res.ok();
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

  // Get complete Profile
  getUserProfile: function(req, res) {
    var user = req.param("user");
    // Get user and update info
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        delete userDB.encryptedPassword;
        if (userDB.membership !== undefined) {
          // Get UNIX timestamp for now
          var currentDate = Math.floor(Date.now() / 1000);
          if (userDB.membership.transaction_date <= currentDate) {
            userDB.status = 1;
          } else {
            userDB.status = 0;
          }
        }
        res.json(userDB);
      }
    });
  },

  // Get User Basic Info
  getUserBasic: function(req, res) {
    var user = req.param("user");
    // Get user and update info
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err) res.json(500);
      else {
        var basicKeys = ["name", "lastname", "state", "country", "born", "phone", "email", "profile_photo"];
        var applicantDetailsKeys = [];
        var basicInfo = {
          "general": {},
          "details": {}
        };
        // Getting just Basic Info
        for (var i = 0; i < basicKeys.length; i++) {
          basicInfo.general[basicKeys[i]] = userDB[basicKeys[i]];
        }
        // Adding sport
        basicInfo.general["sport_name"] = userDB.sport !== undefined ? userDB.sport["title"] : undefined;
        // Getting applicant Info
        for (var j in userDB.details) {
          basicInfo.details[j] = userDB.details[j];
        }
        if (userDB.membership !== undefined) {
          // Get UNIX timestamp for now
          var currentDate = Math.floor(Date.now() / 1000);
          if (userDB.membership.transaction_date <= currentDate) {
            basicInfo.status = 1;
          } else {
            basicInfo.status = 0;
          }
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

  getUserGallery: function(req, res) {
    var user = req.param("user");
    console.log(user);
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        var galleryInfo = {
          "status": 0
        };
        // Check if user has membership
        if (userDB.membership !== undefined && Object.keys(userDB.membership).length > 0) {
          // Get UNIX timestamp for now
          var currentDate = Math.floor(Date.now() / 1000);
          if (userDB.membership.transaction_date <= currentDate) {
            galleryInfo["status"] = 1;
          }
        }
        // Get gallery list
        if (userDB.details.gallery !== undefined) {
          galleryInfo.gallery = userDB.details.gallery;
          galleryInfo.videos = userDB.details.videos;
        }
        res.json(galleryInfo);
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
        var clubInfo = {
          "status": 0
        };
        if (userDB.membership !== undefined && Object.keys(userDB.membership).length > 0) {
          // Get UNIX timestamp for now
          var currentDate = Math.floor(Date.now() / 1000);
          if (userDB.membership.transaction_date <= currentDate) {
            clubInfo["status"] = 1;
            var clubDetails = [];
            if (userDB.role == "player") {
              clubDetails = clubDetails.concat(["me"]);
            }
            // Getting just Exclusive Info
            for (var i = 0; i < clubDetails.length; i++) {
              clubInfo[clubDetails[i]] = userDB.exclusive[clubDetails[i]];
            }
          }
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
        if (userDB.membership !== undefined && Object.keys(userDB.membership).length > 0) {
          // Get UNIX timestamp for now
          var currentDate = Math.floor(Date.now() / 1000);
          var transactionD = userDB.membership.transaction_date;
          if (transactionD <= currentDate) {
            // Get days until renew
            var endDate = moment.unix(transactionD).add(1, 'years');
            var startDate = moment.unix(currentDate);
            stripeInfo.days_counter = endDate.diff(startDate, 'days')
            stripeInfo.level = userDB.membership.level;
          }
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
        if (userDB.details === undefined) userDB.details = {};
        // Reset experience
        if (userDB.role == "coach") userDB.details.experience = [];
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
    console.log(membership);
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
            // Create card
            var card = createCard(customer.id, membership);
            card.then(function(card_result) {
              // Create Charge
              createCharge(customer.id, membership.amount, membership.selected_group).then(function(charge) {
                // Update Info
                userDB = addUserStripeInfo(userDB, customer.id, membership.selected_group, membership.level, charge.created);
                userDB.save(function(error) {
                  if (error) res.json(500);
                  res.json(201);
                });
              }, stripeError);
            }, stripeError);
          }, stripeError); // end Create customer
        } else {
          // Get card
          var stripeId = userDB.membership.stripeId;
          var cardList = getCustomerCard(stripeId);
          cardList.then(function(cards) {
            // Case User with registered card
            if (cards.data.length > 0) {
              // Create Charge
              createCharge(customer.id, membership.amount, membership.selected_group).then(function(charge) {
                // Update Info
                userDB = addUserStripeInfo(userDB, customer.id, membership.selected_group, membership.level, charge.created);
                userDB.save(function(error) {
                  if (error) res.json(500);
                  res.json(201);
                });
              }, stripeError);
            } else {
              // Case User without card
              // Create card
              var card = createCard(stripeId, membership);
              card.then(function(card_result) {
                // Create Charge
                createCharge(customer.id, membership.amount, membership.selected_group).then(function(charge) {
                  // Update Info
                  userDB = addUserStripeInfo(userDB, customer.id, membership.selected_group, membership.level, charge.created);
                  userDB.save(function(error) {
                    if (error) res.json(500);
                    res.json(201);
                  });
                }, stripeError);
              }, stripeError(reason));
            }
          }, stripeError(reason));
        } // end else
      } // end else
    }); // end query
  },

  uploadVideo: function(req, res) {
    var user = req.param("user");
    var video = req.param("video");
    // Get user and update info
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        var position = video.position;
        if (userDB.details.videos === undefined) userDB.details.videos = [];
        userDB.details.videos[position] = video.url;
      }
      userDB.save(function(error) {
        if (error) res.json(500);
        res.json(201);
      });
    });
  },

  uploadImage: function(req, res) {
    var photo = req.file('file');
    var model = req.param('model');
    var user = req.param("user");
    photo.upload({
      dirname: process.cwd() + '/assets/uploads/'
    }, function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }
      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }
      // Get user and update info
      User.findOne({
        id: user
      }).exec(function findOneCB(err, userDB) {
        if (err || userDB === undefined) res.json(500);
        else {
          // Image path
          var phrase = uploadedFiles[0].fd;
          var myRegexp = /\/assets\/uploads\/(.*)/;
          var match = myRegexp.exec(phrase);
          // Check image model
          if (model == "gallery") {
            var position = req.param("position");
            if (userDB.details.gallery === undefined) userDB.details.gallery = [];
            userDB.details.gallery[position] = match[0];
          }
          else if(model == "profile") {
            userDB.profile_photo = match[0];
          }
          userDB.save(function(error) {
            if (error) res.json(500);
            res.json(201);
          });
        }
      });
    });
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
              if (err) res.json(500)
                // asynchronously called
              console.log(confirmation);
              res.json(201);
            }
          );
        });
      }
    });
  },

  // Remove Video
  removeVideo: function(req, res) {
    var user = req.param("user");
    var video = req.param("video");
    // Get user and update info
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        var position = video.position;
        userDB.details.videos[position] = undefined;
      }
      userDB.save(function(error) {
        if (error) res.json(500);
        res.json(201);
      });
    });
  },

  // Remove Photo
  removePhoto: function(req, res) {
    // Get params
    var user = req.param("user");
    var photo = req.param("photo");
    // Get user and update info
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        var path = process.cwd();
        if (photo.model == "gallery") {
          var position = photo.position;
          path += userDB.details.gallery[position];
          userDB.details.gallery[position] = undefined;
        }
        else if(photo.model == "profile") {
          path += userDB.profile_photo;
          userDB.profile_photo = undefined;
        }
        // Remove physical file from directory
        fs.unlink(path, (err) => {
          if (err) throw res.json(500);
          userDB.save(function(error) {
            if (error) res.json(500);
            res.json(201);
          });
        });
      }
    });
  }
};

// Stripe Functions
var addUserStripeInfo = function(userDB, id, group, level, created) {
  // Adding info
  userDB.membership.stripeId = id;
  userDB.membership.group = group;
  userDB.membership.level = level;
  userDB.membership.transaction_date = created;

  return userDB;
}

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
  return stripe.charges.create({
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
