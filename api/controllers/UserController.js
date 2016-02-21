/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
var stripe = require("stripe")(
  "sk_live_fNHtUm55ReBOFwjFReAGTM8l"
);
var moment = require('moment');
const fs = require('fs');
var Passwords = require('machinepack-passwords');
// Node Mailer Config
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var ObjectId = require('mongodb').ObjectID;
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport('smtps://contacto@nextplayers.mx:reclu2016@smtp.gmail.com');
var rand, mailOptions, host, link;

module.exports = {

  /**
   * Check the provided email address and password, and if they
   * match a real user in the database, sign in to Activity Overlord.
   */
  login: function(req, res) {

    // Try to look up user using the provided email address
    User.findOne({
      email: req.param('email'),
      email_verification: true
    }, function foundUser(err, user) {
      if (err || user === undefined) return res.negotiate(err);
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      Passwords.checkPassword({
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

  loginSocket: function(req, res) {
    User.findOne({
      id: req.param("user")
    }, function foundUser(err, user) {
      if (err || user === undefined) return res.json({
        status: 500
      });
      if (!user) return res.json({
        status: 500
      });
      if (user.role == "organization") {
        User.watch(req);
        res.json({
          status: 201,
          message: "User socket"
        });
      } else {
        res.json({
          status: 201
        });
      }
    });
  },

  signup: function(req, res) {
    var role = req.param("role");
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
        var data = {
          name: req.param('name'),
          lastname: req.param('lastname'),
          email: req.param('email'),
          encryptedPassword: encryptedPassword,
          role: req.param('role'),
          membership: {},
          details: {},
          exclusive: {},
          email_verification: false
        }
        if (role == "organization") {
          data.sports_list = [];
          data.details.organization_name = req.param("organization_name");
        } else {
          if (role == "coach") data.model = req.param("model");
          data.sport = {
            title: req.param('sport')
          }
        }

        User.create(data, function userCreated(err, newUser) {
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
          // Send Email Verfication
          host = req.get('host');
          link = "http://" + req.get('host') + "/verify?id=" + newUser.id;
          // setup e-mail data with unicode symbols
          mailOptions = {
            from: 'Nextplayers 👥 <contacto@nextplayers.mx>', // sender address
            to: newUser.email, // list of receivers
            subject: 'Hola Por favor confirma tu email ✔', // Subject line
            html: 'Hola,<br> Da click en el siguiente link para validar tu email.<br><a href="' + link + '">Click para validar</a>' // html body
          };
          smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
              console.log("Email error for:" + newUser.email);
            }
          });
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

  verify: function(req, res) {
    // Try to look up user using the provided email address
    User.findOne({
      id: req.param('id')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user || user === undefined) return res.notFound();
      user.email_verification = true;
      user.save(function(error) {
        if (error) res.json(500);
        res.redirect('/login');
      });
    });
  },

  forgot: function(req, res) {
    // Using async for better organization on promises
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({
          email: req.param("email")
        }, function(err, user) {
          if (!user || err || user === undefined) {
            res.json(500);
            return;
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        // Send Email Verfication
        host = req.get('host');
        link = "http://" + req.get('host') + "/reset/" + token;
        // setup e-mail data with unicode symbols
        mailOptions = {
          from: 'Nextplayers 👥 <contacto@nextplayers.mx>', // sender address
          to: user.email, // list of receivers
          subject: 'Password reset ✔', // Subject line
          html: 'Hola, tu estas recibiendo este email debido a que tu o alguien mas ha realizado una peticion para' +
            'cambio de tu password,</br> Por favor da click en el siguiente link para completar el proceso </br> <a href="' + link + '">Click para validar</a> </br>' +
            'Si tu no realizaste esta peticion porfavor haz caso omiso de este correo.'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          // req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) res.json(500);
      res.ok();
    });
  },

  getReset: function(req, res) {
    // Reset Password
    var token = req.param("token");
    // Use native Mongo Query
    User.native(function(err, collection) {
      if (err) return res.serverError(err);
      collection.find({
        resetPasswordToken: token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      }).toArray(function(err, result) {
        if (err || result === undefined || result.length == 0) return res.view('500');
        return res.view('reset', {
          message: {
            token: token
          }
        }); // end return
      });
    });
  },

  reset: function(req, res) {
    // Reset Password
    var token = req.param("token");
    // Using async for better organization on promises
    async.waterfall([
      function(done) {
        // Use native Mongo Query
        User.native(function(err, collection) {
          if (err) return res.serverError(err);
          collection.find({
            resetPasswordToken: token,
            resetPasswordExpires: {
              $gt: Date.now()
            }
          }).toArray(function(err, results) {
            if (err || results === undefined || results.length == 0) res.json(500);
            // Encrypt a string using the BCrypt algorithm.
            Passwords.encryptPassword({
              password: req.param('password'),
              difficulty: 10,
            }).exec({
              // An unexpected error occurred.
              error: function(err) {
                res.json(500);
              },
              // OK. Update Password
              success: function(encryptedPassword) {
                var user = results[0];
                User.findOne({
                  id: user._id.toString()
                }).exec(function findOneCB(err, userDB) {
                  userDB.encryptedPassword = encryptedPassword;
                  userDB.resetPasswordToken = null;
                  userDB.resetPasswordExpires = null;
                  // Update Info
                  userDB.save(function(error) {
                    if (error) res.json(500);
                    done(err, userDB);
                  });
                });
              }
            }); // end encryption
          });
        }); // native function
      },
      function(user, done) {
        // Send Email Verfication
        host = req.get('host');
        link = "http://" + req.get('host') + "/reset/" + token;
        // setup e-mail data with unicode symbols
        mailOptions = {
          from: 'Nextplayers 👥 <contacto@nextplayers.mx>', // sender address
          to: user.email, // list of receivers
          subject: 'Password reset ✔', // Subject line
          html: 'Hola, tu password ha sido cambiado exitosamente.'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) res.json(500);
      res.ok();
    });
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
        var basicKeys = ["name", "lastname", "state", "country", "born", "phone",
          "email", "profile_photo", "job", "tutor_name", "tutor_email", "tutor_model"
        ];
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

  getTeams: function(req, res) {
    // bootstrapping basic user data in the HTML sent from the server
    User.native(function(err, collection) {
      if (err) return res.serverError(err);
      collection.find({
        role: "organization",
        email_verification: true,
        profile_photo: {
          $exists: true
        },
        "details.about": {
          $exists: true
        },
        "details.organization_name": {
          $exists: true
        }
      }, {
        _id: 1,
        "details.organization_name": 1,
        profile_photo: 1
      }).toArray(function(err, results) {
        if (err) return res.serverError(err);
        return res.ok(results);
      });
    });
  }, // End home page

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
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        var galleryInfo = {
          role: userDB.role,
          status: 0,
          gallery: [],
          videos: []
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

  getAchivements: function(req, res) {
    var user = req.param("user");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        if (userDB.details.achivements !== undefined) {
          res.json({
            "achivements": userDB.details.achivements
          });
        } else {
          res.json({});
        }
      }
    });
  },

  getStaff: function(req, res) {
    var user = new ObjectId(req.param("user"));
    // Get user
    User.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.find({
        _id: user
      }, {
        _id: 0,
        "details.staff": 1
      }).toArray(function(err, results) {
        if (err) return res.serverError(err);
        if (results.length > 0) {
          return res.ok(results[0].details.staff);
        } else {
          return res.ok([]);
        }
      });
    });
  },

  getAccessOrg: function(req, res) {
    var user = new ObjectId(req.param("user"));
    // Get user
    User.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.find({
        _id: user
      }, {
        _id: 0,
        "details.access": 1
      }).toArray(function(err, results) {
        if (err) return res.serverError(err);
        if (results.length > 0) {
          return res.ok(results[0].details.access);
        } else {
          return res.ok([]);
        }
      });
    });
  },

  logoutRecruiter: function(req, res) {
    var user = req.param("user");
    var session = req.param("session");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        userDB.details.access[session].active = undefined; // 1 hour;
        userDB.details.access[session].status = 0;
        userDB.save(function(error) {
          // Either send a 200 OK or redirect to the home page
          return res.backToHomePage();
        });
      }
    });
  },

  // Search Function
  userFilters: function(req, res) {
    var search = req.param("search");
    var skip = req.param("skip");
    var age_flag = false;
    // Init data search
    var data = {
      email_verification: true,
      name: {
        $exists: true
      },
      lastname: {
        $exists: true
      },
      born: {
        $exists: true
      },
      profile_photo: {
        $exists: true
      },
      $or: [{
        role: "player"
      }, {
        role: "coach"
      }]
    };
    // Chage data
    if (search.model !== undefined) {
      delete data.$or;
      data.role = search.model;
    }
    search.sport !== undefined ? data["sport.title"] = search.sport : false;
    if (search.age !== undefined) {
      age_flag = true;
      var year = ((new Date()).getFullYear() - 1) - search.age;
      var start = moment([year, 1 - 1]).toISOString();
      var nextYear = moment([year + 2, 1 - 1]).toISOString();
      var end = moment(nextYear).endOf('year').toISOString();
      data["born"] = {
        $gte: start,
        $lt: end
      };
    }
    var rangeHeight = search.range.height;
    rangeHeight !== undefined ? data["sport.height"] = {
      $gte: rangeHeight.$gte,
      $lte: rangeHeight.$lte
    } : false;
    var rangeWeight = search.range.weight;
    rangeWeight !== undefined ? data["sport.weight"] = {
      $gte: rangeWeight.$gte,
      $lte: rangeWeight.$lte
    } : false;
    // Query
    User.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.find(data, {
        name: 1,
        lastname: 1,
        "sport.title": 1,
        profile_photo: 1,
        role: 1,
        state: 1,
        "sport.height": 1,
        "sport.weight": 1,
        born: 1
      }).skip(skip).limit(10).sort({
        "membership.level": -1
      }).toArray(function(err, results) {
        if (err) return res.serverError(err);
        if (results.length > 0 && age_flag) {
          var filter = [];
          for (var i = 0; i < results.length; i++) {
            if (getAge(results[i].born) == search.age) {
              filter.push(results[i]);
            }
          }
          return res.ok(filter);
        } // end age filter
        return res.ok(results);
      });
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
      if (err || userDB === undefined) res.json(500);
      else {
        // Delete not required key
        if (sport.position) delete sport.position;
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

  achivements: function(req, res) {
    var user = req.param("user");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        userDB.details.achivements = [];
        userDB.details.achivements = req.param("achivements");
        userDB.save(function(error) {
          if (error) res.json(500);
          res.json(201);
        });
      }
    });
  },

  staff: function(req, res) {
    var user = req.param("user");
    var staffList = req.param("staff");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        if (userDB.details.staff === undefined) userDB.details.staff = [];
        for (var i = 0; i < staffList.length; i++) {
          var absolutePath = process.cwd();
          var deletePath = process.cwd();
          var path = '/assets/uploads/';
          var staff = staffList[i];
          if (staff.file_photo != "") {
            if (staff["file_photo"].status == 1) {
              // Create Image Path
              path += moment().toISOString().replace(/[^a-zA-Z0-9]/g, '') + ".jpg";
              absolutePath += path;
              // Create Image File
              fs.writeFile(absolutePath, staff["file_photo"].file, 'base64', function(err) {
                if (err) return res.json(500);
              });
            } else if (staff["file_photo"].status == 0) {
              path = staff["file_photo"].file;
            }
          } else {
            path = "";
          }

          // Update on DB
          if (userDB.details.staff === undefined) userDB.details.staff = [];
          // Insert
          var staffObject = {
            name: staff.name,
            position: staff.position,
            sport: staff.sport,
            path: path
          };
          if (staff.array_pos === undefined || staff.array_pos == null) {
            userDB.details.staff.push(staffObject);
          } else { // Update
            var specificFile = userDB.details.staff[staff.array_pos].path;
            deletePath += specificFile;
            var currentStaff = userDB.details.staff;
            currentStaff[staff.array_pos] = staffObject;
            // Delete File
            if (specificFile != "" && staff["file_photo"].status != 0) {
              // Remove physical file from directory
              fs.unlink(deletePath, (err) => {
                if (err) return res.json(500);
              });
            }
          }
        }
        userDB.save(function(error) {
          if (error) res.json(500);
          res.json(201);
        });
      }
    });
  },

  accessOrg: function(req, res) {
    var user = req.param("user");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        userDB.details.access = [];
        userDB.details.access = req.param("access");
        userDB.save(function(error) {
          if (error) res.json(500);
          res.json(201);
        });
      }
    });
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

  // Video Socket
  updateVideoSocket: function(req, res) {
    var user = req.param("user");
    // Get user and update info
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        // Publish video creation if it is a player with membership
        if (userDB.membership !== undefined && Object.keys(userDB.membership).length > 0 && userDB.role == "player") {
          // Get UNIX timestamp for now
          var currentDate = Math.floor(Date.now() / 1000);
          if (userDB.membership.transaction_date <= currentDate) {
            User.publishCreate({
              id: userDB.id
            }, req);
          }
        }
      }
    });
  },

  uploadImage: function(req, res) {
    var model = req.param('model');
    var user = req.param("user");
    var photo = req.file('file');
    // Using async for better organization on promises
    async.waterfall([
      function(done) {
        photo.upload({
          dirname: process.cwd() + '/assets/uploads/'
        }, function whenDone(err, uploadedFiles) {
          // // If no files were uploaded, respond with an error.
          if (uploadedFiles.length === 0) {
            err = true;
          }
          done(err, uploadedFiles);
        });
      },
      function(uploadedFiles, done) {
        // Get user and update info
        User.findOne({
          id: user
        }).exec(function findOneCB(err, userDB) {
          if (err || userDB === undefined) {
            res.json(500);
          } else {
            // Image path
            var phrase = uploadedFiles[0].fd;
            var myRegexp = /\/assets\/uploads\/(.*)/;
            var match = myRegexp.exec(phrase);
            // Check image model
            if (model == "gallery") {
              var position = req.param("position");
              if (userDB.details.gallery === undefined) userDB.details.gallery = [];
              userDB.details.gallery[position] = match[0];
            } else if (model == "profile") {
              userDB.profile_photo = match[0];
            }
            userDB.save(function(error) {
              done(err, 'done');
            });
          }
        });
      }
    ], function(err) {
      if (err) res.json(500);
      res.ok(201);
    });
  },

  // Update Inner Session
  updateSession: function(req, res) {
    var user = req.param("user");
    var session = req.param("session");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        userDB.details.access[session].active = Date.now() + 480000; // 8 min;
        userDB.details.access[session].status = 1;
        userDB.save(function(error) {
          if (error) res.json(500);
          res.json(201);
        });
      }
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
              if (err) res.json(500);
              // asynchronously called
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
        console.log(path);
        if (photo.model == "gallery") {
          var position = photo.position;
          path += userDB.details.gallery[position];
          userDB.details.gallery[position] = undefined;
        } else if (photo.model == "profile") {
          path += userDB.profile_photo;
          userDB.profile_photo = undefined;
        }
        // Remove physical file from directory
        fs.unlink(path, (err) => {
          console.log(err);
          if (err) throw res.json(500);
          userDB.save(function(error) {
            if (error) res.json(500);
            res.json(201);
          });
        });
      }
    });
  },

  // Remove Staff
  achivementDelete: function(req, res) {
    var user = req.param("user");
    var position = req.param("position");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        userDB.details.achivements.splice(position, 1);
        userDB.save(function(error) {
          if (error) res.json(500);
          res.json(201);
        });
      }
    });
  },

  // Remove Staff
  staffDelete: function(req, res) {
    var user = req.param("user");
    var position = req.param("position");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        var specificFile = process.cwd() + userDB.details.staff[position].path;
        userDB.details.staff.splice(position, 1);
        // Delete File
        // Remove physical file from directory
        fs.unlink(specificFile, (err) => {
          if (err) return res.json(500);
          userDB.save(function(error) {
            if (error) res.json(500);
            res.json(201);
          });
        });
      }
    });
  },
  // Remove Access Org
  accessOrgDelete: function(req, res) {
    var user = req.param("user");
    var position = req.param("position");
    // Get user
    User.findOne({
      id: user
    }).exec(function findOneCB(err, userDB) {
      if (err || userDB === undefined) res.json(500);
      else {
        userDB.details.access.splice(position, 1);
        userDB.save(function(error) {
          if (error) res.json(500);
          res.json(201);
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

function getAge(date) {
  var today = new Date();
  var birthDate = new Date(date);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
