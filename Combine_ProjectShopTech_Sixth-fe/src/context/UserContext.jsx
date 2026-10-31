// Enhanced UserContext.js
import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { loginContext as realLogin, logoutContext as realLogout } from "../services/LoginServices";
import { getRoleFromToken, isTokenExpired } from "../utils/jwtUtils";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  // Login function - Using Real Authentication
  const login = useCallback(async (credentials) => {
    try {
      const user = await realLogin(credentials);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return user;
      } else {
        throw new Error("Đăng nhập thất bại");
      }
    } catch (err) {
      if (err.message) {
        throw new Error(err.message);
      } else {
        throw new Error("Đăng nhập thất bại, vui lòng thử lại sau");
      }
    }
  }, []);

  // Memoized user role - only recalculate when user changes
  const userRole = useMemo(() => {
    if (!user) return null;

    // First try to get role from user object (which comes from JWT)
    let roleValue = user?.role;

    // If not in user object, try to get from token
    if (!roleValue) {
      const token = localStorage.getItem('authToken');
      if (token) {
        roleValue = getRoleFromToken(token);
      }
    }

    // Return role in lowercase for consistent comparison
    return roleValue ? String(roleValue).toLowerCase() : null;
  }, [user]);

  // Get user role function - returns cached value
  const getUserRole = useCallback(() => {
    return userRole;
  }, [userRole]);

  // Memoized role checks - only recalculate when role changes
  const isAdmin = useMemo(() => userRole === "admin", [userRole]);
  const isCustomerService = useMemo(() => userRole === "customer_service", [userRole]);
  const isCustomer = useMemo(() => userRole === "customer", [userRole]);
  const isGuest = useMemo(() => userRole === "guest", [userRole]);

  // Logout function - Using Real Authentication
  const logout = useCallback(async () => {
    try {
      await realLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear user state and local storage
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  }, []);

  // Check authentication on mount - Using Real Authentication
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        const savedUser = localStorage.getItem("user");

        if (token) {
          // Special-case for OAuth2 flow using local marker token 'google'
          if (token === 'google') {
            if (savedUser) {
              const parsedUser = JSON.parse(savedUser);
              setUser(parsedUser);
            } else {
              setUser(null);
            }
          } else if (isTokenExpired(token)) {
            // Token is expired, clearing auth data
            setUser(null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
          } else if (savedUser) {
            // Parse saved user from localStorage
            const parsedUser = JSON.parse(savedUser);

            // Verify role from token matches saved user
            const roleFromToken = getRoleFromToken(token);
            if (roleFromToken && parsedUser.role !== roleFromToken) {
              // Role mismatch, updating user role from token
              parsedUser.role = roleFromToken;
              localStorage.setItem("user", JSON.stringify(parsedUser));
            }

            setUser(parsedUser);
          } else {
            // Token exists but no saved user, clearing token
            setUser(null);
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
          }
        } else {
          // No token found
          setUser(null);
        }
      } catch (error) {
        console.error("Auto-login error:", error);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Update user function
  const updateUser = useCallback((updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }, [user]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    loading,
    getUserRole,
    isAdmin,
    isCustomerService,
    isCustomer,
    isGuest,
    updateUser
  }), [user, loading, login, logout, getUserRole, isAdmin, isCustomerService, isCustomer, isGuest, updateUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
// Updated: 2025-10-12T16:06:31.045Z

// Updated: 2025-10-12T16:09:08.038Z
