// src/components/Sidebar.jsx
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMoneyCheckAlt,
  FaTruckMoving,
  FaPenFancy,
  FaBoxes,
  FaUsers,
  FaFileInvoiceDollar,
  FaGasPump,
  FaUserAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaDog,

  FaPaw,
  FaStethoscope,
  FaFileMedical,
  FaCalendarCheck,
  FaExclamationTriangle,
  FaCreditCard,
  FaUserMd,
  FaHeart,
  
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

import logo from "./assets/Logo.png";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const role="Client"
  const email= "abc@abco.cl"

  const handleLogout = () => {
console.log("logout");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaTachometerAlt />,
    roles: ["Client"],
  },
  {
    name: "Add Pets",
    path: "/dashboard/add-pets",
    icon: <FaPaw />,
    roles: ["Client"],
  },{
    name: "Pet Profiles",
    path: "/dashboard/pet-profile",
    icon: <FaDog />,
    roles: ["Client"],
  },
  {
    name: "Services",
    path: "/dashboard/service",
    icon: <FaStethoscope />,
    roles: ["Client"],
  },
  {
    name: "OPD Records",
    path: "/dashboard/opd-record",
    icon: <FaFileMedical />,
    roles: ["Client"],
  },
  {
    name: "Appointments",
    path: "/dashboard/appoinment",
    icon: <FaCalendarCheck />,
    roles: ["Client"],
  },
  {
    name: "Emergency",
    path: "/dashboard/emergency",
    icon: <FaExclamationTriangle />,
    roles: ["Client"],
  },
  {
    name: "Payments",
    path: "/dashboard/billing",
    icon: <FaCreditCard />,
    roles: ["Client"],
  },
  {
    name: "Doctor Panel",
    path: "/dashboard/doctor-panel",
    icon: <FaUserMd />,
    roles: ["Client"],
  },
  {
    name: "Health Records",
    path: "/dashboard/health-record",
    icon: <FaHeart />,
    roles: ["Client"],
  },
   {
    name: "Health Records",
    path: "/dashboard/health-record",
    icon: <FaHeart />,
    roles: ["Client"],
  },
  
 

    // {
    //   name: "Credit/Debit",
    //   path: "/dashboard/cr-dr",
    //   icon: <FaMoneyCheckAlt />,
    //   roles: ["admin"],
    // },
    // {
    //   name: "Vehical Profile",
    //   path: "/dashboard/vehical-profile",
    //   icon: <FaTruckMoving />,
    //   roles: ["admin"],
    // },
    // {
    //   name: "Drilling Form",
    //   path: "/dashboard/drilling-form",
    //   icon: <FaPenFancy />,
    //   roles: ["admin"],
    // },
    // {
    //   name: "Stock Management",
    //   path: "/dashboard/stock-management",
    //   icon: <FaBoxes />,
    //   roles: ["admin"],
    // },
    // {
    //   name: "Agent Profiles",
    //   path: "/dashboard/agent-profiles",
    //   icon: <FaUsers />,
    //   roles: ["admin"],
    // },
    // {
    //   name: "Billing",
    //   path: "/dashboard/billing",
    //   icon: <FaFileInvoiceDollar />,
    //   roles: ["admin"],
    // },
    // {
    //   name: "Petrol Pump Profile",
    //   path: "/dashboard/petrol-pump-profile",
    //   icon: <FaGasPump />,
    //   roles: ["admin"],
    // },
    // {
    //   name: "Profile",
    //   path: "/dashboard/profile",
    //   icon: <FaUserAlt />,
    //   roles: ["admin"],
    // },
  ];

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(role)
  );

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          {isOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
        <span>{email}</span>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-20 md:translate-x-0 md:static md:shadow-none`}
      >
        {/* Logo / Title */}
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          <Link to="#" className="flex items-center">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6 h-64 overflow-y-auto">
          <ul className="space-y-2">
            {filteredNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-2 text-base font-medium rounded-lg ${isActive(item.path)
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Role Display */}
        <div className="text-xl flex pl-9 mb-4">
          <FaUserDoctor />
          <h2 className="pl-5 capitalize text-base font-medium">
            {role}
          </h2>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 p-2 text-base font-medium rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white focus:outline-none"
            aria-label="Logout"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
