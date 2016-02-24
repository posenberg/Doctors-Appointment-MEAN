//import your controllers
// Example: 
var users = require('../controllers/users.js');
var appointments = require('../controllers/appointments.js')

module.exports = function(app){

	app.get('/users', function (req, res) {
		console.log('/users route');
		users.show(req, res);
    });

	app.post('/adduser', function (req, res){
		console.log("add user route");
		users.create(req,res);
	});

	app.get('/getAppts', function(req, res){
		appointments.show(req, res);
	});

	app.post('/addAppt', function(req, res){
		appointments.create(req, res);
	});

	app.post('/removeAppointment', function(req, res){
		appointments.destroy(req, res);
	});
	
}

