// contexts/LogoutContext.js
import React, { createContext, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutContext = createContext();

export const useLogout = () => {
  return useContext(LogoutContext);
};

export const LogoutProvider = ({ children }) => {
  const navigate = useNavigate();
  const logoutTimer = useRef(null);

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const resetLogoutTimer = () => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }
    logoutTimer.current = setTimeout(() => {
      handleLogout();
    }, 300000);
  };

  useEffect(() => {
    resetLogoutTimer();

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetLogoutTimer));

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetLogoutTimer)
      );
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, []);

  return (
    <LogoutContext.Provider value={{ handleLogout }}>
      {children}
    </LogoutContext.Provider>
  );
};
