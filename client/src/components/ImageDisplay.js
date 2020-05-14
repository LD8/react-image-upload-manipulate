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
