import React from "react";

const RouterHOC = (wrappedComponent) => {
  return (props) => (
    <>
      <wrappedComponent {...props} />
    </>
  );
};

export default RouterHOC;
