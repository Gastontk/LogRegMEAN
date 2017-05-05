console.log('loading app.js (angular config)')
// console.log('session is', session)


var app = angular.module('app', ['ngRoute', 'ngMessages']);
// app.config(function($routeProvider){
// 	$routeProvider
// 		.when('/login', {
// 			templateUrl: '/partials/login.html',
// 			controller: 'loginController'
// 		})
// 		.when('/register', {
// 			templateUrl: '/partials/register.html',
// 			controller: 'loginController'
// 		})
// 		.otherwise({
// 			templateUrl: '/partials/login.html',
// 			controller: 'loginController'
// 		})

// });


app.factory('userFactory', ['$http', function($http){
	var today = new Date();
	console.log('todays date is', today)
	var users
	var factory= {}
	// users = [
	// 	{email: 'gastontk@hotmail.com', first_name: 'Gaston', last_name: 'Kennedy', password: 'abcdabcd', password_confirmation: 'abcdabcd', birthday: "1970-04-08"},
	// 	{email: 'jim@hotmail.com', first_name: 'jim', last_name: 'smith', password: 'abcdabcd', password_confirmation: 'abcdabcd', birthday: "1970-04-08"},
	// 	{email: 'kate@hotmail.com', first_name: 'kate', last_name: 'nunex', password: 'abcdabcd', password_confirmation: 'abcdabcd', birthday: "1972-03-26"},

	// ]
	console.log('users')
	// factory.index= function(callback){
	// 	console.log('In factory.index, about to get users from server and then callback');
	// 	app.get('/users');
	// 	callback(users);
	// }


	factory.index = function(callback){
		$http.get('/users').then(function(data){
			console.log('data is', data.data);
			callback(data.data);
			users = data.data.users;
			console.log('users (data.data)', data.data)
			console.log(data.session)


			// console.log('compare', ships[0],' to data.data:', data.data[0]);
		});

	};
	factory.register = function($scope, callback){
		console.log('supplied email is', $scope.newReg.email)
		for(x in users){
			// console.log('comparison emails are', users[x].email, $scope.newReg.email);
			if (users[x].email == $scope.newReg.email) {
				console.log('email already registered');
				$scope.genError ='Email already registered!';
				setTimeout(function(){
					delete $scope.genError;
					$scope.$apply()
					// alert($scope.passwordsDontMatch);
				}, 2000);

				$scope.newReg.email ='';

				break;
			}

		};
		console.log('users before push are', users)
		// users.push($scope.newReg);
		$http.post('/users', $scope.newReg).then(function(response){
			console.log('registered user and server responded', response.data.data);
			$scope.users =response.data.data;

		}, function(response){
			console.log('Failed registration', response.data.data);
			$scope.users =response.data.data;
		});
		console.log('users are now', users);
		$scope.newReg ={}


	}
	factory.login = function($scope){
		console.log('In factory login', $scope.logIn);
		$http.post('/login', {data: $scope.logIn}).then(function(response){
			console.log('response from server after post login:', response.data.data.data.genError)
			// console.log('successful login', response, 'And the user is', response.data)
			$scope.currentUser= response.data.data.data.loggedInUser
			console.log('currentUser is: ', $scope.currentUser);
			if( typeof(response.data.data.data.genError) !== 'undefined' ){
				console.log('response.data.data.genError exists and is;',response.data.data.data.genError)
				// alert(response.data.genError);
				$scope.genError = response.data.data.data.genError;
				console.log('starting timeout', $scope.genError);
				setTimeout(function(){
					console.log('ending timeout');
					delete $scope.genError;
					$scope.$apply();
				}, 2000)
			}
			console.log(response);

			// alert(response.data.loggedInUser.first_name + ' Logged in.');

		}, function(response){
				console.log('Failed login', response.data.loggedIn)
			// alert('response: ' + response)
			})
	}
	factory.logout = function(callback){
		$http.get('logout');
		callback()

	}

	return factory;


}])

app.controller('loginController', ['$routeParams', '$scope', 'userFactory', '$location', function($routeParams, $scope, userFactory, $location){
	userFactory.index(function(data){
		if(typeof(data.users !==undefined)){
			$scope.users = data.users;


		}
		console.log('$scope.users is now:', $scope.users);
		console.log('in controller, response for data.data', data.genError)
		if( typeof(data.genError) !== 'undefined' ){
				// alert(response.data.genError);
				$scope.genError = data.genError;
				console.log('starting timeout')
				setTimeout(function(){
					console.log('ending timeout');
					delete $scope.genError;
					$scope.$apply();
				}, 2000)
			}
	})
	$scope.register = function(){
		if($scope.newReg.password != $scope.newReg.password_confirm){
			// alert($scope.newReg.password +' Passwords dont match!!! ' + $scope.newReg.password_confirm)
			$scope.passwordsDontMatch ='Passwords arent matching';
			setTimeout(function(){
				delete $scope.passwordsDontMatch;
				$scope.$apply()
				// alert($scope.passwordsDontMatch);
			}, 2000);

		}else{
			console.log('password ', $scope.newReg.password, 'matches', $scope.newReg.password_confirm);
			userFactory.register($scope, function(data){
				console.log('In scope callback inside factory', $scope.newReg.birthday);

			})
		}
	}
	$scope.login = function(){
		console.log('Attempting login', $scope.logIn);
		userFactory.login($scope);
		$scope.logIn = {};
	}
	$scope.logout = function(){
		var lastLoggedInUser = $scope.currentUser;
		console.log('Attempting logout');
		userFactory.logout(function(data){
			console.log('In callback');

			delete $scope.currentUser;

			$scope.genError = lastLoggedInUser.first_name + ' has been logged out';
			console.log($scope.genError)
			// $scope.$apply()
			setTimeout(function(){

				delete $scope.genError
				$scope.$apply();

			}, 2000)


		})


		// $scope.loggedIn = false
		// $scope.genError = 'You Have Been Logged Out';
		// setTimeout(function(){
		// 	delete $scope.genError;
		// 	$scope.$apply()
		// 	// alert($scope.passwordsDontMatch);
		// }, 2000);


	}
	



;

}])