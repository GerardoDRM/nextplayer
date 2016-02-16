/**
 * RoomsController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var ObjectId = require('mongodb').ObjectID;

module.exports = {

  addRoom: function(req, res) {
    var user1 = req.param("org");
    var user2 = req.param("user");
    // Retrieve an existing room
    Rooms.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.find({
        $or:[
					{$and: [{org_id: user1},{user_id: user2}]},
					{$and: [{org_id: user2},{user_id: user1}]}
			]
      }, {
        messages: 1
      }).toArray(function(err, results) {
        if (err) return res.serverError(500);
        if (results !== undefined && results.length > 0) {
          return res.ok(results);
        } else {
          // Create a new Room
          var data = {
            "user_id": user,
            "org_id": org,
            "messages": []
          };
          Rooms.create(data, function createCB(err, newRoom) {
            if (err) res.json(500);
            res.ok(201);
          });
        }
      });
    });
  },

  subscribeToMessages: function(req, res) {
    User.findOne({
      id: req.param('id')
    }, function foundUser(err, user) {
      if (err) return res.json({
        status: 500
      });
      // subscribe user in order to get messages from rooms
      User.subscribe(req, user, 'message');
      res.json({
        status: 201
      });
    });
  },

  privateMessage: function(req, res) {
    var user1 = req.param('to');
    var user2 = req.param('id');
    var message = req.param('msg');
    User.findOne({
      id: user2
    }, function foundUser(err, userDB) {
      if (err) return res.json({
        status: 500
      });
      User.message(user1, {
        from: userDB.id,
        msg: message
      });
      // Retrieve an existing room
      Rooms.native(function(err, collection) {
        if (err) return res.serverError(500);
        collection.update({
					$or:[
						{$and: [{org_id: user1},{user_id: user2}]},
						{$and: [{org_id: user2},{user_id: user1}]}
				]
          }, {
            $push: {
              messages: {
                id: userDB.id,
                content: message
              }
            }
          },
          function(err) {
            if (err) res.json({
              status: 500
            });
            res.ok();
          });
      });

    });
  },

  getInbox: function(req, res) {
    var user = req.param('user');
    // Retrieve an existing room
    Rooms.native(function(err, collection) {
      if (err) return res.serverError(500);
      collection.find({
        $or: [{
          org_id: user
        }, {
          user_id: user
        }]
      }).toArray(function(err, results) {
        if (err) return res.serverError(500);
        if (results !== undefined && results.length > 0) {
          var contactsList = [];
          for (var i = 0; i < results.length; i++) {
            if (results[i].org_id != user) {
              contactsList[i] = new ObjectId(results[i].org_id);
            } else if (results[i].user_id != user) {
              contactsList[i] = new ObjectId(results[i].user_id);
            }
          }
          User.native(function(err, collection) {
            if (err) return res.serverError(500);
            collection.find({
              _id: {
                $in: contactsList
              }
            }, {
              name: 1,
              "details.organization_name": 1,
              profile_photo: 1,
              lastname: 1
            }).toArray(function(err, results) {
              if (err) return res.serverError(500);
              return res.ok(results);
            });
          });
        } else {
          res.json(results);
        }
      }); // end rooms result
    }); // end native rooms
  }
};
