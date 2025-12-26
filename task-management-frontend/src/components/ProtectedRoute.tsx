import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router';
import { isAuthenticated } from '@/utils/auth';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Use query parameter approach for redirect URL
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }

  return children;
}
