import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { observeAuthState } from "./redux/slice/authSlice";
import router from "./routes/routes.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  //todo: wrap the provider for redux in the app instead of main, after implementing react query

  // const dispatch = useDispatch();
  const queryClient = new QueryClient();

  // useEffect(() => {
  //   dispatch(observeAuthState());
  // }, [dispatch]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
