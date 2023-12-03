const Comment = require('../model/Comment'); // Assuming your model is in a 'models' directory

// Controller for creating a new comment
exports.createComment = async (req, res) => {
  try {
    const { trainingId, userId, comment } = req.body;

    const newComment = new Comment({
      trainingId,
      userId,
      comment,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create a new comment' });
  }
};

// Controller for getting all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}