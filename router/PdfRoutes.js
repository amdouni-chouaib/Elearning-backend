const express = require('express');
const router = express.Router();
const Pdf = require('../model/Pdf');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Formation = require('../model/formation');
const User = require('../model/user');

router.get('/users/:userId/pdf-formations', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch formations associated with the user
    const userFormations = await Formation.find({ _id: { $in: user.formations } });

    // Fetch pdfFiles associated with the formations
    const pdfFiles = await Pdf.find({ formations: { $in: userFormations.map(formation => formation._id) } }).select('pdfFile formations');

    // Organize the data
    const userFormationsWithPdf = userFormations.map(formation => ({
      formationId: formation._id,
      formationName: formation.nom,
      pdfFiles: pdfFiles
        .filter(pdf => pdf.formations && pdf.formations.includes(formation._id))
        .map(pdf => pdf.pdfFile),
    }));

    res.json(userFormationsWithPdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});



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
router.post("/uploadpdf", upload.any("pdfFile"), (req, res) => {
    try {
      let data = req.body;
      let pdf = new Pdf(data);
      pdf.date = new Date();
      pdf.pdfFile = filename;
      pdf.tags = data.tags?.split(",");
      pdf
        .save()
        .then((savedPdf) => {
          // filename = req.body.pdfFile;
          req.body;
          res.status(200).send(savedPdf);
        })
        .catch((err) => {
          res.status(400).json({error:"Error While Adding the file"});
        });

       // const token = jwt.sign(data, 'your-secret-key', { expiresIn: '1h' });
       
    } catch (error) {
      console.log(error);
    }
  });


  // router.get('/formations/:formationId/pdfs', async (req, res) => {
  //    try { 
  //     const formationId = req.params.formationId; 
  //   // Find the formation by ID const formation = await Formation.findById(formationId);
  //    if (!formation) { return res.status(404).json({ error: 'Formation not found' });
  //    } // Find PDFs associated with the formation const
  //     pdfs = await Pdf.find({ formations: formationId }); res.json(pdfs); } catch (error) { console.error(error); res.status(500).json({ error: 'Error fetching PDFs' }); } });






  router.get('/getpdfbyid/:id' , (req,res)=>{
    id = req.params.id;

    Pdf.findByName ({_id: id})
   .then(
       (pdf)=>{
       res.status(200).send(pdf);
   })
   .catch(
       (err)=>{
       res.status(400).send(err);
   }
   )
})




router.delete('/deletepdf/:id', (req,res)=>{
    id = req.params.id;

   Pdf.findOneAndDelete({_id: id})
   .then(
    (deletedPdf)=>{
        res.status(200).send(deletedPdf);
        }
   )
   .catch(
    (err)=>{
        res.status(400).send(err)
    }
   )

})


module.exports = router;
