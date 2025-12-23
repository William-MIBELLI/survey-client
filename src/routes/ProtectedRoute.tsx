import React from "react";
import { useAuthContext } from "../contexts/auth.context";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  return (
    <div>
      {loading ? (
        <div>...</div>
      ) : user ? (
        <Outlet />
      ) : (
        // <Navigate to={"/login"} replace state={{ from: location }} />
        <Outlet />
      )}
    </div>
  );
};

export default ProtectedRoute;
