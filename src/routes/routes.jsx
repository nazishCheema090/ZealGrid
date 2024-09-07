import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../protected-routes/private-route/page";
import Home from "../pages/home/page";
import CreateProject from "../pages/create-project/page";
import SignInPage from "../pages/sign-in/page";
import PageNotFound from "../pages/page-not-found/page";
import ProjectDetails from "../pages/project-details/page";
import Overview from "../pages/overview/page";
import Settings from "../pages/settings/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-project",
    element: (
      <PrivateRoute>
        <CreateProject />
      </PrivateRoute>
    ),
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/project-details",
    element: (
      <PrivateRoute>
        <ProjectDetails />
      </PrivateRoute>
    ),
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
