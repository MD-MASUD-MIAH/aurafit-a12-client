import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Home/Home";

export  const router = createBrowserRouter([

    {path:'/', Component:MainLayout, children:[

        {index:true, Component:Home
                    }
    ]

    }
])