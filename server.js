var MongoClient = require('mongodb').MongoClient,
	express     = require('express'),
	app 		= express(),
	bodyParser  = require('body-parser')
	server 		= require('http').Server(app),
	format 		= require('util').format,
	eventSpecs  = require('./event-specs');

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

function decorate(data) {
	if(eventSpecs.hasOwnProperty(data.event_name)){

		var spec = eventSpecs[data.event_name];

		for(var i in spec)
			data[i] = spec[i];
		
	}	

	return data;
}

app.use(rawBody);

MongoClient.connect('mongodb://127.0.0.1:27017/vtrace', function(err, db) {

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
			console.log("Got a ClientLogEvent:");
			console.log(data);

			var c = db.collection('client_log_events');
			c.insert(data, function(){ if(err) console.log(err); })
		});

		socket.on('ClientEvent', function(data){
			console.log("Got a ClientEvent:");
			console.log(data);

			var data = decorate(data);

			var c = db.collection('client_events');
			c.insert(data, function(){ if(err) console.log(err); })
		});

		socket.on('ServerLogEvent', function(data){
			console.log("Got a ServerLogEvent:");
			console.log(data);

			var c = db.collection('server_log_events');
			c.insert(data, function(){ if(err) console.log(err); })
		});

		socket.on('ServerEvent', function(data){
			console.log("Got a ServerEvent:");
			console.log(data);

			var data = decorate(data);

			var c = db.collection('server_events');
			c.insert(data, function(){ if(err) console.log(err); })
		});
	});

	console.log("Socket.io server listening on :3000")
});