import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  minHeight: "400px", // Updated from 300px
  maxWidth: "300px", // Updated from 250px
  margin: "40px auto",
  background: "#BFDBFE", // Updated background color
  borderRadius: "2px",
  boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  fontFamily: "'Raleway', sans-serif",
  color: "#FFF",
  alignItems: "center", // Added for centering child elements
};

const inputStyle = {
  background: "#F6F7F9",
  border: "none",
  borderRadius: "4px",
  width: "85%", // Updated from 100%
  height: "40px",
  lineHeight: "40px",
  padding: "10px", // Updated padding
  color: "rgba(0, 0, 0, 0.5)",
  outline: "none",
  marginBottom: "20px",
  align: "center", // Added for alignment
  marginTop: "10px", // Added margin to drop inputs down
};

const buttonStyle = {
  background: "rgba(0, 0, 0, 0.5)",
  color: "#F6F7F9",
  height: "40px",
  lineHeight: "40px",
  width: "85%", // Updated from 100%
  border: "none",
  borderRadius: "4px",
  fontWeight: "600",
  cursor: "pointer",
  marginBottom: "10px", // Added margin for spacing between buttons
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
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <h1 className="text-6xl text-sky-900 font-bold text-center mt-10">
        <span className="text-blue-700">&lt;</span>Manager
        <span className="text-blue-700">
          <span className="text-green-600">Verse</span>/&gt;
        </span>
      </h1>
      <p className="text-center text-lg text-blue-700 mt-3">
        From Ideas to Actions, Manage Everything Effortlessly
      </p>
      <div className="mt-10" style={containerStyle}>
        <h2 className="text-xl text-sky-900 font-bold mt-2">Sign Up</h2>
        <input
          className="focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          className="focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        {error && (
          <p className="mt-2" style={errorStyle}>
            {error}
          </p>
        )}
        <button
          className="focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent mt-10"
          onClick={handleSignUp}
          style={buttonStyle}
        >
          Sign Up
        </button>
      </div>
    </>
  );
};

export default SignUp;
