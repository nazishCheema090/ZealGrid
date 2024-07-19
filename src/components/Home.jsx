import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin'); // Redirect to sign-in page after sign-out
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {currentUser.email}</h1>
        <button
          onClick={handleSignOut}
          className="w-full py-2 bg-red-600 text-white rounded-full text-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
