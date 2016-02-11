/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var ObjectId = require('mongodb').ObjectID;
var moment = require('moment');

module.exports = {

  blog : function(req, res) {
    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('index');
    }
    return res.view('blog');
  },

  getPostByDate: function(req, res) {
    var year = parseInt(req.param("year"));
    var month = parseInt(req.param("month"));
    var start = moment([year, month - 1]);
    var end = moment(start).endOf('month');

    Blog.native(function(err, collection) {
      if (err) return res.serverError(err);
      collection.find({
				date: {
          $gte: start.toDate(),
          $lt: end.toDate()
        }
      }, {
        comments: 0
      }).toArray(function(err, results) {
        if (err) return res.serverError(err);
        return res.ok(results);
      });
    });
  },

  getPostComments: function(req, res) {
    var post = req.param("id");
    Blog.native(function(err, collection) {
      if (err) return res.serverError(err);
      collection.find({
        _id: new ObjectId(post)
      }, {
        _id: 0,
        comments: 1
      }).toArray(function(err, results) {
        if (err) return res.serverError(err);
        return res.ok(results[0].comments);
      });
    });
  },

  addComment: function(req, res) {
		var post = req.param("id");
    var comment = req.param("comment");
    Blog.findOne({
      id: post
    }).exec(function findOneCB(err, blogDB) {
      if (err || blogDB === undefined) res.json(500);
      else {
        // Get name author
        User.findOne(req.session.me, function(err, user) {
          if (err) {
            return res.negotiate(err);
          }
          var name = user.role == "organization" ? user.details.organization_name : user.name;
          var data = {
            "author": name,
            "content": comment.content
          };
          blogDB.comments.push(data);
          // Update Info
          blogDB.save(function(error) {
            if (error) {
              res.json(500);
            }
            res.ok(201);
          });
        }); // End find user
      }
    });
  }
};
