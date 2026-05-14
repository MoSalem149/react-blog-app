import { useState } from "react";
import { UserContext } from "./UserContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      return JSON.parse(userData);
    }
    return null;
  });

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
