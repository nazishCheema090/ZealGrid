import { Button, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import PhoneInput from './PhoneInput';
import {useSelector, useDispatch} from 'react-redux';
import { setCompanyDetail } from "../features/project/projectSlice";
import CircularProgress from '@mui/material/CircularProgress'

export default function AddProject3(
  {handleSave}
){
    const dispatch = useDispatch();
    const loading = useSelector((state)=> state.project.loading);
    const companyDetail = useSelector((state) => state.project.companyDetail);
    



  return (
    <div>
      <div className="ml-20">
        <div className="mb-6">
          <p className="text-xl text-gray-600 mb-3">Step 3 of 3</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-2xl text-gray-700 font-semibold my-3 leading-tight">{`Enter the data of your Company `}</p>
        </div>
        <div className="mb-12">
          <div className="flex">
            <div className="mr-5">
              <TextField
                fullWidth
                variant="standard"
                label="Email"
                value={companyDetail.email}
                InputLabelProps={{ className: "text-gray-600" }}
                InputProps={{ className: "text-gray-800" }}
                className="mb-8"
                onChange={(e) => dispatch(setCompanyDetail({...companyDetail, email: e.target.value}))}
              />
            </div>
            <div className="ml-5">
              <TextField
                fullWidth
                variant="standard"
                label="Company Name"
                value={companyDetail.companyName}
                InputLabelProps={{ className: "text-gray-600" }}
                InputProps={{ className: "text-gray-800" }}
                className="mb-8"
                onChange={(e) => dispatch(setCompanyDetail({...companyDetail, companyName : e.target.value}))}
              />
            </div>
          </div>
          <div className="mt-3">
            <PhoneInput value={companyDetail.phone} onChangePhone={(e)=> dispatch(setCompanyDetail({...companyDetail, phone: e.target.value}))}/>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          variant="contained"
          className="text-white text-lg rounded-full py-3 px-8 shadow-md hover:bg-blue-600 focus:outline-none transition"
          style={{
            backgroundColor: "#7065F0",
            width: "150px",
            height: "50px",
            borderRadius: "25px",
          }}
          onClick={handleSave}
        >
          {loading ? <CircularProgress size={30} style={{color : 'white'}} /> : 'Continue' }
        </Button>
      </div>
    </div>
  );
}

AddProject3.propTypes = {
  handleSave: PropTypes.func.isRequired,
};
