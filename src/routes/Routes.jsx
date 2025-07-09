import { createBrowserRouter } from "react-router";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PriveteRoute from "../Context/PriveteRoute";
import DashBoard from "../DashBoard/DashBoard";
import Home from "../Home/Home";
import DashBoardLayout from "../layout/DashBoardLayout";
import MainLayout from "../layout/MainLayout";
import Subscribers from "../DashBoard/adminPage/Subscribers";
import BeATrainer from "../DashBoard/meber/BeATrainer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PriveteRoute>
        <DashBoardLayout></DashBoardLayout>
      </PriveteRoute>
    ),
    children: [{ index: true, Component: DashBoard },

     {path:'subscribers', Component:Subscribers },
    {path:'beTrainer',Component:BeATrainer}

         
    ],
  },
]);
