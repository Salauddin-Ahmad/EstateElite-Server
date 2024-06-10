import { NavLink, Outlet,  } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useAdmin from "../hook/useAdmin";
import useAgent from "../hook/useAgent";
// import useAuth from "../hook/useAuth";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();
  return (
<>
<div className="w-full h-16 bg-slate-500 " >
 <p className="flex items-center justify-center text-gray-300 text-2xl pt-3"> {isAdmin && "Administrator Dashboard"}</p>
</div>



<div className="flex">
      <div className="w-64 min-h-screen bg-slate-200">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminProfile">
                  <FaHome />
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageProperties">
                  <FaHome />
                  Manage Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaHome />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviews">
                  <FaHome />
                  Manage Reviews
                </NavLink>
              </li>
            </>
          ) : isAgent ? (
            <>
              <li>
                <NavLink to="/dashboard/agentProfile">
                  <FaHome />
                  Agent Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addProperty">
                  <FaHome />
                  Add Property
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myProperties">
                  <FaHome />
                  My Added Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mySoldProperties">
                  <FaHome />
                  My Sold Properties
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requestedProperties">
                  <FaHome />
                  Requested Properties
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userProfile">
                  <FaHome />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/wishlist">
                  <FaHome />
                  Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/propertyBought">
                  <FaHome />
                  Property Bought
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myReviews">
                  <FaHome />
                  My Reviews
                </NavLink>
              </li>
            </>
          )}
          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
</>
  );
};

export default Dashboard;
