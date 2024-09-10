import React from "react";
import { useParams } from "react-router-dom";

const Navigation = () => {
  const { projectName } = useParams();
  return (
    <div className="flex items-center justify-center h-screen w-full">
      Navigation page of {projectName}
    </div>
  );
};

export default Navigation;
