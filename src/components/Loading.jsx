import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ZealGrid from '../assets/ZealGrid.svg';
import './Loading.css';
import PropTypes from 'prop-types'; // Import prop-types
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { setStep } from '../features/project/projectSlice';

const Loading = ({projectName}) => {
  const [isProjectCreated, setIsProjectCreated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProjectCreated(true);
    }, 5000); // Simulate project creation time
    return () => clearTimeout(timer);
  }, []);

  const handleClick = ()=>{
    navigate('/home');
    dispatch(setStep(1));

  }

  return (
    <div className="flex items-center justify-center h-screen bg-white font-poppins relative">
      <div className={`logo transition-all duration-1000 ${isProjectCreated ? 'top-left' : 'center'}`}>
        <img src={ZealGrid} alt="Zeal Grid" className={`${isProjectCreated ? 'w-[179px] h-[29px]'  : 'w-80.5 h-13.1' }`} />
      </div>
      {!isProjectCreated && (
        <div className="text-center mt-10">
          <p className="text-xl text-gray-600">
            Preparing your project, please wait
          </p>
          <div className="flex justify-center my-10">
            <CircularProgress size={50} />
          </div>
          <p className="text-xl text-black">{projectName}</p>
        </div>
      )}
      {isProjectCreated && (
        <div className="text-center m-20 transition-opacity duration-1000">
          <h2 className="text-2xl font-bold">Congratulations!!</h2>
          <p className="mt-4 text-lg">
            Your project <span className="font-bold">{projectName}</span> is created.
          </p>
          <button className="mt-10 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700"
            onClick={handleClick}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Loading;


Loading.propTypes = {
    projectName: PropTypes.string.isRequired,
};