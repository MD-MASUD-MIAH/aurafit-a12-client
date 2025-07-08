import { Outlet } from "react-router";

import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";

const MainLayout = () => {
  return (
    <div className="poppins">
      <Navbar></Navbar>

      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
