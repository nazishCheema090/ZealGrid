// src/context/ProjectContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';

// Create a context for the project
const ProjectContext = createContext();

// Custom hook to use the ProjectContext
export const useProject = () => useContext(ProjectContext);

// ProjectProvider component that wraps its children with ProjectContext.Provider
export const ProjectProvider = ({ children }) => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const location = useLocation(); // Get the current location
  

  useEffect(() => {
    const handlePopState = () => {
      if (step > 1) {
        setStep((prevStep) => prevStep - 1);
      } else {
        navigate('/home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [step, navigate]);

  const nextStep = () => {
    setStep(step + 1);
    navigate(location.pathname); // Update the URL without pushing to the history stack
  };

  const prevStep = () => {
    if (step === 1) {
      navigate('/home');
    } else {
      setStep(step - 1);
      navigate(location.pathname); // Update the URL without pushing to the history stack
    }
  };

  // Provide the current step and functions to navigate steps to the context consumers
  return (
    <ProjectContext.Provider value={{ step, nextStep, prevStep, fullName, setFullName, setStep }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Prop validation for the ProjectProvider component
ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' prop is required and should be a valid React node
};
