import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/home/Home";
import Introduction from "./components/introduction/Introduction";
import About from "./components/about/About";
import Courses from "./components/courses/Courses";
import Teachers from "./components/teachers/Teachers";
import Contact from "./components/contact/Contact";
import Landing from "./components/landing/Landing";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import QuizList from "./components/quizlist/Quizlist";
import Under from "./components/underconstruction/Under";
import Profile from "./components/profilepage/ProfilePage";
import { UserProvider } from "./contexts/UserContext";
import { LogoutProvider } from "./contexts/LogoutContext";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3100);
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <LogoutProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Landing />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/introduction"
              element={
                <PrivateRoute>
                  <Introduction />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              }
            />
            <Route
              path="/teachers"
              element={
                <PrivateRoute>
                  <Teachers />
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              }
            />
            <Route
              path="/quizlist"
              element={
                <PrivateRoute>
                  <QuizList />
                </PrivateRoute>
              }
            />
            <Route path="/under" element={<Under />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </LogoutProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

Modal.setAppElement("#root");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
