import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { observeAuthState } from "./redux/slice/authSlice";
import router from "./routes/routes.jsx";

const App = () => {
  //todo: wrap the provider for redux in the app instead of main, after implementing react query

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(observeAuthState());
  }, [dispatch]);
  return <RouterProvider router={router} />;
};

export default App;
