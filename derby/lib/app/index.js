var derby = require('derby')
  , app = derby.createApp(module)
  , get = app.get
  , post = app.post
  , view = app.view
  , ready = app.ready
  , start = +new Date()
	, _ = require('underscore')
	, url = require('url')

derby.use(require('../../ui'))


// ROUTES //

// Derby routes can be rendered on the client and the server
get('/', function(page, model, params) {
  var roomName = params.roomName || 'home'
  	, userId = model.get('_userId')

  // Subscribes the model to any updates on this room's object. Calls back
  // with a scoped model equivalent to:
  //   room = model.at('rooms.' + roomName)
  model.subscribe('rooms.' + roomName, 'players', function(err, room, players) {
    model.ref('_room', room)
    model.ref('_player', players.at(userId))
    
    players.setNull('numOfPlayers', 0)
    
    if (players.get(userId)) {
      //console.log('player exists!')
      //console.log('player: '+players.get(userId))
      players.set('numOfPlayers', Object.keys(players.get()).length)
    } else {
      //console.log('adding player: '+userId)
      players.set(userId, {property: "yes!"})
      players.set('numOfPlayers', Object.keys(players.get()).length)
    }

    //console.log(Object.keys(players.get()).length)
    //console.log(model.get())
    
    
    // setNull will set a value if the object is currently null or undefined
    room.setNull('welcome', 'Welcome to ' + roomName + '!')

    room.incr('visits')

    // This value is set for when the page initially renders
    model.set('_timer', '0.0')
    // Reset the counter when visiting a new route client-side
    start = +new Date()

    // Render will use the model data as well as an optional context object
    page.render({
      roomName: roomName
    , randomUrl: parseInt(Math.random() * 1e9).toString(36)
    })
  })
})

post('/answer', function(page, model, params) {
	console.log(params.url)

})



// CONTROLLER FUNCTIONS //

ready(function(model) {
  var timer

  // Functions on the app can be bound to DOM events using the "x-bind"
  // attribute in a template.
  this.stop = function() {
    // Any path name that starts with an underscore is private to the current
    // client. Nothing set under a private path is synced back to the server.
    model.set('_stopped', true)
    clearInterval(timer)
  }

  this.start = function() {
    model.set('_stopped', false)
    timer = setInterval(function() {
      model.set('_timer', (((+new Date()) - start) / 1000).toFixed(1))
    }, 100)
  }
  this.start()

})
