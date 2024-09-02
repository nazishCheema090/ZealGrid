import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Paper } from '@mui/material';
import AddProject1 from '../components/AddProject1';
import AddProject2 from '../components/AddProject2';
import AddProject3 from '../components/AddProject3';
import Loading from '../components/Loading';
import { setStep, setFeatures, setProjectName, saveProjectData } from '../features/project/projectSlice';
import {toast} from 'react-hot-toast'

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, projectName, features, companyDetail } = useSelector((state) => state.project);

  const handleCheckboxChange = (label, value) => {
    dispatch(setFeatures({ ...features, [label]: value }));
  };

  const handleSave = () => {

    const data = {
      projectName,
      features,
      companyDetail,
    };
    // Dispatch the saveProjectData thunk to save the project data
    dispatch(saveProjectData(data)).then((result) => {
      if (result.type === 'project/saveProjectData/fulfilled') {        
        toast.success("Project Created successfully")
        navigate('/home');
        console.log('projec created');
      } else if (result.type === 'project/saveProjectData/rejected') {
        toast.error('Could not create project')
        navigate('/home');
        console.error('Error saving project data:', result.payload);
      }
      })
      dispatch(setStep(1));
  };

    const handleClick = () =>{
      if(step !== 1){
        dispatch(setStep(step-1));
      }else {
        navigate('/home')
      }
    }

  return (
    <>
      
        <div className="flex justify-center items-center h-screen bg-gray-100 font-poppins">
          <Paper className="relative w-full max-w-3xl p-12 rounded-lg shadow-xl transform transition-all duration-500 hover:shadow-2xl">
            {/* Header Row */}
            <div className="flex items-center mb-6">
              <div
                className="flex-none w-16 h-16 bg-purple-100 rounded-full flex justify-center items-center mr-4 cursor-pointer hover:bg-purple-200 transition"
                onClick={handleClick}
              >
                <ArrowBackIcon className="text-purple-500" style={{ fontSize: 32 }} />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">Create a Project</h1>
            </div>

            {/* Conditional Rendering of Steps */}
            {step === 1 && (
              <AddProject1
                nextStep={() => dispatch(setStep(step + 1))}
                projectName={projectName}
                setProjectName={(name) => dispatch(setProjectName(name))}
              />
            )}
            {step === 2 && (
              <AddProject2
                nextStep={() => dispatch(setStep(step + 1))}
                projectName={projectName}
                onCheckBoxChange={handleCheckboxChange}
                features={features}
              />
            )}
            {step === 3 && (
              <AddProject3
                handleSave={handleSave}
              />
            )}
          </Paper>
        </div>
      
    </>
  );
};

export default CreateProject;
