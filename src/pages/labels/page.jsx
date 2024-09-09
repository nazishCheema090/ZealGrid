import React from "react";
import { useParams } from "react-router-dom";

const Labels = () => {
  const { projectName } = useParams();
  return (
    <div className="flex items-center justify-center h-screen w-full">
      Labels page of {projectName}
    </div>
  );
};

export default Labels;
