import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut as firebaseSignOut, sendPasswordResetEmail } from 'firebase/auth';
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
  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to handle user sign-out
  const signOut = async () => {
    return firebaseSignOut(auth).then(() => {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    });
  };

  // Function to handle password reset
  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);
          if (token) {
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
          } else {
            setCurrentUser(null);
            localStorage.removeItem('currentUser');
          }
        } catch (error) {
          setCurrentUser(null);
          localStorage.removeItem('currentUser');
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

// Define PropTypes for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
