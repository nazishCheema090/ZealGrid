import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create a context for the project
const ProjectContext = createContext();

// Custom hook to use the ProjectContext
export const useProject = () => useContext(ProjectContext);

// ProjectProvider component that wraps its children with ProjectContext.Provider
export const ProjectProvider = ({ children }) => {
  // State to keep track of the current step
  const [step, setStep] = useState(1);

  // Function to go to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Function to go to the previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Provide the current step and functions to navigate steps to the context consumers
  return (
    <ProjectContext.Provider value={{ step, nextStep, prevStep }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Prop validation for the ProjectProvider component
ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' prop is required and should be a valid React node
};
