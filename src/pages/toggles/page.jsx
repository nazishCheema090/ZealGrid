import React from "react";
import { useParams } from "react-router-dom";

const Toggles = () => {
  const { projectName } = useParams();
  return (
    <div className="flex items-center justify-center h-screen w-full">
      Toggles page of {projectName}
    </div>
  );
};

export default Toggles;
