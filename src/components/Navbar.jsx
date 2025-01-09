import React from "react";
import { Link, useLocation } from "react-router-dom";
import Switch from "./stylers/DarkButton";

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  // Define paths where the navbar links should NOT be shown
  const excludedPaths = ["/manager", "/login", "/signup", "/", "*"];
  const showLinks = !excludedPaths.includes(location.pathname);

  // Define paths where the logo should not be clickable
  const nonClickableLogoPaths = ["/login", "/signup" , "/", "*"];

  return (
    <nav
      className={`shadow-md ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-blue-200 text-sky-900"
      }`}
    >
      <div className="mycontainer flex items-center justify-between px-6 py-0 h-16">
        {/* Logo Section (Left) */}
        <div className="logo font-bold text-2xl flex items-center">
          {nonClickableLogoPaths.includes(location.pathname) ? (
            <span>
              <span className={darkMode ? "text-sky-300" : "text-blue-700"}>
                &lt;
              </span>
              Manager
              <span className={darkMode ? "text-sky-300" : "text-blue-700"}>
                <span
                  className={darkMode ? "text-green-400" : "text-green-600"}
                >
                  Verse
                </span>
                /&gt;
              </span>
            </span>
          ) : (
            <a href="/manager">
              <span className={darkMode ? "text-sky-300" : "text-blue-700"}>
                &lt;
              </span>
              Manager
              <span className={darkMode ? "text-sky-300" : "text-blue-700"}>
                <span
                  className={darkMode ? "text-green-400" : "text-green-600"}
                >
                  Verse
                </span>
                /&gt;
              </span>
            </a>
          )}
        </div>

        {/* Navigation Links */}
        {showLinks && (
          <ul className="flex gap-6">
            <li>
              <Link
                to="/passbot"
                className={`hover:font-bold transition ${
                  darkMode ? "hover:text-gray-400" : "hover:text-blue-700"
                }`}
              >
                PassBot
              </Link>
            </li>
            <li>
              <Link
                to="/todolist"
                className={`hover:font-bold transition ${
                  darkMode ? "hover:text-gray-400" : "hover:text-blue-700"
                }`}
              >
                TaskBot
              </Link>
            </li>
            <li>
              <Link
                to="/textbot"
                className={`hover:font-bold transition ${
                  darkMode ? "hover:text-gray-400" : "hover:text-blue-700"
                }`}
              >
                TextBot
              </Link>
            </li>
            <li>
              <Link
                to="/healthbot"
                className={`hover:font-bold transition ${
                  darkMode ? "hover:text-gray-400" : "hover:text-blue-700"
                }`}
              >
                HealthBot
              </Link>
            </li>
            <li>
              <Link
                to="/convertbot"
                className={`hover:font-bold transition ${
                  darkMode ? "hover:text-gray-400" : "hover:text-blue-700"
                }`}
              >
                ConvertBot
              </Link>
            </li>
          </ul>
        )}

        {/* Right Section: Switch and GitHub Link */}
        <div className="flex items-center gap-6">
          <div className="text-sky-900">
            <Switch darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
          <div className="text-sky-900 flex items-center">
            <a
              href="https://github.com/narensill/ManagerVerse"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={`w-8 h-8 transition-transform transform hover:scale-125 hover:drop-shadow-lg ${
                  !darkMode ? "invert" : ""
                }`}
                src="github.png"
                alt="GitHub Repository"
              />
            </a>
            <span className="ml-2">
              <a
                href="https://github.com/narensill/ManagerVerse"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:underline ${
                  darkMode ? "text-green-500" : "text-black"
                }`}
              >
                GitHub
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
