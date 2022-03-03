const router = require('express').Router()
const sequelize = require('../../config/connection')
const {User, Post, Comment} = require('../../models')
//get all
router.get('/', (req, res) => {
    Post.findAll({
        include:[
            {model: Comment,
            include:{
                model: User,
                attributes: ['username']
            }},
            {model:User,
            attributes:['username']}
        ]
    }).then((userData) => res.json(userData))
})

//get one

router.get('/:id', (req,res) =>{
    Post.findOne({
        where: {
            id:req.params.id
        },
        include:[
            {model: Comment,
            include:{
                model: User,
                attributes: ['username']
            }},
            {model:User,
            attributes:['username']}
        ]
    }).then((userData) => res.json(userData))
}
)

//new post
router.post('/', (req,res)=> {
    Post.create({
        title:req.body.title,
        post_content: req.body.post_content,
        user_id: req.body.user_id
    }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


module.exports = router;