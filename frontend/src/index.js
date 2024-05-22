import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3100);
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/quizlist" element={<QuizList />} />

          <Route exact path="/" element={<Landing />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/introduction" element={<Introduction />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/courses" element={<Courses />}></Route>
          <Route exact path="/teachers" element={<Teachers />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/under" element={<Under />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
