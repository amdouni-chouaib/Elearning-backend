const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
  formations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Formation' }],

    pdfFile: {
    type: String,
    required: true,
  }});

const Pdf = mongoose.model('Pdf', PdfSchema);

module.exports = Pdf;
