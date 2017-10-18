console.log('Loading controller users.js');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');


function usersController(){

	this.index = function(req, res){
		console.log('req.session', req.session)

		console.log('In usersController. ')
		// var testHash =bcrypt.hashSync('password', bcrypt.genSaltSync(8));
		// console.log(testHash);

		// User.find({}, ['first_name', 'last_name', 'email', 'birthday'], function(err, data){
		// 	if(err){console.log('Error getting users from DB', err)}
		// 	else{
		// 			res.json(data);	}

		// })
		User.find({}, function(err, data){
			if(err){
				console.log('Error getting users from DB', err);
				res.json({data:{genError: err}})
			}
			else
				data.genError ='Users loaded successfully';
			 	var response={}
				response.users = data;
				res.json(response);	

		})


	}
	this.register = function(req, res){

		console.log('going to register', req.body);
		var newUser = new User(req.body);
		var hashedPassword =bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
		newUser.password = hashedPassword
		console.log(hashedPassword,' gets hashed from ', req.body.password);
		// console.log('Unhashing the hashed password gives you:', bcrypt.compareSync(password, this.password));
		console.log('newUser:', newUser);
		newUser.save(function(err, user){
			if(err){
				console.log(err);
				res.json({genError: 'User not saved. Check field lengths'});
			}
			else{
				console.log('success. saved:', user);

				// User.find({}, function(err, data){
				// 	if(err){
				// 		console.log('Error getting users from DB', err)
				// 	}
				// 	else{
				// 		// console.log(data);
				// 		res.json(data);	
				// 	}

				// })
				User.find({}, {'first_name':1, 'last_name':1, 'email':1, 'birthday':1, _id:0}, function(err, data){
					if(err){
						console.log('Error getting users from DB', err);
						res.json({genError: err})
					}
					else{
							res.json({data:data, genError:'Users loaded'});	}

				})
				
			}

		})

	}
	this.login = function(req, res){

		var foundUser = false;
		var data;
		var response;
		console.log('Made it to controller login()', req.body.data);
		// req.body.data.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
		User.find({}, function(err, data){
			if(err){console.log('Error getting users from DB', err)
				response ={data: {genError: 'Problems getting users from DB'}}
			}
			else{
					for(x in data){
						console.log('comparing', data[x].email, data[x].password);
						if(data[x].email == req.body.data.email && bcrypt.compareSync(req.body.data.password, data[x].password)){
							foundUser = true
							console.log(data[x], ' matches', req.body.data.email);
							// res.session.loggedInUser = data[x];
							response ={data:{loggedIn: true, loggedInUser: data[x], genError: 'Welcome '+data[x].first_name}};
							// break;
						}
					}
					if(foundUser == false){
						data.genError = 'Incorrect Username or Password'

						response = {data: {genError: 'Incorrect Username or Password'}}
						console.log('Never found a user. Response is ', response)



					}
					console.log('Login response to be returned to view:', response);
					res.json({data:response})	

			}


		})


	}

	this.logout = function(req, res){
		console.log('In usersController logout')

	}



}


// REMEMBER TO CREATE A NEW USERSCONTROLER AND MODULE.EXPORT IT
module.exports = new usersController;