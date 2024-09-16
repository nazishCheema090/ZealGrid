// src/components/PrivateRoute.js

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthState } from "../../hooks/useAuthState";
import Loading from "../../components/common/Loading";
const PrivateRoute = ({ children }) => {
  const { data: currentUser, isLoading } = useAuthState();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading size={50} thickness={5} color="primary" />
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
