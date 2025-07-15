import { useState } from "react";
import { CiBookmarkCheck } from "react-icons/ci";
import {
  FaBell,
  FaCheckCircle,
  FaHome,
  FaMoneyBill,
  FaPlus,
  FaTasks,
  FaUserCheck,
  FaWallet,
} from "react-icons/fa";
import { MdManageHistory, MdPostAdd } from "react-icons/md";

import { NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";
import useRole from "../hooks/userRole";

const DashBoardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { role } = useRole();

  console.log(role);

  return (
    <div className="flex h-screen ">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 mt-14 md:mt-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-20 w-64 bg-blue-600 text-white`}
      >
        <NavLink
          to={"/"}
          className="flex items-center gap-4 justify-center h-16 px-4 border-b border-gray-700"
        >
          <img className="h-10 w-10" src={logo} alt="" />
          <h1 className="text-xl font-semibold">AuraFit</h1>
        </NavLink>
        <nav className="px-4 py-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-700 rounded-md ${
                    isActive ? "bg-blue-500" : "hover:bg-blue-700"
                  }`
                }
              >
                <FaHome className="mr-3" />
                Home
              </NavLink>
            </li>
            <li>
              {role?.role === "admin" && (
                <NavLink
                  to="/dashboard/subscribers"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <FaBell className="mr-3" />
                  Subscribers
                </NavLink>
              )}
            </li>

            <li>
              <NavLink
                to="/dashboard/addClass"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive ? "bg-blue-500" : "hover:bg-blue-700"
                  }`
                }
              >
                <FaPlus className="mr-3"></FaPlus>
                Add Class
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/approve"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive ? "bg-blue-500" : "hover:bg-blue-700"
                  }`
                }
              >
                <FaUserCheck className="mr-3" />
                Available Trainers
              </NavLink>
            </li>

            <>
              <li>
                <NavLink
                  to="/dashboard/pending-trainer"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <FaTasks className="mr-3" />
                  Pending Trainer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/activityLogPage"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <FaCheckCircle className="mr-3" />
                  Activity Log Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <FaWallet className="mr-3" />
                  My Profile
                </NavLink>
              </li>
            </>

            {/* Admin links */}
            <>
              <li>
                <NavLink
                  to="/dashboard/booked"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <CiBookmarkCheck className="mr-3" />
                  Booked Trainer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addSlots"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <FaPlus className="mr-3"></FaPlus>
                  Add Slots
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/menageSlots"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <MdManageHistory className="mr-3" />
                  Manage Slots
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/postForums"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <MdPostAdd className="mr-3" />
                  Post Forums
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/balance"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive ? "bg-blue-500" : "hover:bg-blue-700"
                    }`
                  }
                >
                  <FaMoneyBill className="mr-3" />
                  Balance
                </NavLink>
              </li>
            </>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <main className="flex-1 overflow-y-auto py-6 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
