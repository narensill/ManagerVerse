import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute>
              <Manager />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
