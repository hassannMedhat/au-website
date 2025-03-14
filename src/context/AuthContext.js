"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
