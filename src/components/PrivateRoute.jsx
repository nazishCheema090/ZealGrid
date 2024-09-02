// src/components/PrivateRoute.js

import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux';
const PrivateRoute = () => {
  const currentUser = useSelector((state)=> state.auth.currentUser);
  
  // console.log('PrivateRoute currentUser: ', currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
