import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth(): React.ReactElement {
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();

  return cookies.logged_in ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}

export default RequireAuth;
