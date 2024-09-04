// src/components/PrivateRoute.js

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
