import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Paper } from "@mui/material";
import { AddName, AddLabels, AddInfo } from "../../components/add-project/page";
import {
  setStep,
  setFeatures,
  setProjectName,
  saveProjectData,
} from "../../redux/slice/projectSlice";
import { toast } from "react-hot-toast";

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, projectName, features, companyDetail } = useSelector(
    (state) => state.project
  );

  const handleCheckboxChange = (label, value) => {
    dispatch(setFeatures({ ...features, [label]: value }));
  };

  const handleSave = async () => {
    const data = {
      projectName,
      features,
      companyDetail,
    };
    // Dispatch the saveProjectData thunk to save the project data
    await dispatch(saveProjectData(data)).then((result) => {
      if (result.type === "project/saveProjectData/fulfilled") {
        toast.success("Project Created successfully");
        navigate("/");
        console.log("projec created");
      } else if (result.type === "project/saveProjectData/rejected") {
        toast.error("Could not create project");
        navigate("/");
        console.error("Error saving project data:", result.payload);
      }
    });
  };

  const handleClick = () => {
    if (step !== 1) {
      dispatch(setStep(step - 1));
    } else {
      navigate("/");
    }
  };

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
              <ArrowBackIcon
                className="text-purple-500 "
                style={{ fontSize: 32 }}
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Create a Project
            </h1>
          </div>

          {/* Conditional Rendering of Steps */}
          {step === 1 && (
            <AddName
              nextStep={() => dispatch(setStep(step + 1))}
              projectName={projectName}
              setProjectName={(name) => dispatch(setProjectName(name))}
            />
          )}
          {step === 2 && (
            <AddLabels
              nextStep={() => dispatch(setStep(step + 1))}
              projectName={projectName}
              onCheckBoxChange={handleCheckboxChange}
              features={features}
            />
          )}
          {step === 3 && <AddInfo handleSave={handleSave} />}
        </Paper>
      </div>
    </>
  );
};

export default CreateProject;
