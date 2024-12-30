import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Define paths where the navbar links should NOT be shown
  const excludedPaths = ["/manager", "/login", "/signup"];
  const showLinks = !excludedPaths.includes(location.pathname);

  return (
    <nav className="bg-blue-200 shadow-md">
      <div className="mycontainer flex items-center justify-between px-6 py-0 h-16 text-sky-900">
        {/* Logo Section */}
        <div className="logo font-bold px-16 text-2xl flex items-center">
          <a href="/manager">
            <span className="text-blue-700">&lt;</span>
            Manager
            <span className="text-blue-700">
              <span className="text-green-600">Verse</span>/&gt;
            </span>
          </a>
        </div>

        {/* Navigation Links */}
        {showLinks && (
          <ul className="flex gap-6">
            <li>
              <Link
                to="/passbot"
                className="hover:font-bold hover:text-blue-700 transition"
              >
                PassBot
              </Link>
            </li>
            <li>
              <Link
                to="/todolist"
                className="hover:font-bold hover:text-blue-700 transition"
              >
                TaskBot
              </Link>
            </li>
            <li>
              <Link
                to="/textbot"
                className="hover:font-bold hover:text-blue-700 transition"
              >
                TextBot
              </Link>
            </li>
          </ul>
        )}

        {/* GitHub Link */}
        <div className="text-sky-900 flex items-center px-16">
          <a
            href="https://github.com/narensill/ManagerVerse"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="invert w-8 h-8 transition-transform transform hover:scale-125 hover:drop-shadow-lg"
              src="github.png"
              alt="GitHub Repository"
            />
          </a>
          <span className="ml-2">
            <a
              href="https://github.com/narensill/ManagerVerse"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
