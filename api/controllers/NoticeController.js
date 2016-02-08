/**
 * NoticeController
 *
 * @description :: Server-side logic for managing notices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getAll: function(req, res) {
		Notice.native(function(err, collection) {
			if (err) return res.serverError(err);
			collection.find({}, {
				_id: 0
			}).toArray(function(err, results) {
				if (err) return res.serverError(err);
				return res.ok(results);
			});
		});
	}
};
