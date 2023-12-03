const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  university: String,
  level: String,
  role: {
    type: String,
    default: 'student', 
  },
  formations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Formation' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
