const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  datedebut: {
    type: String,
    required: true,
  },
  datefin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  classroom: {
    type: String,
    required: true,
  },
  picture:{
    type:String,
    required:true,
  },
  
});

const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;
