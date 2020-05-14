# The process of building this app

I've received an interview test where I was asked to build a simple website, functionality includes:

1. user can upload an image
2. after which user can zoom in/out and crop the image
3. 3 buttons (corresponding to zoom in, zoom out and crop) should be built on a floating tool bar

There should be a frontend to upload, display and manipulate the image as well as a backend service to receive and retrieve the image.

## Backend

### Initialisation:

```bash
$ npm innit -y
Wrote to /project/package.json:

{
  "name": "react-image-upload-manipulate",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/LD8/react-image-upload-manipulate.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/LD8/react-image-upload-manipulate/issues"
  },
  "homepage": "https://github.com/LD8/react-image-upload-manipulate#readme"
}
```

#### Install regular dependencies `express` and `express-fileupload`

```bash
$ npm i express express-fileupload
```

#### Install dev dependencies `nodemon` and `concurrently`

```bash
$ npm i -D nodemon concurrently
```

This allows us to run express server and react server at the same time

### Write scripts - `package.json`

```json
// package.json

{
  // ...
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client", // this will go to client folder and npm start
    "dev": "concurrently \"npm run server\" \"npm run client\"" // run both script at the same time
  }
  // ...
}
```

### server.js

```js
// server.js

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
  file.mv(`${__dirname}/client/public/uploads${file.name}`, (err) => {
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
```

## Frontend
Use `create-react-app` to create an app called `client` where the frontend app lives. It should be under the same directory as `server.js`.
```bash
$ npx create-react-app client
$ cd client
```

### package.json
Add proxy:
```json
// client/package.json
{
    // ...
    "proxy": "http://localhost:5000
}
```

### Install `axios`
Make sure install `axios` in frontend folder 'client'
```bash
$ cd client
$ npm i axios
```
