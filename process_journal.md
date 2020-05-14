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

### Usage of `axios`

`axios` is a promise based HTTP client for the browser and `node.js` ([Github link](https://github.com/axios/axios))

Here we are using async function to retrieve data, and use the response to set state.

```js
// client/src/components/FileUpload.js

// ...
import axios from "axios";

export const FileUpload = () => {
  // ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage("Image Uploaded!");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  // ...
};
```

### And other components

Please refer to the [GitHub Repo](https://github.com/LD8/react-image-upload-manipulate).

### Cropper.js

```js
import React, { useState, useEffect, createRef } from "react";
import "cropperjs/dist/cropper.min.css";
import Cropper from "cropperjs";

export const ImageDisplay = ({ file: { fileName, filePath } }) => {
  const [imagePreview, setImagePreview] = useState("");
  const imageElement = createRef();

  useEffect(() => {
    const cropper = new Cropper(imageElement.current, {
      zoomable: true,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
        setImagePreview(canvas.toDataURL("image/jpg"));
      },
    });
  }, [imageElement]);

  return (
    <div className="d-flex flex-column align-items-center my-3">
      <h4 className="text-center mb-2">{fileName}</h4>
      <div
        style={{ overflow: "hidden" }}
        className="border rounded-lg d-flex shadow"
      >
        <img
          ref={imageElement}
          src={filePath}
          alt="uploaded file"
          style={{ width: "300px", transition: "all 0.3s ease" }}
        />
        <img
          src={imagePreview}
          style={{ height: "200px", width: "200px" }}
          alt="Preview"
          className="ml-3"
        />
      </div>
    </div>
  );
};
```

[Cropper.js Documentation](https://github.com/fengyuanchen/cropperjs)

## Installation of the app

1. Install dependencies server & client

```bash
$ npm install
$ cd client
$ npm install
```

2. serve frontend on `localhost:3000` & backend on `localhost:5000` with one command

```bash
$ npm run dev
```

PS. you can also find this _process journal_ [on my blog](###) as well

#### Thanks for the tutorial videos produced by the following AMAZING youtubers:

- '[Scale, Crop, and Zoom Images in a React Web Application](https://www.youtube.com/watch?v=hM9uKmy-BQQ&feature=emb_title)' by Nic Raboy
- '[React File Uploader With Express (Using React Hooks)](https://www.youtube.com/watch?v=b6Oe2puTdMQ&t=1299s)' by Traversy Media
