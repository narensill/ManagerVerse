import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import TextUtilities from "./components/TextBot";
import TodoList from "./components/TodoList";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { AuthProvider } from "./components/Auth/AuthContext";
import "./App.css";
import ManagerVerse from "./components/ManagerVerse";
import HealthBot from "./components/HealthBot";
import ConvertBot from "./components/ConvertBot";

import ImageConversion from "./components/Converter/ImageConversion";

import TextToJson from "./components/Converter/TextToJson";
import FileCompression from "./components/Converter/FileCompressor";
import ImageResizer from "./components/Converter/ImageResizer";
import UnitConverter from "./components/Converter/UnitConverter";

function App() {
  // Initialize darkMode state from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("darkMode");
    return storedTheme === "true"; // Convert string to boolean
  });

  // Update localStorage whenever darkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        {/* Pass darkMode and setDarkMode to Navbar and other components */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={<SignIn darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/signup"
            element={<SignUp darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/textbot"
            element={<TextUtilities darkMode={darkMode} setDarkMode={setDarkMode} />}
          />

          {/* Protected Routes */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute>
                <ManagerVerse darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passbot"
            element={
              <ProtectedRoute>
                <Manager darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todolist"
            element={
              <ProtectedRoute>
                <TodoList darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/healthbot"
            element={
              <ProtectedRoute>
                <HealthBot darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/convertbot"
            element={
              <ProtectedRoute>
                <ConvertBot darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/imgcov"
            element={
              <ProtectedRoute>
                <ImageConversion darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/imgrsz"
            element={
              <ProtectedRoute>
                <ImageResizer darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/txtjson"
            element={
              <ProtectedRoute>
                <TextToJson darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/unit"
            element={
              <ProtectedRoute>
                <UnitConverter darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compress"
            element={
              <ProtectedRoute>
                <FileCompression darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />
          {/* Default Route */}
          <Route path="/" element={<SignIn darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="*" element={<SignIn darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
