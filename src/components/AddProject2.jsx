import { TextField, Button } from '@mui/material';

const AddProject2 = () => {
  return (
    <div>
      {/* Content aligned with the header */}
      <div className="ml-20">
        {/* Step Info and Progress Bar */}
        <div className="mb-6">
          <p className="text-xl text-gray-600 mb-3">Step 2 of 2</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Enter the data of your project `}</p>
        </div>

        {/* Form */}
        <div className="mb-12">
          <div className='flex items-center mt-5'>
            <label className="block text-gray-600 mr-5">Full Name</label>
          </div>
          <div className='flex'>
            <div className='mr-5'>
              <TextField
                fullWidth
                variant="standard"
                label="Email"
                InputLabelProps={{
                  className: "text-gray-600"
                }}
                InputProps={{
                  className: "text-gray-800"
                }}
                className="mb-8"
              />
            </div>
            <div className='ml-5'>
              <TextField
                fullWidth
                variant="standard"
                label="Company Id"
                InputLabelProps={{
                  className: "text-gray-600"
                }}
                InputProps={{
                  className: "text-gray-800"
                }}
                className="mb-8"
              />
            </div>
          </div>

          <div className='flex items-center mt-5'>
            <label className="block text-gray-600 mr-5">Company Name</label>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          variant="contained"
          className="text-white text-lg rounded-full py-3 px-8 shadow-md hover:bg-blue-600 focus:outline-none transition"
          style={{ backgroundColor: '#7065F0', width: '150px', height: '50px', borderRadius: '25px' }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AddProject2;
