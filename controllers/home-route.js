const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth")

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

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/newpost", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
    return;
  }
 res.render( "newpost", {  loggedIn: req.session.loggedIn});
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_title", "post_content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_content",
          "post_id",
          "user_id",
          "created_at",
        ],
        include: [{ model: User, attributes: ["username"] }],
      },

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

      res.render("singlepost", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});





module.exports = router;
