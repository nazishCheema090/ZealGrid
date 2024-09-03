import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../protected-routes/private-route/page";
import Home from "../pages/home/page";
import CreateProject from "../pages/create-project/page";
import SignInPage from "../pages/sign-in/page";


const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: '/add-project',
      element: (
        <PrivateRoute>
          <CreateProject />
        </PrivateRoute>
      ),
    },
    {
      path: '/signin',
      element: <SignInPage />,
    },
  ]);

export default router;