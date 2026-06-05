import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("@NotFat:user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("@NotFat:user", JSON.stringify(user));
    } else {
      localStorage.removeItem("@NotFat:user");
    }
  }, [user]);

  useEffect(() => {
    if (user && window.location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const signin = (userData) => {
    setUser(userData);
  };

  const updateUser = (updates) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;
      return { ...currentUser, ...updates };
    });
  };

  const signout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, updateUser, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
