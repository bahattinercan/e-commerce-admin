import { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
import { checkSession, logout } from "./helpers/auth";

const App = () => {
  // null = session not checked yet, false = logged out, true = admin session
  const [session, setSession] = useState(null);

  useEffect(() => {
    checkSession().then((ok) => setSession(ok));
  }, []);

  if (session === null) {
    return <div className="app-loading">Oturum kontrol ediliyor…</div>;
  }

  if (!session) {
    return <Login onLogin={() => setSession(true)} />;
  }

  const handleLogout = async () => {
    await logout();
    setSession(false);
  };

  return (
    <div>
      <Navbar onLogout={handleLogout}></Navbar>
      <Admin></Admin>
    </div>
  );
};

export default App;
