import { Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Step1 from '../components/AddProject1';
import Step2 from '../components/AddProject2';
import { useProject } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const { step, nextStep, prevStep } = useProject();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 font-poppins">
      <Paper className="relative w-full max-w-3xl p-12 rounded-lg shadow-xl transform transition-all duration-500 hover:shadow-2xl">
        {/* Header Row */}
        <div className="flex items-center mb-6">
          <div
            className="flex-none w-16 h-16 bg-purple-100 rounded-full flex justify-center items-center mr-4 cursor-pointer hover:bg-purple-200 transition"
            onClick={step === 1 ? () => navigate('/home') : prevStep}
          >
            <ArrowBackIcon className="text-purple-500" style={{ fontSize: 32 }} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Create a Project</h1>
        </div>

        {/* Conditional Rendering of Steps */}
        {step === 1 && <Step1 nextStep={nextStep} />}
        {step === 2 && <Step2 />}
      </Paper>
    </div>
  );
};

export default CreateProject;
