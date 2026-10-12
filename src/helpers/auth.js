const TOKEN_KEY = "admin-auth-token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// 401 (token yok/geçersiz) veya 403 (admin değil) gelirse oturumu kapat ve
// login ekranına dön.
export const handleUnauthorized = (response) => {
  if (response.status === 401 || response.status === 403) {
    clearToken();
    window.location.reload();
    return true;
  }
  return false;
};
