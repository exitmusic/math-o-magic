function routes(app, io) {
	app.get('/', function(req, res){
		//io.sockets.in(req.sessionID).send('Man, good to see you back!');
		var numOfPlayers = io.sockets.clients('trivia-room').length;
		res.render('index', { 
				title: 'Math-o-Magic Mental Math Room'
		});
	});
	
	app.post('/start', function(req, res) {
		
	});
	
	app.post('/question', function(req, res) {
		
	});
	
	app.post('/answer', function(req, res) {
		
	});
}

module.exports = routes;
