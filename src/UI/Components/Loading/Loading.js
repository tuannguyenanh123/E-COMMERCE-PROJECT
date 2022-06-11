import React from "react";

const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        marginTop: "100px",
        fontSize: "2px",
        display: "flex",
        justifyContent: "center",
        opacity: "0.5",
      }}
    >
      <img src="./assets/Eclipse-1s-200px.gif" alt="Loading..." />
    </div>
  );
};

export default Loading;
