import { useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/userRole";
const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { user, logout } = useAuth();

  const {role} = useRole()

  console.log(role);
  

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire(
              "Logged Out!",
              "You have been successfully logged out.",
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "Something went wrong while logging out.",
              "error"
            );
          });
      }
    });
  };

  console.log(user?.email);

  return (
    <div className="sticky top-0 z-20">
      <header className="relative  z-20 w-full border-b border-slate-200 bg-[#2563EB] shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden text-black md:text-white  ">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex items-center justify-between"
            role="navigation"
          >
            {/* Brand logo */}
            <p
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center text-black lg:text-white font-bold text-xl gap-2 whitespace-nowrap py-3 focus:outline-none lg:flex-1 pl-4"
              href="javascript:void(0)"
            >
              <img className="w-12 h-12" src={logo} alt="" />
              AuraFit
            </p>

            {/* Mobile trigger */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
            ${
              isToggleOpen
                ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0"
                : ""
            }
          `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform ">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>

            {/* Navigation links */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute  left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <NavLink
                  onClick={() => setIsToggleOpen(!isToggleOpen)}
                  to="/"
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-black lg:text-white"
                  href="javascript:void(0)"
                >
                  <span>Home</span>
                </NavLink>
              </li>
              <li role="none" className="flex items-stretch">
                <NavLink
                  to={"/allTrainer"}
                  onClick={() => setIsToggleOpen(!isToggleOpen)}
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center text-black lg:text-white  gap-2 py-4 font-normal transition-colors duration-300 hover:text-blue-400 focus:text-black focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>All Trainer</span>
                </NavLink>
              </li>
              <li role="none" className="flex items-stretch">
                <NavLink
                  to={"/allClass"}
                  onClick={() => setIsToggleOpen(!isToggleOpen)}
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center text-black lg:text-white  gap-2 py-4 font-normal transition-colors duration-300 hover:text-blue-400 focus:text-black focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>All Classes</span>
                </NavLink>
              </li>
              <li role="none" className="flex items-stretch">
                <NavLink
                  to={"/forums"}
                  onClick={() => setIsToggleOpen(!isToggleOpen)}
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center text-black lg:text-white  gap-2 py-4 font-normal transition-colors duration-300 hover:text-blue-400 focus:text-black focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Forums</span>
                </NavLink>
              </li>
              {user && (
                <li role="none" className="flex items-stretch">
                  <NavLink
                    onClick={() => setIsToggleOpen(!isToggleOpen)}
                    to="/dashboard"
                    role="menuitem"
                    aria-haspopup="false"
                    className="flex items-center text-black lg:text-white  gap-2 py-4 font-normal transition-colors duration-300 hover:text-blue-400 focus:text-black focus:outline-none focus-visible:outline-none lg:px-8"
                    href="javascript:void(0)"
                  >
                    <span>Dashboard</span>
                  </NavLink>
                </li>
              )}
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsToggleOpen(!isToggleOpen);
                  }}
                  role="none"
                  className="flex items-stretch block md:hidden"
                >
                  <a
                    role="menuitem"
                    aria-haspopup="false"
                    className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                    href="javascript:void(0)"
                  >
                    <span className="nav-btn">Logout</span>
                  </a>
                </button>
              ) : (
                <NavLink
                  to={"/login"}
                  role="none"
                  className="flex items-stretch block md:hidden"
                >
                  <span className="tom-btn">Login</span>
                </NavLink>
              )}
            </ul>

            {/* Actions */}
            <div className="ml-auto flex items-center justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0">
              {user ? (
                <div className="flex gap-4">
                  <Link to={"/dashboard/my-profile"}>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className=" hidden md:block border nav-btn "
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div aria-haspopup="false" className="flex gap-4">
                  <NavLink to="/login" className="nav-btn hidden md:block ">
                    Login
                  </NavLink>
                  <NavLink to={"/register"} className="nav-btn hidden md:block">
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
