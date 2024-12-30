import React from "react";
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/textbot" element={<TextUtilities />} 
          />

          {/* Protected Routes */}
          <Route
            path="/manager"
            element={
              <ProtectedRoute>
                <ManagerVerse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passbot"
            element={
              <ProtectedRoute>
                <Manager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todolist"
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/healthbot"
            element={
              <ProtectedRoute>
                <HealthBot />
              </ProtectedRoute>
            }
          /> */}

          {/* Default Route */}
          <Route path="/" element={<SignIn />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </Router>
      
    </AuthProvider>
    
  );
}

export default App;
