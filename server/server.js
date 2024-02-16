const multer = require('multer');
const cors = require('cors');
const express = require('express');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors())

app.use('/',function(req, res, next){
    
    next();
 });
 
const type = upload.single('image');

app.post('/uploads', type , async (req, res) => {
    
      console.log(req.file, req.url, req.body);
      if (!req.file) {
        return res.status(400).send('No image file uploaded');
      }
    
    // const image = new Image({
    //   filename: req.file.filename,
    //   path: req.file.path
    // });
  
    try {
    //   await image.save();
      res.status(200).send('Image uploaded and saved successfully');
    } catch (error) {
      res.status(500).send('Error saving image to the database');
    }
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});