import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Compoents/Home/Home";
import Error from "../Compoents/Error";
import Login from "../Compoents/Home/Credentials/Login";
import SignUp from "../Compoents/Home/Credentials/SignUp";

 export const router = createBrowserRouter([
    {
     path: '/',
     element: <Root></Root>,
     errorElement: <Error></Error>,
     children: [ 
        {
            path: '/',
            element: <Home></Home>
        },
        {
         path:'login',
         element: <Login></Login>
        },
        {
         path:'signup',
         element: <SignUp></SignUp>
        }
     ]
    },
  ]);