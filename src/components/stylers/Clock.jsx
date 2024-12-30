import React, { useState, useEffect } from "react";

const Clock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({
    hours: "12",
    minutes: "00",
    dayIndex: 0,
  });
  const [showDot, setShowDot] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setShowDot((prev) => !prev);
      setTime({
        hours: String(now.getHours()).padStart(2, "0"),
        minutes: String(now.getMinutes()).padStart(2, "0"),
        dayIndex: now.getDay(),
      });
    };

    const interval = setInterval(updateClock, 500);

    return () => clearInterval(interval);
  }, []);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-40 transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "300px", transition: "transform 0.3s ease" }}
      >
        {/* Sidebar Close Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -left-12 top-20 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
        >
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
          <lord-icon
            src="https://cdn.lordicon.com/warimioc.json"
            trigger="loop"
            stroke="bold"
            state="loop-oscillate"
            colors="primary:#121331,secondary:#242424"
          ></lord-icon>
        </button>
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-black text-2xl font-bold"
          >
            &times; {/* Close icon */}
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            Digital Clock
          </h2>
          <div className="digital-clock bg-blue-300 text-white rounded-lg p-4 flex justify-between items-center">
            {/* Week Column */}
            <div className="week flex flex-col items-center mr-4">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`${
                    index === time.dayIndex
                      ? "text-white font-bold"
                      : "text-gray-600"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
            {/* Time Column */}
            <div className="time text-center font-mono">
              <span className="hour text-6xl">{time.hours}</span>
              <span
                className={`dot text-6xl ${
                  showDot ? "opacity-100" : "opacity-0"
                }`}
              >
                :
              </span>
              <span className="min text-6xl">{time.minutes}</span>
            </div>
          </div>
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

export default Clock;
