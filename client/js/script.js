var app = angular.module('app', ['ngRoute', 'ngCookies']); 

//all your views
app.config(function ($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: '/partials/login.html',
        resolve: {
			factory: user_cookie
		} 
    })
    .when('/dashboard', {
        templateUrl: '/partials/main.html',
        resolve: {
			factory: user_cookie
		} 
    })
    .when('/newappointment', {
        templateUrl: '/partials/newappointment.html',
        resolve: {
			factory: user_cookie
		} 
    })
    .when('/logout',
        {
          redirectTo: '/',
			resolve: {
				factory: logout
			} 
        })
    .otherwise({
        redirectTo: '/dashboard'
    })
});

var user_cookie = function ($cookieStore, $location) {
	if (!$cookieStore.get('user')) {
		$location.path('/')
	}
}



var logout = function ($cookieStore) {
	$cookieStore.remove('user');
}


app.factory('AppointmentFactory', function ($http) {

	var factory = {};
	var users = [];
	var appointments = [];

	factory.getUsers = function(callback) {
		$http.get('/users').success(function(output){
			users=output;
			callback(users);
		});
		
	}

	factory.addUsers = function(info, callback) { 
		$http.post('/adduser', info).success(function(output){
			users = output;
      		callback(users);
		});
	}

	factory.getAppts = function(callback) {
		$http.get('/getAppts').success(function(output) {
			appointments = output;
			callback(appointments);
		});
	}

	factory.addAppt = function(info, callback) {
		console.log(1);
		$http.post('/addAppt', info).success(function(output) {
			console.log(2);
			console.log(output);
			if('error' in output){
				alert(output.error);
			}
			callback(appointments);
		});
	}

	factory.removeAppointment = function(info, callback) {
		console.log("remove");
		$http.post('/removeAppointment', info).success(function(output) {
			callback(appointments);
		});
	}

	return factory;

});


app.controller('UserController', function ($scope, $cookieStore, $location, AppointmentFactory) {

	$scope.users=[];

	AppointmentFactory.getUsers(function(data){
		$scope.users = data;
	});



	$scope.addUser = function() {
		for (var i=0; i < $scope.users.length; i++){
			if ($scope.newUser.name == $scope.users[i].name){
				$cookieStore.put('user', $scope.newUser.name);
				$scope.newUser = {};
				$location.path('#/dashboard');
				return
			}
		}
		$cookieStore.put('user', $scope.newUser.name);
		AppointmentFactory.addUsers($scope.newUser, function(data){
			$scope.users = data;
		})
			$scope.newUser = {};
			$location.path('#/dashboard');
	}


});
app.controller('AppointmentController', function ($scope, $cookieStore, $location, AppointmentFactory) {

	$scope.users=[];
	$scope.appointments=[];

	$scope.date = new Date();

	$scope.loggedUser=$cookieStore.get('user');

	$scope.sortAppointments = function (value) {
        var todaysDate = new Date();
        var appointmentDate = new Date(value.date);
        return appointmentDate >= todaysDate;
    };


	AppointmentFactory.getAppts(function(data) {
		$scope.appointments = data;
	});

	$scope.addAppt = function() {
		$scope.newAppointment.patient = $scope.loggedUser;
		AppointmentFactory.addAppt($scope.newAppointment, function() {
			AppointmentFactory.getAppts(function(data) {
				$scope.appointments = data;
			});
			$scope.newAppointment = {};
	    });    
	}

	$scope.removeAppointment = function(appointment) {
       	var appointmentDate = new Date(appointment.date);
       	var one_day = Math.floor((appointmentDate.getTime() - $scope.date.getTime())/(1000*60*60*24));
       	if (one_day > 1){
       		AppointmentFactory.removeAppointment(appointment, function() {
				AppointmentFactory.getAppts(function(data) {
					$scope.appointments = data;
				});
	    	});
	    	$location.path('#/dashboard')
       	} else {
       		alert("You can't cancel 1 day before this appointment");
       	}
	}

});
