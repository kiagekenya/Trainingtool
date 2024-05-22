import React from "react";
import Check from "./components/check/Check";
import CheckOut from "./components/checkout/CheckOut";
import Report from "./components/report/Report";
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <>
      <UserProvider>
        <Report />
      </UserProvider>
    </>
  );
};

export default App;
