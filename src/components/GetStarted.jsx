import React from 'react';
import { useNavigate } from 'react-router-dom';
import ZealGridLogo from '../assets/ZealGrid.svg'; // Adjust the path to your SVG file

const GetStartedPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home'); // Redirect to home or another page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto p-8 flex">
        <div className="flex-shrink-0 flex items-center justify-center w-1/2">
          <img src={ZealGridLogo} alt="ZealGrid Logo" className="mb-4" style={{ width: '436px', height: '252px' }} />
        </div>
        <div className="flex flex-col justify-between w-1/2 relative">
          <p className="text-center text-black mb-16" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300', fontSize: '60px', lineHeight: '90px' }}>
            Welcome to ZealGrid Dashboard
          </p>
          <div className="absolute bottom-0 right-0  mr-16">
            <button
              onClick={handleGetStarted}
              className="py-4 px-12 bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-full text-2xl font-medium hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{ width: '276px', height: '98px', borderRadius: '50px', backgroundColor: '#7065F0' }}
            >
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300', fontSize: '25px', lineHeight: '37.5px' }}>
                Get Started
              </span>
            </button>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ top: 'calc(100% - 50px)', left: '50%', transform: 'translateX(-50%)' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
