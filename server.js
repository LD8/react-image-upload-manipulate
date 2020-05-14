// bring in modules
const express = require("express");
const fileUpload = require("express-fileupload");

// initialize express
const app = express();

// initialize fileUpload
app.use(fileUpload());

//Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    // 400: bad request
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // get the file if there's an uploading file
  const file = req.files.file;

  // move the file into designated folder
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      // server error 500
      return res.status(500).send(err);
    }

    // if no issue with moving the file into designated folder, send back a json obj
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// run server on port 5000
app.listen(5000, () => console.log("Server Started..."));
