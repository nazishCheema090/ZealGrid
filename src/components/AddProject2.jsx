// components/AddProject2.js
import { Button } from "@mui/material";
import { useProject } from "../context/ProjectContext";
import CheckBox from "./CheckBox";
import { useState } from "react";

const Step2 = () => {
  const { fullName, nextStep } = useProject();

  const [labels, setlabels] = useState(true);
  const [navigation, setNavigation] = useState(true);
  const [toogles, setToogles] = useState(true);

  const handleLabels = () => {
    return setlabels((prev) => !prev);
  };
  const handleNavigation = () => {
    return setNavigation((prev) => !prev);
  };
  const handleToogles = () => {
    return setToogles((prev) => !prev);
  };
  const handleClick = () => {
    nextStep(); // Change step to 4 to render the Loading component
  };

  return (
    <div>
      <div className="ml-20">
        <div className="mb-6">
          <p className="text-xl text-gray-600 mb-3">Step 2 of 3</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: "66%" }}
            ></div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Enter the data for ${fullName} features you want to control`}</p>
        </div>
        <div className="mb-12">
          <div className="flex items-center mt-5">
            <label className="block text-gray-600 mr-5">{fullName}</label>
          </div>

          {/* toogles */}
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
            Features
          </h3>

          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={labels}
                label={"Labels"}
                onChange={handleLabels}
              />
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={navigation}
                label={"Navigation"}
                onChange={handleNavigation}
              />
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={toogles}
                label={"Toogles"}
                onChange={handleToogles}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          variant="contained"
          className="text-white text-lg rounded-full py-3 px-8 shadow-md hover:bg-blue-600 focus:outline-none transition"
          style={{
            backgroundColor: "#7065F0",
            width: "150px",
            height: "50px",
            borderRadius: "25px",
          }}
          onClick={handleClick}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Step2;
