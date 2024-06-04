import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Compoents/Home/Home";
import Error from "../Compoents/Error";
import Login from "../Compoents/Home/Credentials/Login";
import SignUp from "../Compoents/Home/Credentials/SignUp";
import Dashboard from "../Layouts/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddProperty from "../Pages/Dashboard/Agent/AddProperties";
import MyAddedProperties from "../Pages/Dashboard/Agent/MyAddedProperties";
import UpdatePropertyForm from "../Pages/Dashboard/Agent/UpdatePropertyForm";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  //  MARK: Dashboard
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,

    // MARK: Admin
    children: [
      {
         path: "users",
         element:  <AllUsers></AllUsers>
      },
      {
        path: 'adminProfile',
        element: <AdminHome></AdminHome>
      },

      //MARK: Agent route
      {
        path: "addProperty",
        element: <AddProperty></AddProperty>
      },
      {
        path: "myProperties",
        element: <MyAddedProperties></MyAddedProperties>
      },
      {
        path: "updateForm/:id",
        element: <UpdatePropertyForm></UpdatePropertyForm>,
        loader: ({params}) => fetch(`http://localhost:5000/propertie/${params.id}`)
      }
   ],
  },
]);
