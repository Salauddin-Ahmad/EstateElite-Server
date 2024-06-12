import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import useRole from '../hook/useRole';

const AgentRoutes = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return  <div className="flex justify-center items-center pt-28" >
  <div className="  w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
  </div>; 
  
  if (role === 'agent') return children;
  return <Navigate to='/dashboard' />;
};

export default AgentRoutes;

AgentRoutes.propTypes = {
  children: PropTypes.element,
};
