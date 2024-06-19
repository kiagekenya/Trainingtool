import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
