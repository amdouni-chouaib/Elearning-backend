const express = require('express');
const router = express.Router();
const Quiz = require('../model/quiz');

// Create a new quiz question
router.post('/quiz',  async (req, res) => {

    try {
        const { description } = req.body
        const { alternatives } = req.body
        const { formation } = req.body

        const question = await Quiz.create({
            description,
            alternatives,
            formation
        })
        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})
// // Get all quiz questions
// router.get('/quiz', async (req, res) => {
//   try {
//     const quizzes = await Quiz.find().populate('formation');
//     res.send(quizzes);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Get a quiz question by ID
router.get('/quiz/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('formation');
    if (!quiz) {
      return res.status(404).send();
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get('/formations/:formationId/quizzes', async (req, res) => {
    try {
      const formationId = req.params.formationId;
  
      // Find all questions that belong to the specified formation
      const quizzes = await Quiz.find({ formation: formationId });
  
      res.json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching quizzes' });
    }
  });

// // Update a quiz question by ID
// router.patch('/quiz/:id', async (req, res) => {
//   try {
//     const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('formation');
//     if (!quiz) {
//       return res.status(404).send();
//     }
//     res.send(quiz);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Delete a quiz question by ID
// router.delete('/quiz/:id', async (req, res) => {
//   try {
//     const quiz = await Quiz.findByIdAndDelete(req.params.id).populate('formation');
//     if (!quiz) {
//       return res.status(404).send();
//     }
//     res.send(quiz);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
