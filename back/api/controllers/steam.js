const express = require('express')
const { Joi } = require('celebrate')
const router = express.Router()
const { celebrate } = require('celebrate')
const passport = require('passport')
const SteamStrategy = require('passport-steam')

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:3002/external/steam/callback',
  realm: 'http://localhost:3002/',
  apiKey: '06A83765DDCAC14833BC5D7DA91D25C6'
}, function (identifier, profile, done) {
    // asynchronous verification, for effect...
  process.nextTick(function () {
    profile.identifier = identifier
    return done(null, profile)
  })
}
))

router.use(passport.initialize())

router.get('/steam',
    passport.authenticate('steam', { failureRedirect: '/' }),
    function (req, res) {
      res.redirect('/')
    })

router.get('/steam/callback',
    passport.authenticate('steam', { failureRedirect: '/' }),
    function (req, res) {
      let steamid = req.user._json.steamid
      res.redirect(`exp://localhost:19000/+steam_callback?steamid=${steamid}`)
    })

module.exports = router
