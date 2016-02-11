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

      var data = {
        id: user.id
      };
      var route = '';

      if (user.role == "player") {
        route = 'dashboard';
      } else if (user.role == "coach"){
        route = 'dashboardCoach';
      }  else if (user.role == "organization"){
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
        return res.view(route, {
          message: {
            id: user.id,
            preview_id: userId

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
};
