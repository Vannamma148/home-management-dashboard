// src/components/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("authUser") || null);

  const login = (username) => {
    localStorage.setItem("authUser", username);
    setUser(username);
    navigate("/", { replace: true }); // redirect to dashboard
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
