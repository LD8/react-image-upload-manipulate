import React from "react";
import { Tool } from "./Tool";

export const ToolBar = () => {
  return (
    <div
      className="shadow border rounded-lg mt-4 d-flex justify-content-between align-items-center"
      style={{ width: "200px", height: "60px" }}
    >
      <button className="btn btn-secondary text-white mx-2">+</button>
      <button className="btn btn-secondary text-white mx-2">-</button>

      {/* <Tool /> */}
    </div>
  );
};
