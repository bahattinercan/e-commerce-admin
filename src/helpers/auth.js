import { API_URL } from "../config";

// The session lives in an httpOnly cookie owned by the backend: the SPA never
// sees or stores the token, so an XSS cannot exfiltrate it.
export const checkSession = async () => {
  try {
    const response = await fetch(`${API_URL}/adminVerify`, { credentials: "include" });
    return response.ok;
  } catch (error) {
    console.error("Session check failed:", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await fetch(`${API_URL}/logout`, { method: "POST", credentials: "include" });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// 401 (no/invalid session) or 403 (not an admin): drop the session and reload,
// which sends the user back to the login screen.
export const handleUnauthorized = (response) => {
  if (response.status === 401 || response.status === 403) {
    logout().then(() => window.location.reload());
    return true;
  }
  return false;
};
