// https://github.com/expressjs/multer?tab=readme-ov-file
const multer = require("multer");
const cors = require("cors");
const express = require("express");
// from: https://medium.com/@livajorge7/a-comprehensive-guide-to-uploading-and-saving-images-with-node-js-express-js-and-javascript-69137e227c4d

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors());

app.use("/", function (req, res, next) {
  next();
});

const type = upload.single("image");

app.post("/uploads", type, async (req, res) => {
  console.log(req.file, req.url, req.body);
  if (!req.file) {
    return res.status(400).send("No image file uploaded");
  }

  try {
    res.status(200).send("Image uploaded and saved successfully");
  } catch (error) {
    res.status(500).send("Error saving image to the database");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
