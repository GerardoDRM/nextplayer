/**
 * FollowingController
 *
 * @description :: Server-side logic for managing followings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ObjectId = require('mongodb').ObjectID;
module.exports = {

  following: function(req, res) {
    var user = new ObjectId(req.param("user"));
    var following = new ObjectId(req.param("following"));
    // Orgs have this param
    var recruiter = req.param("recruiter");
    Following.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.find({
        user_id: user
      }).toArray(function(err, results) {
        if (err) return res.serverError(500);
        if (results !== undefined && results.length > 0) {
          // Get all Followers IDs
          var followingList = [];
          var objects = results[0].following;
          var newFollow;
          // Check if user is an org
          if (recruiter !== undefined) {
            for (var i = 0; i < objects.length; i++) {
              followingList[i] = objects[i].id.toString();
            }
            newFollow = {
              id: following,
              name: recruiter
            };
          } else {
            for (var i = 0; i < objects.length; i++) {
              followingList[i] = objects[i].toString();
            }
            newFollow = following;
          }
          // Update Info
          if (followingList.indexOf(following.toString()) == -1) {
            collection.update({
                user_id: user
              }, {
                $push: {
                  following: newFollow
                }
              },
              function(err) {
                if (err) res.json(500);
                res.json(201);
              });
          } else {
            res.ok(201);
          }
        } else {
          var newFollow;
          // Check if user is an org
          if (recruiter !== undefined) {
            newFollow = {
              id: following,
              name: recruiter
            };
          } else {
            newFollow = following;
          }
          var data = {
            "user_id": user,
            "following": [newFollow]
          };

          Following.create(data, function createCB(err, newFollowing) {
            if (err) res.json(500);
            res.ok(201);
          });
        }
      });
    });
  },

  getFollowing: function(req, res) {
    var user = new ObjectId(req.param("id"));
    Following.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.find({
        user_id: user
      }, {
        _id: 0,
        user_id: 0
      }).toArray(function(err, results) {
        if (err) return res.serverError(err);
        if (results !== undefined && results.length > 0) {
          // Get all Followers IDs
          var followingList = [];
          var follow = results[0].following;
          var flag_org = false;
          if (follow.length > 0 && ("name" in follow[0] || "coment" in follow[0])) {
            for (var i = 0; i < follow.length; i++) {
              followingList[i] = follow[i].id;
            }
            flag_org = true;
          } else {
            followingList = results[0].following;
          }
          // Get info about followers
          User.native(function(err, collection) {
            if (err) return res.serverError(500);
            collection.find({
              _id: {
                $in: followingList
              },
              email_verification: true
            }, {
              state: 1,
              name: 1,
              "details.organization_name": 1,
              profile_photo: 1,
              lastname: 1,
              "sport.title": 1,
              role: 1
            }).toArray(function(err, results) {
              if (err) return res.serverError(err);
              // Add info required by organizations
              if (flag_org) {
                for (var i = 0; i < results.length; i++) {
                  results[i].recruiter = follow[i].name;
                  results[i].comment = follow[i].comment;
                }
              }
              return res.ok(results);
            });
          });
        } else {
          return res.ok(results);
        }
      });
    });
  },

  comments: function(req, res) {
    var user = new ObjectId(req.param("user"));
    var roster = new ObjectId(req.param("roster"));
    var comment = req.param("comment");
    Following.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.update({
          user_id: user,
          "following.id": roster

        }, {
          $set: {
            "following.$.comment": comment
          }
        },
        function(err) {
          if (err) res.json(500);
          res.json(201);
        });
    });
  },

  removeFollowing: function(req, res) {
    var user = new ObjectId(req.param("user"));
    var following = new ObjectId(req.param("following"));

    Following.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.update({
          user_id: user
        }, {
          $pull: {
            following: {
              id: following
            }
          }
        },
        function(err) {
          if (err) res.json(500);
          res.json(201);
        });
    });
  }
};
