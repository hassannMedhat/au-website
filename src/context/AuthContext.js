"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      setIsLoggedIn(true);
      // جلب بيانات المستخدم هنا إذا لزم الأمر
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
