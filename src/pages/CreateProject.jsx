import { useState, } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Paper } from '@mui/material';
import { useProject } from '../context/ProjectContext';
import AddProject1 from '../components/AddProject1';
import AddProject2 from '../components/AddProject2';
import AddProject3 from '../components/AddProject3';
import Loading from '../components/Loading';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const { step, nextStep, prevStep, setStep, saveProjectData } = useProject();
  const [features, setFeatures] = useState({});
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');

  const handleCheckboxChange = (label, value) => {
    setFeatures((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));
  };

  const handleSave = () => {
    const data = {
      projectName,
      features,
      companyDetail: {
        email,
        companyName,
        phone
      },
    };
    saveProjectData(data);
    setStep(4); // Assuming 4 is the loading step
  };

  // useEffect(() => {
  //   console.log('Features updated:', features);
  // }, [features, projectName]); // Log the features state whenever it updates

  return (
    <>
      {step === 4 ? (
        <Loading projectName={projectName}/>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100 font-poppins">
          <Paper className="relative w-full max-w-3xl p-12 rounded-lg shadow-xl transform transition-all duration-500 hover:shadow-2xl">
            {/* Header Row */}
            <div className="flex items-center mb-6">
              <div
                className="flex-none w-16 h-16 bg-purple-100 rounded-full flex justify-center items-center mr-4 cursor-pointer hover:bg-purple-200 transition"
                onClick={prevStep}
              >
                <ArrowBackIcon className="text-purple-500" style={{ fontSize: 32 }} />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">Create a Project</h1>
            </div>

            {/* Conditional Rendering of Steps */}
            {step === 1 && <AddProject1 nextStep={nextStep} projectName={projectName} setProjectName={setProjectName}/>}
            {step === 2 && <AddProject2 nextStep={nextStep} projectName={projectName} onCheckBoxChange={handleCheckboxChange} features={features}/>}
            {step === 3 && (
              <AddProject3 
                handleSave={handleSave} 
                email={email} 
                setEmail={setEmail} 
                companyName={companyName} 
                setCompanyName={setCompanyName} 
                phone={phone} 
                setPhone={setPhone} 
              />
            )}
          </Paper>
        </div>
      )}
    </>
  );
};

export default CreateProject;
