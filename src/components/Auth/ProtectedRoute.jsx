import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../stylers/Loading";

const ProtectedRoute = ({ children, ...rest }, { darkMode, setDarkMode }) => {
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

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  if (loading) {
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
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
      </>
    );
  }

  if (!user) {
    return null; // Redirect handles navigation
  }

  // Ensure children is a single element and pass down ...rest props
  if (React.Children.count(children) !== 1) {
    throw new Error("ProtectedRoute expects a single child element.");
  }

  return React.cloneElement(children, { ...rest });
};

export default ProtectedRoute;
