import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Paper } from '@mui/material';
import AddProject1 from '../components/AddProject1';
import AddProject2 from '../components/AddProject2';
import AddProject3 from '../components/AddProject3';
import Loading from '../components/Loading';
import { setStep, setFeatures, setProjectName, setCompanyDetail } from '../features/project/projectSlice';

const CreateProject = () => {
  const dispatch = useDispatch();
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
    dispatch(setStep(4)); // Assuming 4 is the loading step
  };

  return (
    <>
      {step === 4 ? (
        <Loading projectName={projectName} />
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100 font-poppins">
          <Paper className="relative w-full max-w-3xl p-12 rounded-lg shadow-xl transform transition-all duration-500 hover:shadow-2xl">
            {/* Header Row */}
            <div className="flex items-center mb-6">
              <div
                className="flex-none w-16 h-16 bg-purple-100 rounded-full flex justify-center items-center mr-4 cursor-pointer hover:bg-purple-200 transition"
                onClick={() => dispatch(setStep(step - 1))}
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
                email={companyDetail.email}
                setEmail={(newEmail) =>
                  dispatch(setCompanyDetail({ ...companyDetail, email: newEmail }))
                }
                companyName={companyDetail.companyName}
                setCompanyName={(newCompanyName) =>
                  dispatch(setCompanyDetail({ ...companyDetail, companyName: newCompanyName }))
                }
                phone={companyDetail.phone}
                setPhone={(newPhone) =>
                  dispatch(setCompanyDetail({ ...companyDetail, phone: newPhone }))
                }
              />
            )}
          </Paper>
        </div>
      )}
    </>
  );
};

export default CreateProject;
