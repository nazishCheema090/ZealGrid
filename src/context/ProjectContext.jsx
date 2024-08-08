// src/context/ProjectContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { database } from '../config/firebaseConfig';
import { ref, set } from 'firebase/database';

// Create a context for the project
const ProjectContext = createContext();

// Custom hook to use the ProjectContext
export const useProject = () => useContext(ProjectContext);

// ProjectProvider component that wraps its children with ProjectContext.Provider
export const ProjectProvider = ({ children }) => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // function to save data in the database
  
  const saveProjectData = async (data) => {
    // Sanitize the project name to create a valid Firebase path
    const validProjectName = data.projectName.replace(/[.#$/[\]]/g, '-');
  
    // Create a reference to the project data in Firebase using the sanitized project name as the root
    const projectRef = ref(database, validProjectName);
  
    // Format the data correctly
    const formattedData = {
      company_detail: {
        email: data.companyDetail.email,
        name: data.companyDetail.companyName,
        phone_number: data.companyDetail.phone,
      },
      features: {
        labels: data.features.labels || false,
        navigation: data.features.navigation || false,
        toogles: data.features.toogles || false
      }
    };
  
    try {
      await set(projectRef, formattedData);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving project data:', error);
    }
  };
  

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
    <ProjectContext.Provider value={{ step, nextStep, prevStep, setStep,saveProjectData,}}>
      {children}
    </ProjectContext.Provider>
  );
};

// Prop validation for the ProjectProvider component
ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' prop is required and should be a valid React node
};
