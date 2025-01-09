import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const containerlightStyle = {
  minHeight: "400px",
  maxWidth: "300px",
  margin: "40px auto",
  background: "#BFDBFE",
  borderRadius: "2px",
  boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  fontFamily: "'Raleway', sans-serif",
  color: "#FFF",
  alignItems: "center",
};
const containerdarkStyle = {
  minHeight: "400px",
  maxWidth: "300px",
  margin: "40px auto",
  background: "#050A2E",
  borderRadius: "2px",
  boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  fontFamily: "'Raleway', sans-serif",
  color: "#FFF",
  alignItems: "center",
};

const inputlightStyle = {
  background: "#F6F7F9",
  border: "none",
  borderRadius: "4px",
  width: "85%",
  height: "40px",
  lineHeight: "40px",
  padding: "10px",
  color: "rgba(0, 0, 0, 0.5)",
  outline: "none",
  marginBottom: "20px",
  align: "center",
  marginTop: "10px",
};
const inputdarkStyle = {
  background: "transparent",
  border: "#082554 solid 1px",
  borderRadius: "4px",
  width: "85%",
  height: "40px",
  lineHeight: "40px",
  padding: "10px",
  color: "white",
  outline: "none",
  marginBottom: "20px",
  align: "center",
  marginTop: "10px",
};

const buttonStyle = {
  background: "rgba(0, 0, 0, 0.5)",
  color: "#F6F7F9",
  height: "40px",
  lineHeight: "40px",
  width: "85%",
  border: "gray solid 1px",
  borderRadius: "4px",
  fontWeight: "600",
  cursor: "pointer",
  marginBottom: "10px",
};

const errorStyle = {
  color: "red",
};

const SignUp = ({ darkMode, setDarkMode }) => {
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
      <div
        className={`absolute inset-0 -z-10 h-full w-full transition-all duration-300 ease-in-out ${
          darkMode
            ? "bg-slate-950"
            : "bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]"
        }`}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 transition-all duration-300 ease-in-out ${
            darkMode
              ? "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
              : "bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"
          }`}
        ></div>
      </div>
      <h1
        className={`text-6xl font-bold text-center mt-10 ${
          darkMode ? "text-gray-300" : "text-sky-900"
        }`}
      >
        <span className={`${darkMode ? "text-sky-300" : "text-blue-700"}`}>&lt;</span>
        Manager
        <span className={`${darkMode ? "text-sky-300" : "text-blue-700"}`}>
          <span className={`${darkMode ? "text-green-400" : "text-green-600"}`}>Verse</span>/&gt;
        </span>
      </h1>
      <p
        className={`text-center text-lg mt-3 mb-2 ${
          darkMode ? "text-gray-400" : "text-blue-700"
        }`}
      >
        From Ideas to Actions, Manage Everything Effortlessly
      </p>
      <div className="mt-10" style={darkMode ? containerdarkStyle : containerlightStyle}>
        <h2 className={`text-xl font-bold mt-2 ${darkMode ? "text-gray-400" : "text-sky-900"}`}>Sign Up</h2>
        <input
          className="focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={darkMode ? inputdarkStyle : inputlightStyle}
        />
        <input
          className="focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={darkMode ? inputdarkStyle : inputlightStyle}
        />
        {error && (
          <p className="mt-2" style={errorStyle}>
            {error}
          </p>
        )}
        <button
          className="focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent mt-10 transition-transform transform hover:scale-105 hover:drop-shadow-lg hover:font-bold"
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
