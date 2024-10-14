import { NavLink } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navLinks = (
    <>
      <ul className="menu menu-horizontal px-1">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 rounded-lg border[#58d4db77]  font-bold  "
                : "font-bold "
            }
          >
            <span className="p-2 text-lg font-bold">Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 rounded-lg border[#58d4db77]  font-bold  "
                : "font-bold "
            }
          >
            <span className="p-2 text-lg font-bold">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/allProperties"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 rounded-lg border[#58d4db77]  font-bold  "
                : "font-bold "
            }
          >
            <span className="p-2 text-lg font-bold">All Properties</span>
          </NavLink>
        </li>
        
        {!user && (
          <li>
            <NavLink to="/login">
              <span className="p-1  text-lg font-bold">Login</span>
            </NavLink>
          </li>
        )}
      </ul>
    </>
  );
  return (
    <div className="navbar   shadow-xl  mx-auto">
      <div className="flex-1">
        <div className="dropdown relative">
          <div tabIndex={0} role="button" className="btn btn-ghost ">
            <NavLink to="/" className="flex gap-2 items-center">
              <img
                className="w-full h-12 rounded-full border-4 border-gray-400"
                src="https://i.ibb.co/CVjTYfB/Screenshot-2024-06-01-123321.png"
                alt=""
              />
              <span className="font-bold text-4xl">EestateElite</span>
            </NavLink>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  z-50  shadow bg-base-100 rounded-box w-52 lg:hidden"
          >
            {navLinks}
          </ul>
        </div>
      </div>
      <div className="flex-none">
        <div className="hidden lg:block">{navLinks}</div>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-gray-200 block text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
