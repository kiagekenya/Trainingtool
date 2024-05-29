import React from "react";
import { useLogout } from "../../contexts/LogoutContext";

const LogoutButton = () => {
  const { handleLogout } = useLogout();

  return (
    <button onClick={handleLogout} className="btnprimary">
      Logout
    </button>
  );
};

export default LogoutButton;
