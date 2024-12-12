import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
};

const errorStyle = {
  color: "red",
};

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Account created successfully");
      setError(""); // Clear any previous error
      navigate("/signin"); // Redirect to Sign In page after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(
        error.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : "Failed to create account. Please try again."
      );
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Sign Up</h2>
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
      <button onClick={handleSignUp} style={buttonStyle}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
