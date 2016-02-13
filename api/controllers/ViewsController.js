/**
 * ViewsController
 *
 * @description :: Server-side logic for managing views
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var ObjectId = require('mongodb').ObjectID;
module.exports = {

	viewer: function(req, res) {
		var user = new ObjectId(req.param("user"));
		var viewer = new ObjectId(req.param("viewer"));

		Views.native(function(err, collection) {
			if (err) return res.serverError(500);
			collection.find({
				user_id: user
			}).toArray(function(err, results) {
				if (err) return res.serverError(500);
				if (results !== undefined && results.length > 0) {
					// Get all Followers IDs
					var viewerList = [];
					var objects = results[0].viewer;
					for(var i=0; i < objects.length; i++) {
						viewerList[i] = objects[i].toString();
					}
					// Update Info
					if (viewerList.indexOf(viewer.toString()) == -1) {
						collection.update({
								user_id: user
							}, {
								$push: {
									viewer: viewer
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
						"viewer":[viewer]
					};
					Views.create(data, function createCB(err, newViewer) {
						if (err) res.json(500);
						res.ok(201);
					});
				}
			});
		});
	},

	getViewers: function(req, res) {
		var user = new ObjectId(req.param("user"));
		Views.native(function(err, collection) {
			if (err) return res.serverError(500);
			collection.find({user_id:user}, {
				_id: 0,
				user_id: 0
			}).toArray(function(err, results) {
				if (err) return res.serverError(err);
				if(results !== undefined && results.length > 0) {
					// Get all Followers IDs
					var viewerList = [];
					viewerList = results[0].viewer;
					// Get info about followers
					User.native(function(err, collection) {
						if (err) return res.serverError(500);
						collection.find({_id: {$in: viewerList}}, {
							profile_photo: 1
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
