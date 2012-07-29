function routes(app, io) {
	app.get('/', function(req, res){
		//io.sockets.in(req.sessionID).send('Man, good to see you back!');
		io.sockets.in('trivia-room').send(Object.keys(io.sockets.in('trivia-room').manager));
		var numOfPlayers = Object.keys(io.sockets.in('trivia-room').manager.connected).length;
		res.render('index', { 
				title: 'Express'
			, numOfPlayers: numOfPlayers //TODO: instead of passing as a variable, this should update the view in real time
		});
	});
	
	app.post('/start', function(req, res) {
		
	});
	
	app.post('/answer', function(req, res) {
		
	});
}

module.exports = routes;
