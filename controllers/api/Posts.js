const router = require('express').Router();
const { Post } = require('../../models');
const {withAuth, withRecaptcha} = require('../../utils/auth');


router.post('/', withAuth, withRecaptcha, async (req, res) => {
  console.log(`${req.method}: ${req.baseUrl}`);
  try {
    if (req.body.title === "" || req.body.post_comment === "") {
      res.status(400).json({message: "Please enter title and/or comment."})
      return;
    }
    const postData = await Post.create({
      title: req.body.title,
      post_comment: req.body.post_comment,
      user_id: req.session.user_id
    })
    console.log("postData: ",postData )
    
    res.status(200).json({message: "Post Successfully Created"})
      
   } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;