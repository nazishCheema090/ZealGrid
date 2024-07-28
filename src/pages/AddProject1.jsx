import { useState, useEffect } from 'react';
import { TextField, CircularProgress, Button, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [companyID, setCompanyID] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching company ID from the database
    setTimeout(() => {
      setCompanyID('Netflix-website-7uasrf65');
    }, 1000);
  }, []);

  const handleNextClick = () => {
    navigate('/add-project2'); // Navigate to step 2
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 font-poppins">
      <Paper className="relative w-full max-w-3xl p-12 rounded-lg shadow-xl transform transition-all duration-500 hover:shadow-2xl">
        {/* Header Row */}
        <div className="flex items-center mb-6">
          <div
            className="flex-none w-16 h-16 bg-purple-100 rounded-full flex justify-center items-center mr-4 cursor-pointer hover:bg-purple-200 transition"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon className="text-purple-500" style={{ fontSize: 32 }} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Create a Project</h1>
        </div>

        {/* Content aligned with the header */}
        <div className="ml-20">
          {/* Step Info and Progress Bar */}
          <div className="mb-6">
            <p className="text-xl text-gray-600 mb-3">Step 1 of 2</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Let's Start with the name of your project `}</p>
          </div>

          {/* Form */}
          <div className="mb-12">
            <TextField
              fullWidth
              variant="standard"
              label="Full Name"
              InputLabelProps={{
                className: "text-gray-600"
              }}
              InputProps={{
                className: "text-gray-800"
              }}
              className="mb-8"
            />

            <div className='flex items-center mt-3'>
              <label className="block text-gray-600 mr-5">Project ID</label>
              {companyID ? (
                <p className="text-gray-800">{companyID}</p>
              ) : (
                <CircularProgress size={24} />
              )}
            </div>
          </div>

          
        </div>

        {/* Action Button */}
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
      </Paper>
    </div>
  );
};

export default CreateProject;
