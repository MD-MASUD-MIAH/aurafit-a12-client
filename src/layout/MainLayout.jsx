import { Outlet } from "react-router";

import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <div className="flex-grow">
    <Outlet />
  </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
