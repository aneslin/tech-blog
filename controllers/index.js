const router = require('express').Router()

const apiRoutes = require('./api/')
router.use('/api', apiRoutes)

const homepageRoute = require('./home-route')
router.use("/", homepageRoute)

const dashboardRoute = require('./dashboard-routes')
router.use('/dashboard', dashboardRoute)

const singlepost = require('./single-route')
router.use('/post', singlepost)

module.exports = router