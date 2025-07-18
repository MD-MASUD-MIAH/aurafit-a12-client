import { createBrowserRouter } from "react-router";
import Login from "../auth/Login";
import Register from "../auth/Register";
import AllTrainer from "../components/AllTrainer";
import BookingPage from "../components/BookingPage";
import ClassContainer from "../components/ClassContainer";
import CookiePolicy from "../components/CookiePolicy";
import NotFoundError from "../components/NotFoundError";
import PrivacyPolicy from "../components/PrivacyPolicy";
import Profile from "../components/Profile";
import TainerDeatilsPage from "../components/TainerDeatilsPage";
import TermsOfService from "../components/TermsOfService";
import AdminAccess from "../Context/AdminAccess";
import PriveteRoute from "../Context/PriveteRoute";
import TrainerAccess from "../Context/TrainerAccess";
import AddClass from "../DashBoard/adminPage/AddClass";
import ApproveTrainer from "../DashBoard/adminPage/ApproveTrainer";
import Balance from "../DashBoard/adminPage/Balance";
import PendingDetails from "../DashBoard/adminPage/PendingDetails";
import PendingTrainer from "../DashBoard/adminPage/PendingTrainer";
import PostForums from "../DashBoard/adminPage/PostForums";
import Subscribers from "../DashBoard/adminPage/Subscribers";
import DashBoard from "../DashBoard/DashBoard";
import ActivityLogPage from "../DashBoard/meber/ActivityLogPage";
import BeATrainer from "../DashBoard/meber/BeATrainer";
import BookedTrainer from "../DashBoard/meber/BookedTrainer";
import MyProfile from "../DashBoard/meber/MyProfile";
import PaymentPage from "../DashBoard/meber/PaymentPage";
import AddNewSlots from "../DashBoard/trainer/AddNewSlots";
import ManageSlots from "../DashBoard/trainer/ManageSlots";
import AllForums from "../Home/AllForums";
import Home from "../Home/Home";
import SingleVotePage from "../Home/SingleVotePage";
import DashBoardLayout from "../layout/DashBoardLayout";
import MainLayout from "../layout/MainLayout";
import AdminTrainerAcess from "../Context/AdminTrainerAcess";
import MemberAccess from "../Context/MemberAccess";
import Loader from "../shared/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundError></NotFoundError>,
    hydrateFallbackElement:<Loader></Loader>,
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
      {
        path: "/profile",
        element: (
          <PriveteRoute>
            <Profile></Profile>
          </PriveteRoute>
        ),
      },
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
      { path: "/forums", Component: AllForums },
      { path: "/forums/:id", Component: SingleVotePage },
      { path: "/privacyPolicy", Component: PrivacyPolicy },
      { path: "/termsOfService", Component: TermsOfService },
      { path: "/cookiePolicy", Component: CookiePolicy },
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

      {
        path: "subscribers",
        element: (
          <PriveteRoute>
            <AdminAccess>
              <Subscribers></Subscribers>
            </AdminAccess>
          </PriveteRoute>
        ),
      },
      { path: "addClass", element:<PriveteRoute><AdminAccess><AddClass></AddClass></AdminAccess></PriveteRoute>},
      { path: "pending-trainer", element:<PriveteRoute><AdminAccess><PendingTrainer></PendingTrainer></AdminAccess></PriveteRoute> },
      { path: "pending-details/:id", element:<PriveteRoute><AdminAccess><PendingDetails></PendingDetails></AdminAccess></PriveteRoute> },
      { path: "approve",element:<PriveteRoute><AdminAccess><ApproveTrainer></ApproveTrainer></AdminAccess></PriveteRoute>},
      { path: "activityLogPage", element:<PriveteRoute><MemberAccess><ActivityLogPage></ActivityLogPage></MemberAccess></PriveteRoute> },
      { path: "my-profile", element: <PriveteRoute><MemberAccess><MyProfile></MyProfile></MemberAccess></PriveteRoute> },
      {
        path: "booked",
        element: (
          <PriveteRoute>
          <MemberAccess> <BookedTrainer></BookedTrainer></MemberAccess>
          </PriveteRoute>
        ),
      },

      {
        path: "addSlots",
        element: (
          <PriveteRoute>
            <TrainerAccess>
              <AddNewSlots></AddNewSlots>
            </TrainerAccess>
          </PriveteRoute>
        ),
      },
      {
        path: "menageSlots",
        element: (
          <PriveteRoute>
            <TrainerAccess>
              <ManageSlots></ManageSlots>
            </TrainerAccess>
          </PriveteRoute>
        ),
      },
      { path: "postForums", element:<PriveteRoute><AdminTrainerAcess><PostForums></PostForums></AdminTrainerAcess></PriveteRoute> },
      { path: "balance", element:<PriveteRoute><AdminAccess><Balance></Balance></AdminAccess></PriveteRoute> },
    ],
  },
]);
