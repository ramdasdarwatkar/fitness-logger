import { Navigate } from "react-router-dom";
import { useAuthStore } from "./auth.store";
import React from "react";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
