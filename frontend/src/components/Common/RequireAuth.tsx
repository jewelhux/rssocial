import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLoginCheckQuery } from '../../redux/features/service/authService';

function RequireAuth(): React.ReactElement {
  const { data: isLoggedIn } = useLoginCheckQuery();
  const location = useLocation();

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
}

export default RequireAuth;
