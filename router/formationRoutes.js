const express = require('express');
const router = express.Router();
const factory = require('../controller/factory');
const formations = require('../model/formation');
const multer = require('multer');

filename = '';
const mystorage = multer.diskStorage({

    destination:'uploads/',
    filename: (req, file , redirect)=>{
        let date = Date.now();
        let fl= file.originalname;
        redirect(null, fl);
        filename = fl;
    }
})
const upload = multer({storage:mystorage})
  
  // Create a new formation
  router.post('/formationss', upload.single('picture'), async (req, res) => {
    const imagePath = req.file ? req.file.path : null;
    const newFormation = new formations({
      nom: req.body.nom,
      datedebut: req.body.datedebut,
      datefin: req.body.datefin,
      description: req.body.description,
      classroom: req.body.classroom,
      picture: filename,
    });
  
    try {
      await newFormation.save();
      res.json({ message: 'Formation created successfully', formation: newFormation });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating formation' });
    }
  });
  
// Create a new training
router.post('/createtraining', factory.createOneA(formations));

// Get all trainings
// error on this route idk why 
// router.get('/getalltrainings', async (req, res) => {
//     try {
//       const users = await formations.find();
//       res.json(users);
//     } catch (error) {
//       res.status(400).json({ error: 'An error occurred while fetching data' });
//     }
//   })

// Get a specific training by ID
router.get('/training/:id', factory.getOne(formations));

// Update a training by ID
router.put('/training/:id', factory.updateOne(formations));

// Delete a training by ID
router.delete('/training/:id', factory.deleteOne(formations));

// Delete all trainings
//error on this route idk why 
// router.delete('/trainings', async (res) => {
//     try {
//       await formations.deleteMany({});
//       res.json({ message: 'All  deleted successfully' });
//     } catch (error) {
//       res.status(500).json({ error: ' error occurred while deleting all data' });
//     }
//   });

module.exports = router;
