/*
    This holds all our routes and controllers
    Each route is associated with a controller, which will handle
    requests to that route
*/

const express = require('express')
const router = express.Router()
, passport = require('passport')
, SteamStrategy = require('../controllers/').Strategy
, authRoutes = require('./routes/steamAuth');

router.use('/users', require('./users'))

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  // Use the SteamStrategy within Passport.
  //   Strategies in passport require a `validate` function, which accept
  //   credentials (in this case, an OpenID identifier and profile), and invoke a
  //   callback with a user object.
  passport.use(new SteamStrategy({
      returnURL: 'http://localhost:3000/steamAuth/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: '8DD3D47C1DFB6EA97EA7F6665C4FBA20'
    },
    function(identifier, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
  
        // To keep the example simple, the user's Steam profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Steam account with a user record in your database,
        // and return that user instead.
        console.log(profile)
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  ));
  
  var app = express();
  
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(express.static(__dirname + '/../../public'));
  
  app.get('/', function(req, res){
    res.render('index', { user: req.user });
  });
  
  // See views/auth.js for authentication routes
  app.use('/steamAuth', authRoutes);
  

module.exports = router
