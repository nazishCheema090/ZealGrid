import React from "react";
import { useParams } from "react-router-dom";

const Settings = () => {
  const { projectName } = useParams();
  return (
    <div className="flex items-center justify-center h-screen w-full">
      Settings page of {projectName}
    </div>
  );
};

export default Settings;
