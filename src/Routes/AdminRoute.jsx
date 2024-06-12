import { Navigate } from 'react-router-dom';


import PropTypes from 'prop-types';
import useRole from '../hook/useRole';


const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return  <div className="flex justify-center items-center pt-28" >
  <div className="  w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
  </div>;   

  if (role === 'admin') return children;
  return <Navigate to='/dashboard' />;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
