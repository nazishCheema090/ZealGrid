import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Paper } from "@mui/material";
import {
  AddNameForm,
  AddInfoForm,
  AddFeaturesForm,
} from "../../components/add-project/page";
import { setStep } from "../../redux/slice/projectSlice";

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step } = useSelector((state) => state.project);

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
          {step === 1 && <AddNameForm />}
          {step === 2 && <AddFeaturesForm />}
          {step === 3 && <AddInfoForm />}
        </Paper>
      </div>
    </>
  );
};

export default CreateProject;
