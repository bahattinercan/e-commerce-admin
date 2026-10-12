import { API_URL } from "../config";

// The session lives in an httpOnly cookie owned by the backend: the SPA never
// sees or stores the token, so an XSS cannot exfiltrate it.
// The access cookie is short-lived; the refresh cookie silently renews it.
async function tryRefresh() {
  try {
    const response = await fetch(`${API_URL}/refresh`, { method: "POST", credentials: "include" });
    return response.ok;
  } catch (error) {
    console.error("Refresh failed:", error);
    return false;
  }
}

export const checkSession = async () => {
  try {
    let response = await fetch(`${API_URL}/adminVerify`, { credentials: "include" });

    if (response.status === 401 && (await tryRefresh())) {
      response = await fetch(`${API_URL}/adminVerify`, { credentials: "include" });
    }

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

// 401 (no/invalid session) or 403 (not an admin): try to renew the session with
// the refresh cookie; if that fails, log out and reload back to the login screen.
export const handleUnauthorized = async (response) => {
  if (response.status !== 401 && response.status !== 403) {
    return false;
  }

  if (response.status === 401 && (await tryRefresh())) {
    window.location.reload();
    return true;
  }

  await logout();
  window.location.reload();
  return true;
};
