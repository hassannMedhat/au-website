"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function useIsLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get("token"));

  useEffect(() => {
    const interval = setInterval(() => {
      const token = Cookies.get("token");
      setLoggedIn(!!token);
    }, 500); // فحص كل نصف ثانية

    return () => clearInterval(interval);
  }, []);

  return loggedIn;
}
