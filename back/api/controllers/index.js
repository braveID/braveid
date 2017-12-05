/*
    This holds all our routes and controllers
    Each route is associated with a controller, which will handle
    requests to that route
*/

const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/external', require('./steam'))

module.exports = router
