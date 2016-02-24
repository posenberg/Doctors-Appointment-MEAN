var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment')

module.exports = (function()  {
	return {
		show: function(req, res) {
			Appointment.find({}, function(err, results) {
				if(err) {
					console.log(err);
				}
				else{
					res.json(results);
				}
			});
		},

		create: function(req, res) {
			Appointment.count({date: req.body.date}, function(err, count){
				if(count >= 3){
					res.json({error: "This day is full. Please schedule for another day."});
				}
				else{
					Appointment.count({
							date: req.body.date, 
							patient: req.body.patient
						}, function(err, count){
							if(count >= 1){
								res.json({error: "You can't schedule an appointment on the same day."});
							}
							else{
								var appointment = new Appointment({
									date: req.body.date, 
									time: req.body.time, 
									patient: req.body.patient, 
									complaint: req.body.complaint
								});
								appointment.save(appointment);
							}
					});
				}
			});
			
		},
		destroy: function(req, res) {
			Appointment.remove({_id: req.body._id}, function(err){
		    	if(err){
			        console.log("cannot remove");
			    } else {
			    	res.redirect('#/dashboard');
			    }
		    })
		}   
	}
})();