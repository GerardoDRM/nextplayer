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
          for(var i=0; i < objects.length; i++) {
            followingList[i] = objects[i].toString();
          }
          // Update Info
          if (followingList.indexOf(following.toString()) == -1) {
            collection.update({
                user_id: user
              }, {
                $push: {
                  following: following
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
          var data = {
            "user_id": user,
            "following": [following]
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
          followingList = results[0].following;
          // Get info about followers
          User.native(function(err, collection) {
            if (err) return res.serverError(500);
            collection.find({
              _id: {
                $in: followingList
              }
            }, {
              state: 1,
              name: 1,
              "details.organization_name": 1,
              profile_photo: 1,
              lastname: 1,
              "sport.title": 1
            }).toArray(function(err, results) {
              if (err) return res.serverError(err);
              return res.ok(results);
            });
          });
        } else {
          return res.ok(results);
        }
      });
    });
  }

};
