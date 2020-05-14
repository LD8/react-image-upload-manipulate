import React, { useState, useEffect } from "react";

export const ImageDisplay = ({ file: { fileName, filePath } }) => {
  const [style, setStyle] = useState({ width: "300px", transition: "all 0.3s ease" });
  const [scale, setScale] = useState(1);
  const zoomIn = () => {
    setScale(scale + 0.1);
  };
  const zoomOut = () => {
    setScale(scale - 0.1);
  };

  useEffect(() => {
    setStyle({ ...style, transform: `scale(${scale})` });
  }, [scale]);
  return (
    <div className="d-flex flex-column align-items-center my-3">
      <h4 className="text-center mb-2">{fileName}</h4>
      <div style={{ overflow: "hidden" }} className="border rounded-lg shadow">
        <img src={filePath} alt="uploaded file" style={style} />
      </div>
      <div
        className="shadow border rounded-lg mt-4 d-flex justify-content-between align-items-center"
        style={{ width: "200px", height: "60px" }}
      >
        <button className="btn btn-secondary text-white mx-2" onClick={zoomIn}>
          +
        </button>
        <button className="btn btn-secondary text-white mx-2" onClick={zoomOut}>
          -
        </button>
      </div>
    </div>
  );
};
