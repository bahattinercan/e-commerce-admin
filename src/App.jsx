import { useState } from "react";
import Navbar from "./components/navbar/navbar";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
import { clearToken, getToken } from "./helpers/auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getToken()));

  const logout = () => {
    clearToken();
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div>
      <Navbar onLogout={logout}></Navbar>
      <Admin></Admin>
    </div>
  );
};

export default App;
