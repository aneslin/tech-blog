const router = require("express").Router()
const { Post, User } = require('../models')

router.get("/", (req,res) => {console.log(req.session)
    Post.findAll(
        
        {
        attributes: [
            "id",
            "post_title",
            "post_content",
            "created_at"
        ],
        include:[
            {model: User,
            attributes:["username"]}
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map((post)=>post.get({ plain: true}))
        
        res.render("homepage", {posts, loggedIn: req.session.loggedIn} )
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    
})

router.get("/login", (req,res) => {
    if (req.session.loggedIn){
        res.redirect("/")
        return
    } res.render("login")
})

router.get("/signup", (req,res) => {
    if (req.session.loggedIn){
        res.redirect("/")
        return
    } res.render("signup")
})




module.exports= router