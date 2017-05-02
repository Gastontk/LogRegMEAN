console.log('loading app.js (angular config)')


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
	var users = {}
	var factory= {}
	users = [
		{email: 'gastontk@hotmail.com', first_name: 'Gaston', last_name: 'Kennedy', password: 'abcdabcd', password_confirmation: 'abcdabcd', birthday: "1970-04-08"},
		{email: 'jim@hotmail.com', first_name: 'jim', last_name: 'smith', password: 'abcdabcd', password_confirmation: 'abcdabcd', birthday: "1970-04-08"},
		{email: 'kate@hotmail.com', first_name: 'kate', last_name: 'nunex', password: 'abcdabcd', password_confirmation: 'abcdabcd', birthday: "1972-03-26"},

	]
	console.log('users')
	factory.index= function(callback){
		console.log('In factory.index, about to run callback');
		callback(users);
	}
	factory.register = function($scope, callback){
		console.log('supplied email is', $scope.newReg.email)
		for(x in users){
			console.log('comparison emails are', users[x].email, $scope.newReg.email);
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
		}

	}
	factory.login = function($scope){
		console.log('In factory login', $scope.logIn);
		for(x in users){
			if(users[x].email == $scope.logIn.email && users[x].password == $scope.logIn.password){
				console.log('found a user', users[x].first_name, 'with a password of ', users[x].password);
				$scope.loggedIn = true;
			}else{
				console.log(users[x].email ,'Does not match', $scope.logIn.email )
				console.log('Or', users[x].password, 'does not match', $scope.logIn.password)
			}
		}
		// $scope.loginError = 'Failure on login';

	}


	return factory;


}])

app.controller('loginController', ['$routeParams', '$scope', 'userFactory', '$location', function($routeParams, $scope, userFactory, $location){
	userFactory.index(function(data){
		$scope.users = data;
		console.log('$scope.users is now:', $scope.users);
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
	}
	$scope.logout = function(){
		console.log('Attempting logout');
		$scope.loggedIn = false
		$scope.genError = 'You Have Been Logged Out';
		setTimeout(function(){
			delete $scope.genError;
			$scope.$apply()
			// alert($scope.passwordsDontMatch);
		}, 2000);


	}
	



;

}])