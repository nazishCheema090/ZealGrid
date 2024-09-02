// components/AddProject2.js
import { Button } from "@mui/material";
import CheckBox from "./CheckBox";
import {useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { setFeatures, setStep } from '../features/project/projectSlice';
import PropTypes from 'prop-types'

const Step2 = ({projectName, onCheckBoxChange,features}) => {
  const dispatch = useDispatch();
  const step = useSelector((state)=> state.project.step);

  const [labels, setLabels] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [toogles, setToogles] = useState(false);

  const handleLabels = (event) => {
    setLabels((prev) => !prev);
    const { name, checked } = event.target;
    setLabels(checked)
    onCheckBoxChange(name, checked);
    dispatch(setFeatures({...features,labels: checked}));
  };
  const handleNavigation = (event) => {
    const { name, checked } = event.target;
    setNavigation(checked);
    onCheckBoxChange(name, checked);
    dispatch(setFeatures({...features, navigation : checked}));
  };
  const handleToogles = (event) => {
    const { name, checked } = event.target;
    setToogles(checked);
    onCheckBoxChange(name, checked);
    dispatch(setFeatures({...features, toggles : checked}));
  };


  const handleClick = () => {  
    dispatch(setStep(step + 1));
  };

  useEffect(() => {
    setLabels(features.labels || false);
    setNavigation(features.navigation || false);
    setToogles(features.toggles || false);
  }, [features]);

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
          <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Enter the data for ${projectName} features you want to control`}</p>
        </div>
        <div className="mb-12">
          <div className="flex items-center mt-5">
            <label className="block text-gray-600 mr-5">{projectName}</label>
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
                name={'labels'}
                onChange={handleLabels}
              />
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={navigation}
                label={"Navigation"}
                name={'navigation'}
                onChange={handleNavigation}
              />
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
              <CheckBox
                value={toogles}
                label={"Toogles"}
                name={'toogles'}
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


Step2.propTypes = {
  onCheckBoxChange: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
  features: PropTypes.object.isRequired,
}