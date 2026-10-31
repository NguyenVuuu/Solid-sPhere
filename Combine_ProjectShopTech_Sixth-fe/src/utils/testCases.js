/**
 * Test Cases for JWT Authentication & Authorization System
 * 
 * Run these manual tests to verify the system works correctly
 */

// ============================================
// 🧪 TEST UTILITIES
// ============================================

/**
 * Helper để decode và xem token trong console
 */
const inspectToken = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.log('❌ No token found');
    return;
  }
  
  import('./src/utils/jwtUtils.js').then(({ decodeJWT, getRoleFromToken, getEmailFromToken, isTokenExpired }) => {
    console.group('🔍 Token Inspector');
    console.log('Token:', token);
    console.log('Decoded:', decodeJWT(token));
    console.log('Role:', getRoleFromToken(token));
    console.log('Email:', getEmailFromToken(token));
    console.log('Expired:', isTokenExpired(token));
    console.groupEnd();
  });
};

/**
 * Helper để clear auth và reset app
 */
const resetAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  console.log('✅ Auth cleared - Please refresh page');
};

// ============================================
// 📋 TEST CASES
// ============================================

/**
 * TEST 1: Login Flow
 * -----------------
 * Mục đích: Verify login process và JWT handling
 */
const TEST_1_Login = {
  name: 'Login Flow',
  steps: [
    '1. Go to /login',
    '2. Enter admin credentials: admin@example.com / password',
    '3. Click Login button'
  ],
  expectedResults: [
    '✅ Should redirect to /admin',
    '✅ Should have authToken in localStorage',
    '✅ Should have refreshToken in localStorage',
    '✅ Should have user object in localStorage',
    '✅ Console should show "Role from JWT token: admin"'
  ],
  verify: () => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Token exists:', !!token);
    console.log('User role:', user.role);
    console.log('Current path:', window.location.pathname);
  }
};

/**
 * TEST 2: Admin Access Control
 * --------------------------
 * Mục đích: Verify admin can access admin pages
 */
const TEST_2_AdminAccess = {
  name: 'Admin Access Control',
  steps: [
    '1. Login as admin (from TEST 1)',
    '2. Navigate to /admin',
    '3. Try to access /admin/calendar',
    '4. Try to access /admin/discounts'
  ],
  expectedResults: [
    '✅ Should see admin dashboard',
    '✅ Should access all /admin/* routes',
    '✅ No redirect or access denied',
    '✅ Console shows "✅ Access granted - user has required role"'
  ]
};

/**
 * TEST 3: Customer Access Restriction
 * ---------------------------------
 * Mục đích: Verify customer CANNOT access admin pages
 */
const TEST_3_CustomerRestriction = {
  name: 'Customer Access Restriction',
  steps: [
    '1. Logout (if logged in)',
    '2. Login as customer: customer@example.com / password',
    '3. Try to navigate to /admin',
    '4. Check console logs'
  ],
  expectedResults: [
    '❌ Should NOT access /admin',
    '✅ Should redirect to /',
    '✅ Console shows "❌ Access denied - user does not have required role"',
    '✅ Console shows "User has: customer, Required: admin"'
  ]
};

/**
 * TEST 4: Unauthenticated Access
 * ----------------------------
 * Mục đích: Verify unauthenticated users are redirected
 */
const TEST_4_UnauthenticatedAccess = {
  name: 'Unauthenticated Access',
  steps: [
    '1. Run resetAuth() in console',
    '2. Try to access /admin',
    '3. Try to access /minigame',
    '4. Try to access /shopping_card_checkout'
  ],
  expectedResults: [
    '✅ Should redirect to /login for all routes',
    '✅ Console shows "❌ No user found - redirecting to login"',
    '✅ Should preserve "from" location in state'
  ],
  verify: resetAuth
};

/**
 * TEST 5: Minigame Protection
 * -------------------------
 * Mục đích: Verify minigame requires authentication
 */
const TEST_5_MinigameProtection = {
  name: 'Minigame Protection',
  steps: [
    '1. Logout (run resetAuth())',
    '2. Try to access /minigame',
    '3. Login as any user',
    '4. Try to access /minigame again'
  ],
  expectedResults: [
    '❌ Step 2: Should redirect to /login',
    '✅ Step 4: Should access minigame successfully',
    '✅ Works for any authenticated user (admin, customer, etc.)'
  ]
};

/**
 * TEST 6: Shopping Checkout Protection
 * ----------------------------------
 * Mục đích: Verify checkout requires authentication
 */
const TEST_6_CheckoutProtection = {
  name: 'Shopping Checkout Protection',
  steps: [
    '1. Logout (run resetAuth())',
    '2. Add items to cart',
    '3. Try to access /shopping_card_checkout',
    '4. Login',
    '5. Try checkout again'
  ],
  expectedResults: [
    '❌ Step 3: Should redirect to /login',
    '✅ Step 5: Should access checkout',
    '✅ Cart items should be preserved'
  ]
};

/**
 * TEST 7: Token Expiration
 * ----------------------
 * Mục đích: Verify expired token handling
 * 
 * Note: Token expires after 60 minutes by default
 * You can manually edit token exp claim to test this faster
 */
const TEST_7_TokenExpiration = {
  name: 'Token Expiration',
  steps: [
    '1. Login as any user',
    '2. Wait for token to expire (or manually edit exp claim)',
    '3. Try to make an API call',
    '4. Check console logs'
  ],
  expectedResults: [
    '✅ Should detect token expiration',
    '✅ Should clear auth data',
    '✅ Should redirect to /login',
    '✅ Console shows "⚠️ Token expired, redirecting to login"'
  ],
  manualTest: `
    // To manually expire token:
    1. Open DevTools > Application > Local Storage
    2. Edit 'authToken' value
    3. Change the 'exp' value in JWT to past timestamp
    4. Refresh page or make API call
  `
};

/**
 * TEST 8: Role Checking in Components
 * ---------------------------------
 * Mục đích: Verify role-based UI rendering
 */
const TEST_8_RoleBasedUI = {
  name: 'Role-Based UI Rendering',
  steps: [
    '1. Login as admin',
    '2. Check header/navbar for admin-specific buttons',
    '3. Logout and login as customer',
    '4. Check header/navbar again'
  ],
  expectedResults: [
    '✅ Admin should see admin-specific UI elements',
    '❌ Customer should NOT see admin UI elements',
    '✅ UI should update based on role'
  ]
};

/**
 * TEST 9: Logout Flow
 * -----------------
 * Mục đích: Verify logout clears all auth data
 */
const TEST_9_Logout = {
  name: 'Logout Flow',
  steps: [
    '1. Login as any user',
    '2. Click logout button',
    '3. Check localStorage',
    '4. Try to access protected route'
  ],
  expectedResults: [
    '✅ authToken should be removed',
    '✅ refreshToken should be removed',
    '✅ user should be removed',
    '✅ Should redirect to /login when accessing protected route'
  ],
  verify: () => {
    console.log('authToken:', localStorage.getItem('authToken'));
    console.log('refreshToken:', localStorage.getItem('refreshToken'));
    console.log('user:', localStorage.getItem('user'));
  }
};

/**
 * TEST 10: JWT Payload Verification
 * -------------------------------
 * Mục đích: Verify JWT contains correct data
 */
const TEST_10_JWTPayload = {
  name: 'JWT Payload Verification',
  steps: [
    '1. Login as admin',
    '2. Run inspectToken() in console',
    '3. Verify payload structure'
  ],
  expectedResults: [
    '✅ Should have "sub" (email) claim',
    '✅ Should have "scope" (role) claim',
    '✅ Should have "exp" (expiration) claim',
    '✅ Should have "iat" (issued at) claim',
    '✅ Should have "jti" (JWT ID) claim',
    '✅ Should have "type" (ACCESS_TOKEN) claim'
  ],
  verify: inspectToken
};

// ============================================
// 🎯 TEST EXECUTION PLAN
// ============================================

const TEST_EXECUTION_PLAN = [
  '1. Run TEST_1 (Login) - Verify basic authentication works',
  '2. Run TEST_2 (Admin Access) - Verify admin can access admin pages',
  '3. Run TEST_3 (Customer Restriction) - Verify customers cannot access admin',
  '4. Run TEST_4 (Unauth Access) - Verify protection works for unauthenticated',
  '5. Run TEST_5 (Minigame) - Verify minigame requires auth',
  '6. Run TEST_6 (Checkout) - Verify checkout requires auth',
  '7. Run TEST_7 (Token Expiration) - Verify expired token handling',
  '8. Run TEST_8 (Role UI) - Verify UI changes based on role',
  '9. Run TEST_9 (Logout) - Verify logout clears everything',
  '10. Run TEST_10 (JWT Payload) - Verify JWT structure'
];

// ============================================
// 📊 TEST RESULTS TEMPLATE
// ============================================

const TEST_RESULTS = {
  TEST_1: { passed: null, notes: '' },
  TEST_2: { passed: null, notes: '' },
  TEST_3: { passed: null, notes: '' },
  TEST_4: { passed: null, notes: '' },
  TEST_5: { passed: null, notes: '' },
  TEST_6: { passed: null, notes: '' },
  TEST_7: { passed: null, notes: '' },
  TEST_8: { passed: null, notes: '' },
  TEST_9: { passed: null, notes: '' },
  TEST_10: { passed: null, notes: '' }
};

// ============================================
// 🚀 QUICK START
// ============================================

console.log('🧪 JWT Authentication Test Suite Loaded!');
console.log('');
console.log('📋 Available Commands:');
console.log('  inspectToken()  - View current token details');
console.log('  resetAuth()     - Clear all auth data');
console.log('');
console.log('📝 Test Cases:');
console.log('  TEST_1_Login');
console.log('  TEST_2_AdminAccess');
console.log('  TEST_3_CustomerRestriction');
console.log('  TEST_4_UnauthenticatedAccess');
console.log('  TEST_5_MinigameProtection');
console.log('  TEST_6_CheckoutProtection');
console.log('  TEST_7_TokenExpiration');
console.log('  TEST_8_RoleBasedUI');
console.log('  TEST_9_Logout');
console.log('  TEST_10_JWTPayload');
console.log('');
console.log('💡 Usage: console.log(TEST_1_Login) to view test details');

// Export for console access
if (typeof window !== 'undefined') {
  window.inspectToken = inspectToken;
  window.resetAuth = resetAuth;
  window.TEST_1_Login = TEST_1_Login;
  window.TEST_2_AdminAccess = TEST_2_AdminAccess;
  window.TEST_3_CustomerRestriction = TEST_3_CustomerRestriction;
  window.TEST_4_UnauthenticatedAccess = TEST_4_UnauthenticatedAccess;
  window.TEST_5_MinigameProtection = TEST_5_MinigameProtection;
  window.TEST_6_CheckoutProtection = TEST_6_CheckoutProtection;
  window.TEST_7_TokenExpiration = TEST_7_TokenExpiration;
  window.TEST_8_RoleBasedUI = TEST_8_RoleBasedUI;
  window.TEST_9_Logout = TEST_9_Logout;
  window.TEST_10_JWTPayload = TEST_10_JWTPayload;
}
