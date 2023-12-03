const asyncHandler = require('express-async-handler');
const user = require('../model/user')


exports.deleteOne = (Model) =>
  asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await Model.findByIdAndRemove(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'data not found' });
      }
      res.json({ message: 'data deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the data' });
    }
  });

  exports.updateOneF = (Model) =>
  asyncHandler(async (req, res) => {
    const userId = req.params.id; 
    const userdata= { firstname, lastname, email, formations } = req.body;
  
    try {
      // Find the user by ID
      const users = await Model.findByIdAndUpdate(userId ,userdata,{ new: true });
  
      if (!users) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // // Update the specified fields
      // if (firstname) users.firstname = firstname;
      // if (lastname) users.lastname = lastname;
      // if (email) users.email = email;
      // if (formations) users.formations.push(formations);
  
      // // Save the updated user
      // await users.save();
      // console.log(users);
  
      res.status(200).json({ message: 'User updated successfully', users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  });

  exports.updateOneUF = (Model) =>
  asyncHandler(async (req, res) => {
    const userId = req.params.id; 
    const userdata= { formations } = req.body;
  
    try {
      // Find the user by ID
      const users = await Model.findByIdAndUpdate(userId ,userdata,{ new: true });
      users.formations.push(formations)

      if (!users) {
        return res.status(404).json({ error: 'User not found' });
      }
      

  
      // // Update the specified fields
      // if (firstname) users.firstname = firstname;
      // if (lastname) users.lastname = lastname;
      // if (email) users.email = email;
      // if (formations) users.formations.push(formations);
  
      // // Save the updated user
      // await users.save();
      // console.log(users);
  
      res.status(200).json({ message: 'User updated successfully', users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    }
  });



exports.updateOne = (Model) =>
  asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id;
      const userData={firstname,lastname,email,university} = req.body;
      const updatedUser = await Model.findByIdAndUpdate(userId, userData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the data' });
    }
  });
  exports.createOneA = (Model) =>
  asyncHandler(async (req, res) => {
   try {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
   } catch (error) {
    res.status(500).json({error:"Failed To add check your data again"})
   }
  });
  exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
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
        formation
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
  })
exports.getOne = (Model) =>
  asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Model.findById(userId);
    if (!user) {
      return res.status(404).json({ error: ' not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the data' });
  }
});

exports.getAllstudent =  (Model) =>
    asyncHandler(async (req, res) => {
  try {
    const users = await Model.find({role:"student"});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
})
exports.getAll =  (Model) =>
    asyncHandler(async (req, res) => {
  try {
    const users = await Model.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
})

  exports.deleteAll = (Model) =>
  asyncHandler(async (res) => {
    try {
      await Model.deleteMany({});
      res.json({ message: 'All  deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: ' error occurred while deleting all data' });
    }
  });
