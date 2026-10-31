/**
 * JWT Utility Functions
 * Handles JWT token parsing and validation for frontend
 */

/**
 * Decode JWT token (Base64 decode)
 * @param {string} token - JWT token
 * @returns {object|null} Decoded token payload or null if invalid
 */
export const decodeJWT = (token) => {
  try {
    if (!token) return null;

    // JWT structure: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid JWT format');
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    
    // Base64 decode with URL-safe characters handling
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if expired, false otherwise
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;

    // exp is in seconds, Date.now() is in milliseconds
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

/**
 * Get user role from JWT token
 * Backend stores role in 'scope' claim as "ROLE_ADMIN", "ROLE_CUSTOMER", etc.
 * @param {string} token - JWT token
 * @returns {string|null} User role (admin, customer, customer_service) or null
 */
export const getRoleFromToken = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.scope) return null;

    const scope = decoded.scope;
    
    // Extract role from scope (e.g., "ROLE_ADMIN" -> "admin")
    if (scope.includes('ROLE_ADMIN')) return 'admin';
    if (scope.includes('ROLE_CUSTOMER_SERVICE')) return 'customer_service';
    if (scope.includes('ROLE_CUSTOMER')) return 'customer';
    if (scope.includes('ROLE_GUEST')) return 'guest';

    return null;
  } catch (error) {
    console.error('Error getting role from token:', error);
    return null;
  }
};

/**
 * Get user email from JWT token
 * Backend stores email in 'sub' (subject) claim
 * @param {string} token - JWT token
 * @returns {string|null} User email or null
 */
export const getEmailFromToken = (token) => {
  try {
    const decoded = decodeJWT(token);
    return decoded?.sub || null;
  } catch (error) {
    console.error('Error getting email from token:', error);
    return null;
  }
};

/**
 * Get full user info from JWT token
 * @param {string} token - JWT token
 * @returns {object|null} User info object or null
 */
export const getUserInfoFromToken = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded) return null;

    return {
      email: decoded.sub,
      role: getRoleFromToken(token),
      exp: decoded.exp,
      iat: decoded.iat,
      jti: decoded.jti,
      type: decoded.type // ACCESS_TOKEN or REFRESH_TOKEN
    };
  } catch (error) {
    console.error('Error getting user info from token:', error);
    return null;
  }
};

/**
 * Check if token is a refresh token
 * @param {string} token - JWT token
 * @returns {boolean} True if refresh token, false otherwise
 */
export const isRefreshToken = (token) => {
  try {
    const decoded = decodeJWT(token);
    return decoded?.type === 'REFRESH_TOKEN';
  } catch (error) {
    console.error('Error checking token type:', error);
    return false;
  }
};

/**
 * Get time until token expires (in seconds)
 * @param {string} token - JWT token
 * @returns {number} Seconds until expiration, or 0 if expired
 */
export const getTimeUntilExpiry = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return 0;

    const currentTime = Date.now() / 1000;
    const timeLeft = decoded.exp - currentTime;
    
    return timeLeft > 0 ? Math.floor(timeLeft) : 0;
  } catch (error) {
    console.error('Error getting time until expiry:', error);
    return 0;
  }
};
