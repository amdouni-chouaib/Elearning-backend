const express = require('express');
const factory = require('../controller/factory');
const router = express.Router();
const user = require('../model/user')
const bcrypt = require("bcrypt");
const Formation = require("../model/formation")
const User = require('../model/user');
// Create a new user
router.post('/createuser', async (req, res) => {
    try {
      const { firstname, lastname, email, password, university , role,formation } = req.body;
  
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
        
      const newUser = new user({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        university,
        role,
      });

      newUser.formations.push(formation)

      console.log(newUser)
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error While Inserring Data check Again please .' });
    }
  });
//get user role teacher 
router.get('/getteacher',async (req, res) =>{
  try {
    const teachers = await User.find({ role: 'teacher' }).populate('formations');
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Get all users
router.get('/getall', factory.getAllstudent(user));

// Get a specific user by ID
router.get('/:id', factory.getOne(user));

// Update a user by ID
router.put('/:id', factory.updateOne(user));
// Update a user by ID
router.put('/formation/:id', factory.updateOneF(user));
router.put('/traininguser/:id',factory.updateOneUF(user))
// Delete a user by ID
router.delete('/:id', factory.deleteOne(user));

// Delete all users
router.delete('/user', factory.deleteAll(user));



router.get('/formations/:formationId/users', async (req, res) => {
  try {
    const formationId = req.params.formationId;

    // Find the formation by ID
    const formation = await Formation.findById(formationId);

    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }

    // Find users associated with the formation using a separate query
    const users = await user.find({ formations: formationId }, 'firstname lastname email');

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});


module.exports = router;
