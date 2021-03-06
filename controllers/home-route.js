const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth")
//display all posts on the home page
router.get("/", (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: ["id", "post_title", "post_content", "created_at"],
    include: [{ model: User, attributes: ["username"] }],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      console.log(req.session);
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//render the log in page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
//render the signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});
//render new post
router.get("/newpost", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }
 res.render( "newpost", {  loggedIn: req.session.loggedIn});
});






module.exports = router;
