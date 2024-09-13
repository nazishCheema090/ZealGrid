import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/page";
import Topbar from "../../components/topbar/page";

const Dashboard = () => {
  return (
    <div
      className="flex overflow-hidden
    "
    >
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
