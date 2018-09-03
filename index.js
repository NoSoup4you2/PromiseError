// =======================
// get the packages we need 
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var server      = require('http').createServer(app);


// Register Route Modules

const leadRoutes = require('./lead')
var config = require('./config'); // get our config file

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));



// Register Routes

app.route('/')
	.get(function(req, res){res.json({success:false,message:'Nothing to see without credentials !'})})
	.post(function(req, res){res.json({success:false,message:'Nothing to see without credentials !'})})

app.use('/leads', leadRoutes);


server.listen(config.port,config.host);

//app.listen(config.port, config.host);
console.log('Magic happens at http://'+ config.host +':' + config.port);