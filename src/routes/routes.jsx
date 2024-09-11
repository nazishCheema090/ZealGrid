import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../protected-routes/private-route/page";
import Home from "../pages/home/page";
import CreateProject from "../pages/create-project/page";
import SignInPage from "../pages/sign-in/page";
import PageNotFound from "../pages/page-not-found/page";
import Overview from "../pages/overview/page";
import Settings from "../pages/settings/page";
import Labels from "../pages/labels/page";
import Toggles from "../pages/toggles/page";
import Navigation from "../pages/navigation/page";
import ProjectApp from "../pages/project-app/page";
import Dashboard from "../pages/dashboard/page";

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
    path: "/dashboard/:projectName",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "labels",
        element: <Labels />,
      },
      {
        path: "toggles",
        element: <Toggles />,
      },
      {
        path: "navigation",
        element: <Navigation />,
      },
      {
        path: "app",
        element: <ProjectApp />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
