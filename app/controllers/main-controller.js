function routes(app, io) {
  app.get('/', function(req, res){
    res.render('index', { 
      title: 'Math-o-Magic Mental Math Room'
    });
  });
}

module.exports = routes;
