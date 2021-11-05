import React from "react";

const Spinner = () => {
  return (
    <div className="loading">
      <div className="loading-background"></div>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Spinner;
