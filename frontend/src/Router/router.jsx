import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import Instructors from "../Pages/Instructors"
import Classes from "../Pages/Classes"
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Register from "../Pages/Register";
import Specific_Class from "../Pages/Specific_Class";
import AdminDashboard from "../Pages/AdminDashboard";
import Instructor from "../Pages/Instructor";
import ClassLayout from "../layout/ClassLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
        {
            path:"/",
            element: <Home/>
        },
        {
          path : "/instructors",
          element : <Instructors />
        },
        {
          path: "classes",
          element: <ClassLayout/>,
          children: [
            {
              path: "",
              element: <Classes/>, 
            },
            {
              path: "specific_class/:id",
              element: <Specific_Class /> 
            }
          ]
        },
        {
          path : "/login",
          element : <Login/>
        },
        {
          path : "/dashboard",
          element : <Dashboard />,
        },
        {
          path : "/login",
          element : <Login />
        },
        {
          path : "/register",
          element : <Register />
        },
        {
          path: "/specific_class/:id",
          element: <Specific_Class />
        },
        {
          path : "/admin",
          element : <AdminDashboard />
        },
        {
          path : "/instructor",
          element : <Instructor />
        }
    ]
  },
]);

export default router;
