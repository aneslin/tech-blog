const router = require('express').Router()
const {Post, User} = require('../models')
const withAuth = require("../utils/auth")

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

router.get("/post-edit/:id", withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_title", "post_content", "created_at"],
      include: [
  
        { model: User, attributes: ["username"] },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        //serialize data
        const post = dbPostData.get({ plain: true });
  
        res.render("edit-post", {
          post,
          loggedIn: req.session.loggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router