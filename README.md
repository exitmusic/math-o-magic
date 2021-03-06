math-o-magic [![Build Status](https://secure.travis-ci.org/exitmusic/math-o-magic.png)](http://travis-ci.org/exitmusic/math-o-magic)
============


Math trivia game!

### File Structure
```
/app             : application code
`--/models       : models
`--/controllers  : controllers / routes
`--/views        : views
/public          : static assets
`--/css          : stylesheets
`--/img          : images
`--/js           : javascript files
   `--/models    : backbone models (in progress)
   `--/views     : backbone views (in progress)
`--/vendor       : all 3rd party assets
/routes          : currently not used
/test            : contains unit tests (mocha)
app.js           : http server and socket.io setup
utils.js         : contains the parseCookie() function taken out of connect middleware
```

### Running mocha test cases
```
sudo npm install -g mocha
mocha --reporter spec
```

### Helpful resources
* http://derbyjs.com/
* http://socket.io/
* https://github.com/codeparty/derby-examples
* http://niallohiggins.com/2012/03/28/3-quick-tips-for-writing-tests-in-nodejs/
* https://github.com/scotch/derby-blog

### Troubleshooting
* https://groups.google.com/forum/?fromgroups#!topic/derbyjs/G0_dPw4BpvE
