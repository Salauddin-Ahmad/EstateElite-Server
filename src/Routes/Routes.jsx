import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Compoents/Home/Home";
import Error from "../Compoents/Error";
import Login from "../Compoents/Home/Credentials/Login";
import SignUp from "../Compoents/Home/Credentials/SignUp";
import Dashboard from "../Layouts/Dashboard";
import AddProperty from "../Pages/Dashboard/Agent/AddProperties";
import MyAddedProperties from "../Pages/Dashboard/Agent/MyAddedProperties";
import UpdatePropertyForm from "../Pages/Dashboard/Agent/UpdatePropertyForm";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import ManageProperty from "../Pages/Dashboard/Admin/ManageProperty";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import MyProfile from "../Pages/Dashboard/UserPanel/MyProfile";
import AllProperties from "../Compoents/AllProperties/AllProperties";
import PropertyDetails from "../Compoents/AllProperties/PropertyDetails";
import Wishlist from "../Pages/Dashboard/UserPanel/Wishlist";
import OfferPage from "../Pages/Dashboard/UserPanel/OfferPage";
import PropertyBought from "../Pages/Dashboard/UserPanel/PropertyBought";
import RequestedProperty from "../Pages/Dashboard/Agent/RequestedProperty";
import AgentProfile from "../Pages/Dashboard/Agent/AgentProfile";
import MyReviews from "../Pages/Dashboard/UserPanel/MyReviews";

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
      {
        path: "allProperties",
        element: <AllProperties></AllProperties>
      },
      {
        path: "property/:id",
        element: <PropertyDetails></PropertyDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/propertie/${params.id}`)
      }
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
      {
        path: "manageProperties",
        element: <ManageProperty></ManageProperty>
      },

      //MARK: Agent route
      {
        path: 'agentProfile',
        element: <AgentProfile></AgentProfile>
      }
      ,
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
      },
      {
        path: 'requestedProperties',
        element: <RequestedProperty></RequestedProperty>
      },


      // MARK: USER related 
      {
        path: "userProfile",
        element: <MyProfile></MyProfile>
      },
      {
        path: "wishlist",
        element: <Wishlist></Wishlist>
      },
      {
        path: "offerPage/:id",
        element: <OfferPage></OfferPage>,
      },
      {
        path: "propertyBought",
        element: <PropertyBought></PropertyBought>
      },
      {
        path: 'myReviews',
        element: <MyReviews></MyReviews>
      },
   ],
  },
]);
