/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ObjectId = require('mongodb').ObjectID;
module.exports = {
  showHomePage: function(req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('index');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('index');
      }

      var data = {
        id: user.id
      };
      var route = '';

      if (user.role == "player") {
        route = 'dashboard';
      } else if (user.role == "coach") {
        route = 'dashboardCoach';
      } else if (user.role == "organization") {
        if (user.membership !== undefined) {
          // Get UNIX timestamp for now
          var currentDate = Math.floor(Date.now() / 1000);
          if (user.membership.transaction_date <= currentDate) {
            route = 'dashboardOrganization';
          } else {
            route = "paymentOrganization";
          }
        }

      }
      return res.view(route, {
        message: data
      });
    });
  }, // End home page

  showProfile: function(req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('index');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('index');
      }

      var userId = req.param("id");
      User.findOne({
        id: userId
      }).exec(function findOneCB(err, userDB) {
        var route = "";
        if (userDB.role == "player") {
          route = "previewPlayer";
        } else if (userDB.role == "coach") {
          route = "previewCoach";
        } else if (userDB.role == "organization") {
          route = "teamPreview";
        }
        var data = {
          message: {
            id: user.id,
            preview_id: userId
          }
        };
        var session = req.param("session");
        if (session !== undefined) {
          // Get info about followers
          User.native(function(err, collection) {
            if (err) return res.serverError(500);
            collection.find({
              _id: new ObjectId(user.id)
            }, {
              "details.access" : 1
            }).toArray(function(err, results) {
              if (err) return res.serverError(err);
              var access = results[0].details.access;
              if(access.length > 0 && access[session] !== undefined && access[session].status == 1 && access[session].active >= Date.now()) {
                data.message.session = session;
                data.message.recruiter_name = access[session].name;
                return res.view(route, data);
              } else {
                return res.backToHomePage();
              }
            });
          });
        }
        else {
          return res.view(route, data); // end return
        }
      });
    });
  }, // End home page

  showInnerHome: function(req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('index');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('index');
      }

      if (user.role == "player" || user.role == "coach") {
        route = "homePlayerCoach";
      } else {
        if (user.membership !== undefined) {
          // Get UNIX timestamp for now
          var currentDate = Math.floor(Date.now() / 1000);
          if (user.membership.transaction_date <= currentDate) {
            route = "homeUniversity";
          } else {
            route = "paymentOrganization";
          }
        }

      }
      return res.view(route, {
        message: {
          id: user.id
        }
      });
    });
  }, // End home page

  showSearchPage: function(req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('index');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      var session = req.param("session");
      if (!user || user.role != "organization" || session === undefined) {
        return res.backToHomePage();
      }
      var currentSession = user.details.access[session];
      if(currentSession === undefined || currentSession.active < Date.now() ||
         currentSession.status == 0) return res.backToHomePage();

      if (user.membership !== undefined) {
        // Get UNIX timestamp for now
        var currentDate = Math.floor(Date.now() / 1000);
        if (user.membership.transaction_date <= currentDate) {
          route = "search";
        } else {
          route = "paymentOrganization";
        }
      }
      return res.view(route, {
        message: {
          id: user.id,
          session: session
        }
      });
    });
  }, // End search page
};
