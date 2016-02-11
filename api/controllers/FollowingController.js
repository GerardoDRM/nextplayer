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

    Following.findOne({
      user_id: user,
    }, function foundUser(err, userDB) {
      if (err) return res.json(500);
      if (!userDB) {
				var data = {
					"user_id": user,
					"following":[following]
				};
        Following.create(data, function createCB(err, newFollowing) {
          if (err) res.json(500);
					res.ok(201);
        });
      } else {
				// Update Info
				if (userDB.following.indexOf(following) == -1) {
					userDB.following.push(following);
	        userDB.save(function(error) {
	          if (error) res.json(500);
						res.ok(201);
	        });
				} else {
          res.ok(201);
        }
			}
    });
  },

  getFollowing: function(req, res) {
    var user = new ObjectId(req.param("id"));
    Following.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.find({user_id:user}, {
        _id: 0,
        user_id: 0
      }).toArray(function(err, results) {
        if (err) return res.serverError(err);
        if(results !== undefined && results.length > 0) {
          // Get all Followers IDs
          var followingList = [];
          followingList = results[0].following;
          // Get info about followers
          User.native(function(err, collection) {
            if (err) return res.serverError(500);
            collection.find({_id: {$in: followingList}}, {
              state:1,
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
