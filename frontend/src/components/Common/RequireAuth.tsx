import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCookie } from 'typescript-cookie';

function RequireAuth(): React.ReactElement {
  const location = useLocation();
  return getCookie('logged_in') === 'true' ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}

export default RequireAuth;
