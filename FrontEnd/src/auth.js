import { reactive } from "vue";
import { showToast } from "./toast.js";

// Single source of truth for the logged-in user, kept in sync with localStorage
// so the session survives page reloads. Components read it directly and update
// automatically when it changes.
const read = (key) => {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
};

// Expiry date of a JWT in milliseconds (0 if the token can't be read)
const tokenExpiry = (token) => {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(payload)).exp * 1000 || 0;
  } catch {
    return 0;
  }
};

let expiryTimer = null;

export const auth = reactive({
  token: read("token"),
  username: read("username"),
  role: read("role"),

  get isLoggedIn() {
    return !!this.token;
  },

  get isAdmin() {
    return this.role === "admin";
  },

  login({ token, username, role }) {
    Object.assign(this, { token, username, role });
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    scheduleExpiry();
  },

  logout() {
    clearTimeout(expiryTimer);
    Object.assign(this, { token: "", username: "", role: "" });
    ["token", "username", "role"].forEach((key) => localStorage.removeItem(key));
  },
});

export const authHeaders = () => ({ Authorization: `Bearer ${auth.token}` });

const expireSession = () => {
  if (!auth.isLoggedIn) return;
  auth.logout();
  showToast("Your session has expired. Please log in again.", "info", 5000);
};

// Logs the user out the moment their token expires
const scheduleExpiry = () => {
  clearTimeout(expiryTimer);
  const remaining = tokenExpiry(auth.token) - Date.now();
  if (remaining <= 0) return expireSession();
  // setTimeout can't wait longer than ~24.8 days
  expiryTimer = setTimeout(scheduleExpiry, Math.min(remaining, 2 ** 31 - 1));
};

if (auth.isLoggedIn) scheduleExpiry();

// Safety net: if the backend rejects the token anyway (e.g. the server's secret
// changed), log out. axios is imported lazily so it stays out of the main bundle;
// it is the same instance the pages use.
import("axios").then(({ default: axios }) => {
  axios.interceptors.response.use(undefined, (error) => {
    const sentToken = error.config?.headers?.Authorization?.startsWith("Bearer ");
    if (error.response?.status === 401 && sentToken) expireSession();
    return Promise.reject(error);
  });
});
