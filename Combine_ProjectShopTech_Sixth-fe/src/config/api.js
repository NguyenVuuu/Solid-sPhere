const configuredApiUrl = import.meta.env.VITE_API_URL;
const configuredBackendUrl = import.meta.env.VITE_BACKEND_URL;

// VITE_API_URL includes the /api path. Relative URLs keep local development on
// Vite's proxy, while an absolute URL can be used for a deployed backend.
export const API_BASE_URL = configuredApiUrl || "/api";
export const BACKEND_BASE_URL = configuredBackendUrl ||
  (configuredApiUrl ? configuredApiUrl.replace(/\/api\/?$/, "") : "http://localhost:8081");
export const WS_BASE_URL = import.meta.env.VITE_WS_URL || BACKEND_BASE_URL;
