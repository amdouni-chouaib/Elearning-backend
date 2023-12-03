const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const authRoutes = require('./router/authRoutes');
const userRoutes = require('./router/userRoutes');
const formations = require('./model/formation');
const commentRoutes = require('./router/commentRoutes'); // Adjust the path as needed
const quiz = require('./router/quizRoutes');

const formationRoutes = require('./router/formationRoutes');
const pdfRoutes = require('./router/PdfRoutes');
require('dotenv').config();
const app = express();



const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Route to handle file upload
app.post('/uploads', upload.single('pdfFile'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.use(express.static('uploads'));

app.use(cors()); // Use cors middleware to allow all origins

app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});






app.get('/getalltrainings', async (req, res) => {
  try {
    const users = await formations.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
})
app.delete('/trainings', async (res) => {
  try {
    await formations.deleteMany({});
    res.json({ message: 'All  deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: ' error occurred while deleting all data' });
  }
});
app.use('/', quiz);

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', formationRoutes);
app.use('/',pdfRoutes);
app.use('/comments',commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
