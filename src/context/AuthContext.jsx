import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig'; // Import the Firebase authentication module
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'; // Import necessary Firebase auth functions

// Create a context for authentication
const AuthContext = React.createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the application and provide auth state
export const AuthProvider = ({ children }) => {
  // State to store the current user
  const [currentUser, setCurrentUser] = useState(null);
  // State to handle loading state
  const [loading, setLoading] = useState(true);

  // Function to handle user sign-in
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to handle user sign-out
  const signOut = () => {
    return firebaseSignOut(auth);
  };

  // useEffect to manage the authentication state
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user
      setLoading(false); // Set loading to false once auth state is determined
    });

    // Clean up the subscription on unmount
    return unsubscribe;
  }, []);

  // Value to be provided by the AuthContext
  const value = {
    currentUser,
    signIn,
    signOut,
  };

  return (
    // Provide the auth state and functions to the rest of the application
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when loading is complete */}
    </AuthContext.Provider>
  );
};
