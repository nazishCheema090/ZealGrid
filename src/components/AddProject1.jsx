import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useProject } from '../context/ProjectContext';
import PropTypes from 'prop-types'; // Import prop-types

const Step1 = ({ nextStep }) => {
  const { setFullName } = useProject();
  const [fullName, setLocalFullName] = useState('');
  const [error, setError] = useState('');


  const handleNextClick = () => {
    if (fullName.trim() === '') {
      setError('Full Name is required');
      return;
    }
    setFullName(fullName);
    nextStep();
  };

  return (
    <div>
      <div className="ml-20">
        <div className="mb-6">
          <p className="text-xl text-gray-600 mb-3">Step 1 of 3</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '33%' }}></div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Let's Start with the name of your Application `}</p>
        </div>
        <div className="mb-12">
          <TextField
            fullWidth
            variant="standard"
            label="Full Name"
            value={fullName}
            onChange={(e) => setLocalFullName(e.target.value)}
            InputLabelProps={{ className: "text-gray-600" }}
            InputProps={{ className: "text-gray-800" }}
            className="mb-8"
            error={Boolean(error)}
            helperText={error}
          />
          
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          variant="contained"
          className="text-white text-lg rounded-full py-3 px-8 shadow-md hover:bg-blue-600 focus:outline-none transition"
          style={{ backgroundColor: '#7065F0', width: '150px', height: '50px', borderRadius: '25px' }}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};



export default Step1;

Step1.propTypes ={
  nextStep: PropTypes.func.isRequired,
};