import { useMemo } from 'react';
import { Redirect, Route, useLocation } from 'react-router';
import { useSession } from '../contexts/AuthProvider';


export default function PrivateRoute({ children, role, ...rest }) {
  const { isAuthed, hasRole, ready: authReady} = useSession();
  
  const { pathname } = useLocation();

  const canShowRoute = useMemo(() => {
    if (!role) return isAuthed && authReady;
    return isAuthed && authReady && hasRole(role);
  }, [isAuthed, role, hasRole, authReady]);

  return (
    <Route {...rest}>
      {
        canShowRoute ? (
          children
        ) : (
          <Redirect from={pathname} to="/login" />
        )
      }
    </Route>
  );
}