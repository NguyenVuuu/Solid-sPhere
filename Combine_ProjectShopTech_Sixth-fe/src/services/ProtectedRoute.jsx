import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useTranslation } from 'react-i18next';

const ProtectedRoute = ({ children, requiredRoles = [], requireAuth = true }) => {
  const { t } = useTranslation();
  const { user, loading, getUserRole } = useContext(UserContext);
  const location = useLocation();
  const userRole = getUserRole();

  // Comprehensive debugging
  useEffect(() => {
    console.group("🛡️ ProtectedRoute Debug Info");
    console.log("📍 Route path:", location.pathname);
    console.log("👤 User object:", user);
    console.log("🎭 User role from getUserRole():", userRole);
    console.log("📋 Required roles:", requiredRoles);
    console.log("🔐 Require auth:", requireAuth);
    console.groupEnd();
  }, [location.pathname, user, userRole, requiredRoles]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
      </div>
    );
  }

  // If authentication is required and user is not logged in, redirect to login
  if (requireAuth && !user) {
    console.log("❌ No user found - redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required, check if user has one of them
  if (requiredRoles.length > 0) {
    const userRoleString = String(userRole || "").toLowerCase();
    console.log("🔍 Normalized user role:", userRoleString);

    const hasRequiredRole = requiredRoles.some(role => {
      const requiredRoleString = String(role).toLowerCase();
      const match = userRoleString === requiredRoleString;

      console.log(`Checking role '${requiredRoleString}': ${match ? '✅' : '❌'}`);
      return match;
    });

    if (!hasRequiredRole) {
      console.log("❌ Access denied - user does not have required role");
      console.log(`User has: ${userRoleString}, Required: ${requiredRoles.join(', ')}`);

      // Redirect to 404 page when user doesn't have required role
      return <Navigate to="/404" replace />;
    }

    console.log("✅ Access granted - user has required role");
  }

  // If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute;
