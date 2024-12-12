import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  minHeight: "300px",
  maxWidth: "250px",
  margin: "40px auto",
  background: "#FFF",
  borderRadius: "2px",
  boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  fontFamily: "'Raleway', sans-serif",
  color: "#FFF",
};

const inputStyle = {
  background: "#F6F7F9",
  border: "none",
  borderRadius: "4px",
  width: "100%",
  height: "40px",
  lineHeight: "40px",
  padding: "0px 10px",
  color: "rgba(0, 0, 0, 0.5)",
  outline: "none",
  marginBottom: "20px",
};

const buttonStyle = {
  background: "rgba(0, 0, 0, 0.5)",
  color: "#F6F7F9",
  height: "40px",
  lineHeight: "40px",
  width: "100%",
  border: "none",
  borderRadius: "4px",
  fontWeight: "600",
  cursor: "pointer",
  marginBottom: "10px",
};

const errorStyle = {
  color: "red",
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in successfully");
      setError(""); // Clear any previous error
      navigate("/manager"); // Redirect to Manager page
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
      if (error.code === "auth/user-not-found") {
        setError("User not found. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Error signing in. Please check your credentials.");
      }
    }
  };

  const handleNavigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div style={containerStyle}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      {error && <p style={errorStyle}>{error}</p>}
      <button onClick={handleSignIn} style={buttonStyle}>
        Sign In
      </button>
      <button onClick={handleNavigateToSignUp} style={buttonStyle}>
        Sign Up
      </button>
    </div>
  );
};

export default SignIn;
