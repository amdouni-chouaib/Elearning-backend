const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, university, level, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      university,
      level,
      role,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    
      // Handle other errors
      res.status(500).json({ error: 'invalid Form Data' });
      }
};
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid Email ' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid Password' });
      }
  
      const userdata = {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        university: user.university,
        level: user.level,
        role: user.role,
      };
  
      const token = jwt.sign(userdata, 'your-secret-key', { expiresIn: '1h' });
  
      res.json({ token:token,role:userdata.role });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  
  module.exports = { signup, login };