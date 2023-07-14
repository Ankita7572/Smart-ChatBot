import "./App.css";
import Navbar from "./Navbar";
import Chatbox from "./Chatbox";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/chatbox"
          element={
            isLoggedIn ? <Chatbox /> : <Navigate to="/" replace={true} />
          }
        />
        <Route
          path="/*"
          element={<Navbar setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
