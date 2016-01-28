/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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

      if (user.role == "player") {
        return res.view('dashboard', {
          message: {
            id: user.id,
          }
        });
      } else {
        return res.view('dashboardCoach', {
          message: {
            id: user.id
          }
        });
      }
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
        } else {
          route = "previewCoach";
        }
        return res.view(route, {
          message: {
            id: userId
          }
        }); // end return
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
        route = "homeUniversity";
      }
      return res.view(route, {
        message: {
          id: user.id
        }
      });
    });
  }, // End home page
};
