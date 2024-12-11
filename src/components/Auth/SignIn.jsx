import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

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
      console.error("Error signing in:", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;
