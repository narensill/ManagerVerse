import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate("/signin"); // Redirect to sign-in if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while checking auth state
  }

  if (!user) {
    return null; // Redirect will handle navigation
  }

  return <>{children}</>;
};

export default ProtectedRoute;
