import { Outlet } from "react-router";

import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div className="urban">
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
