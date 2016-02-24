var mongoose = require('mongoose');
var User = mongoose.model('User')

module.exports = (function()  {
	return {
		show: function(req, res) {
			User.find({}, function(err,results){
				if (err){
					res.json(err);
				} else {
					console.log('success' + results);
					res.json(results);
				}
			})
		},

		create: function (req, res) {
			console.log('here');
			var user = new User({name: req.body.name});
			user.save(function (err, results) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(results);
					
				}
			})
		},
		//  userDelete: function(req,res){
		//  	console.log("userdelete");
		//         User.remove({_id: req.body._id}, function (err, results){
		//         console.log('ID'  + req.body._id +req.body.name); // returns id number
		//         if(err) {
		//           console.log('ERR' + err);
		//         } else {
		//           res.redirect('/users'); // pass it to friends because that is where our restful API lives!
		//         }
		//      })
		// },
     
	}
})();