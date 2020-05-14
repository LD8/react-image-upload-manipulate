import React, { useState } from "react";
import { ImageDisplay } from "./ImageDisplay";
import { Message } from "./Message";
import axios from "axios";

export const FileUpload = () => {
  const [fileName, setFileName] = useState("*.png/jpeg/jpg");
  const [file, setFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [message, setMessage] = useState(null);

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

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="custom-file">
          <input
            className="custom-file-input"
            id="customFile"
            type="file"
            name="img"
            accept=".png, .jpeg, .jpg"
            onChange={handleChange}
          />
          <label htmlFor="customFile" className="custom-file-label text-muted">
            {fileName}
          </label>
        </div>
        <button type="submit" className="mt-4 btn btn-outline-primary">
          upload
        </button>
      </form>
      {message && <Message msg={message} />}
      {uploadedFile && <ImageDisplay file={uploadedFile} />}
    </>
  );
};
