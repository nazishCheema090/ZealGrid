import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig'; // Import the Firebase authentication module
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'; // Import necessary Firebase auth functions
import PropTypes from 'prop-types';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the application and provide auth state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });
  const [loading, setLoading] = useState(true);

  // Function to handle user sign-in
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to handle user sign-out
  const signOut = () => {
    return firebaseSignOut(auth).then(() => {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    });
  };

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed: ', user);
      setCurrentUser(user); // Set the current user
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
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
    <AuthContext.Provider value={value}>
      {!loading && children /* Render children only when loading is complete */}
      {loading && <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

// Define PropTypes for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
