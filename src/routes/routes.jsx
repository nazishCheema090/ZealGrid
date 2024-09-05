import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../protected-routes/private-route/page";
import Home from "../pages/home/page";
import CreateProject from "../pages/create-project/page";
import SignInPage from "../pages/sign-in/page";
import PageNotFound from "../pages/page-not-found/page";


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
    {
      path : '*',
      element : <PageNotFound/>
    }
  ]);

export default router;