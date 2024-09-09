import React from "react";
import { useParams } from "react-router-dom";

const ProjectApp = () => {
  const { projectName } = useParams();
  return (
    <div className="flex items-center justify-center h-screen w-full">
      App || website of {projectName}
    </div>
  );
};

export default ProjectApp;
