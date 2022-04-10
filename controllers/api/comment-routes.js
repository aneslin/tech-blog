const router = require('express').Router()
const { Comment } = require('../../models')

//api post route to get a new comment from comments.js
router.post("/", (req, res) => {
    if (req.session) {
        Comment.create({
            post_id: req.body.post_id,
            comment_content : req.body.comment_content,
            user_id : req.session.user_id
            
        }).then(dbCommentData =>{
            console.log(dbCommentData)
            res.json(dbCommentData)})
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
    })
}
})

module.exports = router