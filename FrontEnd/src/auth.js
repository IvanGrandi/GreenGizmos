import { reactive } from "vue";

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
  },

  logout() {
    Object.assign(this, { token: "", username: "", role: "" });
    ["token", "username", "role"].forEach((key) => localStorage.removeItem(key));
  },
});

export const authHeaders = () => ({ Authorization: `Bearer ${auth.token}` });
