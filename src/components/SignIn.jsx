import React, { useState } from 'react';
import TT from "../assets/TT.svg";
import ZealGrid from "../assets/ZealGrid.svg";
import RadioButton from "../assets/RadioButton.svg";
import Eye from "../assets/Eye.svg"; // Importing the Eye icon

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <div className="flex w-full max-w-screen-lg mx-auto p-8 relative">
        {/* Sign-In Form */}
        <div className="w-1/2 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Sign in to Zeal Grid</h2>
          <form>
            <div className="relative mb-6">
              <input
                type="email"
                id="email"
                className="peer w-full px-4 py-2 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-600"
                placeholder="Email"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 -top-4 text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-gray-600"
              >
                Email
              </label>
            </div>
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="peer w-full px-4 py-2 border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-indigo-600"
                placeholder="Password"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 -top-4 text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-gray-600"
              >
                Password
              </label>
              <img
                src={Eye}
                alt="Show/Hide Password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer"
                width="24"
                height="24"
              />
            </div>
            <div className="text-right mb-6">
              <a href="#" className="text-indigo-600 hover:underline">Forgot Password?</a>
            </div>
            <div className="mb-6 text-center">
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                Sign in
              </button>
            </div>
            <p className="text-center text-sm text-gray-600">
              Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Create an account</a>
            </p>
          </form>
        </div>
        
        {/* Right Side with SVGs */}
        <div className="w-1/2 relative flex items-center justify-center">
          <div className="absolute" style={{ top: '20px', left: '70%', transform: 'rotate(-10.45deg)' }}>
            <img src={TT} alt="TT SVG" style={{ width: '162.87px', height: '112.46px' }} />
          </div>
          <div className="absolute" style={{ top: '50%', left: '70%', transform: 'translateY(-50%)' }}>
            <img src={ZealGrid} alt="Zeal Grid SVG" className="w-48" />
          </div>
          <div className="absolute" style={{ bottom: '20px', left: '70%' }}>
            <img src={RadioButton} alt="Radio Button SVG" className="w-24 transform rotate-25" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
