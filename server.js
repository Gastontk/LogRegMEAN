//Express setup
var express = require('express'),
app= express(),
path = require('path')
var bcrypt = require('bcryptjs');   // or 'bcrypt' on some versions
var session = require('express-session');
var session_params = {
	secret: 'snurgs stone',
	cookie: {}
}
app.use(session(session_params));
console.log(session)




var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './node_modules')));

//
// require(path.join(process.env['APPROOT'], 'server/config/mongoose.js'));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app); //needs the  (app) as a param



app.listen(3001, function(){
	console.log('Listening on port 3001');
})