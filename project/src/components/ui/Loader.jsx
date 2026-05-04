import React from "react";

const Loader = ({ size = 24 }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full border-2 border-border border-t-primary-green"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

export default Loader;