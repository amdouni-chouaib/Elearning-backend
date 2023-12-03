// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { signup, login } = require('../controller/authController');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your-secret-key');
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

router.post('/signup', signup);
router.post('/login', login);
router.get("/test",(req,res)=>{
  res.json({message:'test'})
})
// Protected route example
router.get('/protected', verifyToken, (req, res) => {
  // This route can only be accessed with a valid token
  res.json({ message: 'Forbidden Path ', userId: req.user.userId });
});

module.exports = router;
