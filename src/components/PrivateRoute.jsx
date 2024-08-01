// src/components/PrivateRoute.js

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  
  // console.log('PrivateRoute currentUser: ', currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
