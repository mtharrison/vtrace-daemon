var MongoClient = require('mongodb').MongoClient,
	express     = require('express'),
	app 		= express(),
	bodyParser  = require('body-parser')
	server 		= require('http').Server(app),
	format 		= require('util').format,
	eventSpecs  = require('./event-specs'),
	request		= require('request'),
	DATA_LIFETIME_SECS = 604800;

function rawBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

function getUsername(sessionid, cb) {
	var baseURL = 'http://www.videopoker.com/api/session_info?sessionid=';
	request(baseURL + sessionid, function(error, response, body){
		if(error){
			cb(null);
			return false;	
		}

		var body = JSON.parse(body);

		cb(body.nickname);
	});
}

function decorateEvent(data) {
	if(eventSpecs.hasOwnProperty(data.event_name)){

		var spec = eventSpecs[data.event_name];

		for(var i in spec)
			data[i] = spec[i];

	}	

	return data;
}

function decorateProcess(data) {
	return data;
}

function setExpiries(db) {
	// Set expiries on all data for 
	db.collection('client_log_events').ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: DATA_LIFETIME_SECS } , function(){});
	db.collection('client_events').ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: DATA_LIFETIME_SECS } , function(){});
	db.collection('client_processes').ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: DATA_LIFETIME_SECS } , function(){});
	db.collection('server_log_events').ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: DATA_LIFETIME_SECS } , function(){});
	db.collection('server_events').ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: DATA_LIFETIME_SECS } , function(){});
	db.collection('server_processes').ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: DATA_LIFETIME_SECS } , function(){});
}

app.use(rawBody);

MongoClient.connect('mongodb://127.0.0.1:27017/vtrace', function(err, db) {

	setExpiries(db);

	console.log("Mongo connected!");

	var io = require('socket.io')(server);

	server.listen(3000);

	app.post('/ClientLogEvent', function(req, res){

		var data = JSON.parse(req.rawBody);
		
		console.log("Got a ClientLogEvent:");
		console.log(data);

		res.header('Access-Control-Allow-Origin', "*");
		
		res.json({status: 'ok'});

		var c = db.collection('client_log_events');
		c.insert(data, function(){ if(err) console.log(err); })
	});

	io.on('connection', function(socket){

		socket.on('ClientLogEvent', function(data){

			data.createdAt = new Date();

			console.log("Got a ClientLogEvent:");
			console.log(data);

			var c = db.collection('client_log_events');
			c.insert(data, function(){ if(err) console.log(err); })
		});

		socket.on('ClientEvent', function(data){
			var data = decorateEvent(data);
			data.createdAt = new Date();

			console.log("Got a ClientEvent:");
			console.log(data);

			getUsername(data.sessionid, function(username){
				data.username = username;
				var c = db.collection('client_events');
				c.insert(data, function(){ if(err) console.log(err); })
			});
			
		});

		socket.on('ClientProcess', function(data){
			var data = decorateProcess(data);
			data.createdAt = new Date();

			console.log("Got a ClientProcess:");
			console.log(data);

			var c = db.collection('client_processes');
			c.insert(data, function(){ if(err) console.log(err); })
		});

		socket.on('ServerLogEvent', function(data){
			data.createdAt = new Date();

			console.log("Got a ServerLogEvent:");
			console.log(data);

			var c = db.collection('server_log_events');
			c.insert(data, function(){ if(err) console.log(err); })
		});

		socket.on('ServerEvent', function(data){
			var data = decorateEvent(data);
			data.createdAt = new Date();

			console.log("Got a ServerEvent:");
			console.log(data);

			var c = db.collection('server_events');
			c.insert(data, function(){ if(err) console.log(err); })
		});

		socket.on('ServerProcess', function(data){
			var data = decorateProcess(data);
			data.createdAt = new Date();

			console.log("Got a ServerProcess:");
			console.log(data);

			var c = db.collection('server_processes');
			c.insert(data, function(){ if(err) console.log(err); })
		});
	});

	console.log("Socket.io server listening on :3000")
});