import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center mt-24">
      <span className="loading loading-spinner loading-md"></span>
    </div>
  );
};

export default Loader;
