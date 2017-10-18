console.log('Loading Routes file')


var path = require('path');
var Users = require('./../controllers/users.js')


module.exports = function(app){
	// app.get('/', Users.index)

	app.get('/users', Users.index)

	app.post('/users', Users.register)

	app.post('/login', Users.login)

	app.get('/logout', Users.logout)

}