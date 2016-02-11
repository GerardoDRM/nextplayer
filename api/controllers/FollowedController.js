/**
 * FollowedController
 *
 * @description :: Server-side logic for managing followeds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ObjectId = require('mongodb').ObjectID;
module.exports = {
	followed: function(req, res) {
    var user = new ObjectId(req.param("user"));
    var followed = new ObjectId(req.param("followed"));

    Followed.findOne({
      user_id: user,
    }, function foundUser(err, userDB) {
      if (err) return res.negotiate(err);
      if (!userDB) {
				var data = {
					"user_id": user,
					"followed":[followed]
				};
        Followed.create(data, function createCB(err, newFollowed) {
          if (err) res.json(500);
					res.ok(201);
        });
      } else {
				// Update Info
				if (userDB.followed.indexOf(followed) == -1) {
					userDB.followed.push(followed);
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

	getFollowed: function(req, res) {
    var user = new ObjectId(req.param("id"));
    Followed.native(function(err, collection) {
			if (err) return res.serverError(500);
			collection.find({user_id:user}, {
				_id: 0,
				user_id: 0
			}).toArray(function(err, results) {
				if (err) return res.serverError(err);
				if(results !== undefined && results.length > 0) {
					// Get all Followers IDs
					var followersList = [];
					followersList = results[0].followed;
					// Get info about followers
					User.native(function(err, collection) {
						if (err) return res.serverError(500);
						collection.find({_id: {$in: followersList}}, {
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
