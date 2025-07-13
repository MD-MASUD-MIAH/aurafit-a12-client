import { createBrowserRouter } from "react-router";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AllClass from "../components/AllClass";
import AllTrainer from "../components/AllTrainer";
import BookingPage from "../components/BookingPage";
import TainerDeatilsPage from "../components/TainerDeatilsPage";
import PriveteRoute from "../Context/PriveteRoute";
import AddClass from "../DashBoard/adminPage/AddClass";
import ApproveTrainer from "../DashBoard/adminPage/ApproveTrainer";
import PendingDetails from "../DashBoard/adminPage/PendingDetails";
import PendingTrainer from "../DashBoard/adminPage/PendingTrainer";
import Subscribers from "../DashBoard/adminPage/Subscribers";
import DashBoard from "../DashBoard/DashBoard";
import ActivityLogPage from "../DashBoard/meber/ActivityLogPage";
import BeATrainer from "../DashBoard/meber/BeATrainer";
import BookedTrainer from "../DashBoard/meber/BookedTrainer";
import MyProfile from "../DashBoard/meber/MyProfile";
import PaymentPage from "../DashBoard/meber/PaymentPage";
import AddNewSlots from "../DashBoard/trainer/AddNewSlots";
import ManageSlots from "../DashBoard/trainer/ManageSlots";
import Home from "../Home/Home";
import DashBoardLayout from "../layout/DashBoardLayout";
import MainLayout from "../layout/MainLayout";
import ClassContainer from "../components/ClassContainer";
import PostForums from "../DashBoard/adminPage/PostForums";
import SingleVotePage from "../Home/SingleVotePage";
import ForumPostPage from "../Home/SingleVotePage";
import ForumsPage from "../Home/ForumsPage";
import AllForums from "../Home/AllForums";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
      {
        path: "/allTrainer",

        Component: AllTrainer,
      },
      {
        path: "/trainer/:id",
        element: (
          <PriveteRoute>
            <TainerDeatilsPage></TainerDeatilsPage>
          </PriveteRoute>
        ),
      },
      {
        path: "/book/:id",
        element: (
          <PriveteRoute>
            <BookingPage></BookingPage>
          </PriveteRoute>
        ),
      },
      {
        path: "beTrainer",
        element: (
          <PriveteRoute>
            <BeATrainer></BeATrainer>
          </PriveteRoute>
        ),
      },
      { path: "/allClass", Component: ClassContainer },
      {path:'/forums',Component:AllForums

    },
      {path:'/forums/:id',Component:SingleVotePage},
      {
        path: "/payment",
        element: (
          <PriveteRoute>
            {" "}
            <PaymentPage></PaymentPage>
          </PriveteRoute>
        ),
      },
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
      { path: "pending-trainer", Component: PendingTrainer },
      { path: "pending-details/:id", Component: PendingDetails },
      { path: "approve", Component: ApproveTrainer },
      { path: "activityLogPage", Component: ActivityLogPage },
      { path: "my-profile", Component: MyProfile },
      {
        path: "booked",
        element: (
          <PriveteRoute>
            <BookedTrainer></BookedTrainer>
          </PriveteRoute>
        ),
      },

      { path: "addSlots", Component: AddNewSlots },
      { path: "menageSlots", Component: ManageSlots },
      {path:'postForums',Component:PostForums},
   

    ],
  },
]);
