import React, { useState } from "react";

const HealthBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const exerciseData = [
    { name: "Running", caloriesBurned: 600 },
    { name: "Cycling", caloriesBurned: 500 },
    { name: "Swimming", caloriesBurned: 700 },
    { name: "Yoga", caloriesBurned: 200 },
    { name: "Strength Training", caloriesBurned: 400 },
    { name: "Dancing", caloriesBurned: 350 },
    { name: "Jump Rope", caloriesBurned: 750 },
    { name: "Hiking", caloriesBurned: 450 },
  ];

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "300px", transition: "transform 0.3s ease" }}
      >
        {/* Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -left-12 top-20 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
        >
          <lord-icon
            src="https://cdn.lordicon.com/fgxwhgfp.json"
            trigger="in"
            delay="1000"
            stroke="bold"
            state="in-reveal"
            colors="primary:#121331,secondary:#242424"
          ></lord-icon>
        </button>

        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-black text-2xl font-bold"
          >
            &times; {/* Close icon */}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Exercise Calorie Tracker
          </h2>
          <ul className="space-y-4 text-gray-800">
            {exerciseData.map((exercise, index) => (
              <li key={index} className="text-lg">
                <span className="font-semibold">{exercise.name}:</span> {" "}
                {exercise.caloriesBurned} calories burned
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar Overlay (optional) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
        ></div>
      )}
    </>
  );
};

export default HealthBar;
