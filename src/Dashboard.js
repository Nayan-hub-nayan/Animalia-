import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {


 

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Responsive sidebar for smaller screens */}
      <div className="md:hidden fixed z-10 w-full bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100 overflow-auto mt-10 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
