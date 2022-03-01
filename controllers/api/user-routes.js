const router = require('express').Router()
const {User} = require('../../models')




router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude:["password"]}
    }).then((userData) => res.json(userData))
})

module.exports = router;