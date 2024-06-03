import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useAdmin from "../hook/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-200">
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
                  Manage users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviews">
                  <FaHome />
                  Manage reviews
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userProperties">
                  <FaHome />
                  All Properties
                </NavLink>
              </li>
            </>
          )}
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>

        </ul>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
