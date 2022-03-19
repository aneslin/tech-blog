const router = require('express').Router()

const userRoutes = require('./user-routes.js')
router.use('/users', userRoutes)

const postRoutes = require('./post-routes.js')
router.use('/posts', postRoutes)

const commentRoutes= require('./comment-routes.js')
router.use("/comments", commentRoutes)

module.exports = router