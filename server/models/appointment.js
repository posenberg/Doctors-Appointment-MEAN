var mongoose = require('mongoose');

var Schema = mongoose.Schmea;

var AppointmentSchema = new mongoose.Schema({
	date: String,
	time: String,
	patient: String,
	complaint: String,
});

var Appointment = mongoose.model('Appointment', AppointmentSchema);
