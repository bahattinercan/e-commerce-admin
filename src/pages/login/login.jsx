import { useState } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../../config";
import "./login.css";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const loginData = await loginResponse.json();

      if (!loginData?.success) {
        setError(loginData?.errors || "Giriş başarısız.");
        return;
      }

      // A valid session is not enough: the account must have admin role.
      const verifyResponse = await fetch(`${API_URL}/adminVerify`, {
        credentials: "include",
      });

      if (verifyResponse.status === 403) {
        setError("Bu hesabın admin yetkisi yok.");
        return;
      }
      if (!verifyResponse.ok) {
        setError("Yetki doğrulanamadı, lütfen tekrar deneyin.");
        return;
      }

      onLogin();
    } catch (err) {
      console.error("Login failed:", err);
      setError("Sunucuya ulaşılamadı. Backend çalışıyor mu?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form className="login-card" onSubmit={submit}>
        <h1>Admin Login</h1>
        <div className="login-field">
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="admin@example.com"
            autoComplete="username"
            required
          />
        </div>
        <div className="login-field">
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="••••••"
            autoComplete="current-password"
            required
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "GİRİŞ YAPILIYOR..." : "LOGIN"}
        </button>
        <p className="login-hint">
          {API_URL.replace(/^https?:\/\//, "")} üzerinden giriş yapılır
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;