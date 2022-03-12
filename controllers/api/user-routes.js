const router = require("express").Router();
const { User } = require("../../models");

//get all
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  }).then((userData) => res.json(userData));
});

//get one
router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: { exclude: ["password"] },
  }).then((userData) => res.json(userData))
});

//new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password:req.body.password
    }).then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

//login route
router.post("/login", (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((dbUserData) => {
      console.log("db-user-datea ====>" , dbUserData)
      if (!dbUserData) {
        res.status(400).json({ message: "no user with that email address" });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: " incorrect password" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "you are now logged in" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//logout route
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
