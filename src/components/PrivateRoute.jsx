import { useMemo } from "react";
import { Route, Redirect, useLocation, Navigate, Outlet} from "react-router-dom";
import { useSession } from "../contexts/AuthProvider";

export default function PrivateRoute({children, role, ...rest }) {
    const { isAuthed, hasRole } = useSession();
    const { pathname } = useLocation();

    const canShowRoute = useMemo(() => {
        if (!role) return isAuthed;
        return isAuthed && hasRole(role);
    }, [role, isAuthed, hasRole])
    return canShowRoute? children : <Navigate to="/login" />;
}