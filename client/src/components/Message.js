import React from "react";

export const Message = ({ msg }) => {
  return (
    <div className="alert alert-info mt-4" role="alert">
      {msg}
    </div>
  );
};
