const router = require('express').Router()
const {User, Post} = require('../../models')




router.get('/', (req, res) => {
    Post.findAll({
        
    }).then((userData) => res.json(userData))
})

module.exports = router;