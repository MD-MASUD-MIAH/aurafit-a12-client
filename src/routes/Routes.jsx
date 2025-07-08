import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Home/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";

export  const router = createBrowserRouter([

    {path:'/', Component:MainLayout, children:[

        {index:true, Component:Home },
        {path:'/register',Component:Register},
        {path:'/login',Component:Login},
    ]

    }
])