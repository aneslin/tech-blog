const router = require('express').Router()
const {Post, User} = require('../models')


router.get('/', (req, res) => {
    Post.findAll({
        where:{
            user_id: req.session.user_id
        },
        attributes:[
          'id',
          'post_title',
          'post_content',
          'user_id'
        ] , include: [
            {model:User,
            attributes:['username']}
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map((post) => post.get( { plain: true}))
        res.render("dashboard", { posts, loggedIn: req.session.loggedIn})
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
})

module.exports = router