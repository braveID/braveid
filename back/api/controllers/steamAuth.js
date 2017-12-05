// var express = require('express')
//   , router = express.Router()
//   , passport = require('passport');

// // GET /auth/steam
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  The first step in Steam authentication will involve redirecting
// //   the user to steamcommunity.com.  After authenticating, Steam will redirect the
// //   user back to this application at /auth/steam/return
// router.get('/steam',
//   passport.authenticate('steam', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('/');
//   });

// // GET /auth/steam/return
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// router.get('/steam/return',
//   // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail
//   function(req, res, next) {
//       req.url = req.originalUrl;
//       next();
//   },
//   passport.authenticate('steam', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('/');
//   });

// module.exports = router;

// passport.serializeUser(function (user, done) {
//   done(null, user)
// })

// passport.deserializeUser(function (obj, done) {
//   done(null, obj)
// })

// // Use the SteamStrategy within Passport.
// //   Strategies in passport require a `validate` function, which accept
// //   credentials (in this case, an OpenID identifier and profile), and invoke a
// //   callback with a user object.
// passport.use(new SteamStrategy({
//   returnURL: 'http://localhost:3000/steamAuth/steam/return',
//   realm: 'http://localhost:3000/',
//   apiKey: '8DD3D47C1DFB6EA97EA7F6665C4FBA20'
// },
//   function (identifier, profile, done) {
//     // asynchronous verification, for effect...
//     process.nextTick(function () {
//       // To keep the example simple, the user's Steam profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the Steam account with a user record in your database,
//       // and return that user instead.
//       console.log(profile)
//       profile.identifier = identifier
//       return done(null, profile)
//     })
//   }
// ))
