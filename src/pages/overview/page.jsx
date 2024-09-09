import React from "react";
import { useParams } from "react-router-dom";

const Overview = () => {
  const { projectName } = useParams();

  return (
    <div className="flex justify-center items-center h-screen w-full">
      Overview page of {projectName}
    </div>
  );
};

export default Overview;
