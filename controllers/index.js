const router = require('express').Router()

const apiRoutes = require('./api/')
router.use('/api', apiRoutes)

const homepageRoute = require('./home-route')
router.use("/", homepageRoute)


module.exports = router