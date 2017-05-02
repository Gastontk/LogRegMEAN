//Express setup
var express = require('express'),
app= express(),
path = require('path')




var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './node_modules')));

//
// require(path.join(process.env['APPROOT'], 'server/config/mongoose.js'));

// require('./server/config/mongoose.js');
// require('./server/config/routes.js')(app); //dont forget to send (app) as a param






app.listen(3000, function(){
	console.log('Listening on port 3000');
})