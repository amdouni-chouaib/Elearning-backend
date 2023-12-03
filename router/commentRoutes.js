const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');
const Comment = require("../model/Comment")
// Route to create a new comment
router.post('/new', commentController.createComment);

// Route to get all comments
router.get('/getall', commentController.getAllComments);
router.get('/formation/:formationId/comments', async (req, res) => {
    try {
      const formationId = req.params.formationId;
  
      const comments = await Comment.find({ trainingId: formationId })
        .populate({
          path: 'userId',
          select: 'firstname lastname',
        })
        .exec();
  
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching comments' });
    }
  });
  
module.exports = router;
