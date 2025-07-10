import { createBrowserRouter } from "react-router";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AllTrainer from "../components/AllTrainer";
import PriveteRoute from "../Context/PriveteRoute";
import Subscribers from "../DashBoard/adminPage/Subscribers";
import DashBoard from "../DashBoard/DashBoard";
import BeATrainer from "../DashBoard/meber/BeATrainer";
import Home from "../Home/Home";
import DashBoardLayout from "../layout/DashBoardLayout";
import MainLayout from "../layout/MainLayout";
import TainerDeatilsPage from "../components/TainerDeatilsPage";
import BookingPage from "../components/BookingPage";
import AddClass from "../DashBoard/adminPage/AddClass";
import AllClass from "../components/AllClass";
import PendingTrainer from "../DashBoard/adminPage/PendingTrainer";
import PendingDetails from "../DashBoard/adminPage/PendingDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
      { path: "/allTrainer",
       
        Component: AllTrainer },
        {path:'/trainer/:id',element:<PriveteRoute><TainerDeatilsPage></TainerDeatilsPage></PriveteRoute>},
        {path:'/book/:id',element:<PriveteRoute><BookingPage></BookingPage></PriveteRoute>},
         { path: "beTrainer", element:<PriveteRoute><BeATrainer></BeATrainer></PriveteRoute> },
         {path:'/allClass', Component:AllClass }
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PriveteRoute>
        <DashBoardLayout></DashBoardLayout>
      </PriveteRoute>
    ),
    children: [
      { index: true, Component: DashBoard },

      { path: "subscribers", Component: Subscribers },
      { path: "addClass", Component: AddClass },
      {path:'pending-trainer', Component:PendingTrainer},
      {path:'pending-details/:id', Component:PendingDetails}
     
    ],
  },
]);
