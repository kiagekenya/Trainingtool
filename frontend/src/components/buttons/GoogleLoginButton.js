// GoogleLogin.js
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Use environment variables to manage sensitive data

const GoogleLoginComponent = () => {
  const onSuccess = (response) => {
    console.log("Login Success: ", response);
    // Handle login success
  };

  const onFailure = (error) => {
    console.log("Login Failed: ", error);
    // Handle login failure
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
