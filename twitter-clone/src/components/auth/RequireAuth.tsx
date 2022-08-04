import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export function RequireAuth({ children, required = true }: { children: JSX.Element, required?: boolean }) {
  let auth = useAuth();
  let location = useLocation();

  if (required) {
    if (!auth.user) {
      return <Navigate to="/signin" state={{ from: location }} replace />;
    }
  } else {
    if (auth.user) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }


  return children;
}
