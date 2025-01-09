// Import necessary libraries
import React, { useState } from "react";
import HealthBar from "./Sidebars/HealthBar";

function HealthBot({ darkMode, setDarkMode }) {
  // State for user input and data tracking
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailySteps, setDailySteps] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);
  const [mealLog, setMealLog] = useState([]);
  const [currentMeal, setCurrentMeal] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [monthlyProgress, setMonthlyProgress] = useState({
    waterIntake: 0,
    dailySteps: 0,
    sleepHours: 0,
  });

  const dailyGoals = {
    waterIntake: 8, // glasses
    dailySteps: 10000, // steps
    sleepHours: 8, // hours
  };

  const handleAddMeal = () => {
    if (currentMeal.trim() !== "") {
      setMealLog([...mealLog, currentMeal]);
      setCurrentMeal("");
    }
  };

  const calculateBmi = () => {
    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    const recs = getRecommendations(bmiValue, gender);
    setRecommendations(recs);
  };

  const getRecommendations = (bmiValue, gender) => {
    const recs = [];

    if (bmiValue < 18.5) {
      recs.push(
        "You are underweight. Consider a diet plan rich in proteins and healthy fats.",
        "Eat smaller meals more frequently to increase calorie intake.",
        "Focus on strength training exercises to build muscle mass."
      );
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      recs.push(
        "You have a normal BMI. Maintain a balanced diet and regular exercise.",
        "Stay consistent with your fitness routine to sustain your health.",
        "Hydrate regularly and monitor your physical activity levels."
      );
    } else {
      recs.push(
        "You are overweight. Focus on calorie deficit diets and cardio exercises.",
        "Incorporate fiber-rich foods to improve digestion and reduce cravings.",
        "Start with low-impact exercises like walking or swimming."
      );
    }

    if (gender.toLowerCase() === "male") {
      recs.push("Strength training, like weightlifting, is beneficial.");
    } else if (gender.toLowerCase() === "female") {
      recs.push(
        "Yoga and Pilates can be excellent for flexibility and stress relief."
      );
    }

    return recs;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Background */}
      <div
        className={`fixed inset-0 -z-10 h-full w-full transition-all duration-300 ease-in-out ${
          darkMode
            ? "bg-slate-950"
            : "bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]"
        }`}
        style={{ height: "100vh", backgroundAttachment: "fixed" }}
      >
        <div
          className={`fixed inset-0 transition-all duration-300 ease-in-out ${
            darkMode
              ? "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
              : "bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"
          }`}
          style={{ backgroundAttachment: "fixed" }}
        ></div>
      </div>

      <div>
        <h1
          className={`text-4xl font-bold text-center mt-5  animate-fadeInDown ${
            darkMode ? "text-gray-300" : "text-sky-900"
          }`}
        >
          <span className={darkMode ? "text-sky-300" : "text-blue-700"}>
            &lt;
          </span>
          HEALTH
          <span className={darkMode ? "text-sky-300" : "text-blue-700"}>
            <span className={darkMode ? "text-green-400" : "text-green-600"}>
              bot
            </span>
            /&gt;
          </span>
        </h1>
        <p className="text-center text-lg text-blue-700 animate-fadeIn ">
          Your Own Health Tracker
        </p>
        <div className="flex justify-center">
          <main className=" p-4 space-y-6 w-3/4 justify-center">
            {/* User Info Section */}
            <section className="bg-transparent p-4 rounded justify-center shadow">
              <h2
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-gray-400" : "text-indigo-500"
                }`}
              >
                User Info
              </h2>
              <div className="space-y-2">
                <input
                  type="number"
                  value={weight}
                  placeholder="Weight (kg)"
                  className={`w-3/4 border p-2 rounded justify-center ${
                    darkMode
                      ? "bg-transparent text-gray-400"
                      : "bg-white text-black"
                  }`}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <input
                  type="number"
                  value={height}
                  placeholder="Height (cm)"
                  className={`w-3/4 border p-2 rounded justify-center ${
                    darkMode
                      ? "bg-transparent text-gray-400"
                      : "bg-white text-black"
                  }`}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <input
                  type="text"
                  value={gender}
                  placeholder="Gender (Male/Female)"
                  className={`w-3/4 border p-2 rounded justify-center ${
                    darkMode
                      ? "bg-transparent text-gray-400"
                      : "bg-white text-black"
                  }`}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <button
                onClick={calculateBmi}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded justify-center hover:bg-blue-700"
              >
                Calculate BMI
              </button>
              {bmi && (
                <p
                  className={
                    darkMode ? " text-gray-400 mt-2" : "text-indigo-700 mt-2"
                  }
                >
                  Your BMI:{" "}
                  <span
                    className={
                      darkMode
                        ? " text-gray-400  font-bold"
                        : "text-indigo-700 font-bold"
                    }
                  >
                    {bmi}
                  </span>
                </p>
              )}
            </section>

            {/* Recommendations Section */}
            <section className=" bg-transparent p-4 rounded justify-center shadow">
              <h2
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-gray-400" : "text-indigo-500"
                }`}
              >
                Recommendations
              </h2>
              <ul
                className={`list-disc ml-4 space-y-1 ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
              >
                {recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </section>

            {/* Water Intake Section */}
            <section className=" bg-transparent p-4 rounded justify-center shadow">
              <h2
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-gray-400" : "text-indigo-500"
                }`}
              >
                Water Intake
              </h2>
              <p
                className={
                  darkMode ? " text-gray-400 mt-2" : "text-indigo-700 mt-2"
                }
              >
                Today:{" "}
                <span
                  className={
                    darkMode
                      ? " text-gray-400  font-bold"
                      : "text-indigo-700 font-bold"
                  }
                >
                  {waterIntake}
                </span>{" "}
                / {dailyGoals.waterIntake} cups
              </p>
              <progress
                value={waterIntake}
                max={dailyGoals.waterIntake}
                className="w-full h-2 mt-2"
              ></progress>
              {waterIntake >= dailyGoals.waterIntake && (
                <p className="text-green-500 mt-2">You completed the goal!</p>
              )}
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => setWaterIntake(waterIntake + 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded justify-center hover:bg-blue-700"
                >
                  Add a Cup
                </button>
                <button
                  onClick={() =>
                    waterIntake > 0 && setWaterIntake(waterIntake - 1)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded justify-center hover:bg-red-700"
                >
                  Remove a Cup
                </button>
              </div>
            </section>

            {/* Step Tracker Section */}
            <section className=" bg-transparent p-4 rounded justify-center shadow">
              <h2
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-gray-400" : "text-indigo-500"
                }`}
              >
                Step Tracker
              </h2>
              <p
                className={
                  darkMode ? " text-gray-400 mt-2" : "text-indigo-700 mt-2"
                }
              >
                Steps Today:{" "}
                <span
                  className={
                    darkMode
                      ? " text-gray-400  font-bold"
                      : "text-indigo-700 font-bold"
                  }
                >
                  {dailySteps}
                </span>{" "}
                / {dailyGoals.dailySteps}
              </p>
              <progress
                value={dailySteps}
                max={dailyGoals.dailySteps}
                className="w-full h-2 mt-2"
              ></progress>
              {dailySteps >= dailyGoals.dailySteps && (
                <p className="text-green-500 mt-2">You completed the goal!</p>
              )}
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => setDailySteps(dailySteps + 1000)}
                  className="bg-blue-500 text-white px-4 py-2 rounded justify-center hover:bg-blue-700"
                >
                  Add 1000 Steps
                </button>
                <button
                  onClick={() =>
                    dailySteps >= 1000 && setDailySteps(dailySteps - 1000)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded justify-center hover:bg-red-700"
                >
                  Remove 1000 Steps
                </button>
              </div>
            </section>

            {/* Sleep Tracker Section */}
            <section className=" bg-transparent p-4 rounded justify-center shadow">
              <h2
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-gray-400" : "text-indigo-500"
                }`}
              >
                Sleep Tracker
              </h2>
              <p
                className={
                  darkMode ? " text-gray-400 mt-2" : "text-indigo-700 mt-2"
                }
              >
                Hours Slept Last Night:{" "}
                <span
                  className={
                    darkMode
                      ? " text-gray-400  font-bold"
                      : "text-indigo-700 font-bold"
                  }
                >
                  {sleepHours}
                </span>{" "}
                / {dailyGoals.sleepHours}
              </p>
              <progress
                value={sleepHours}
                max={dailyGoals.sleepHours}
                className="w-full h-2 mt-2"
              ></progress>
              {sleepHours >= dailyGoals.sleepHours && (
                <p className="text-green-500 mt-2">You completed the goal!</p>
              )}
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => setSleepHours(sleepHours + 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded justify-center hover:bg-blue-700"
                >
                  Add an Hour
                </button>
                <button
                  onClick={() =>
                    sleepHours > 0 && setSleepHours(sleepHours - 1)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded justify-center hover:bg-red-700"
                >
                  Remove an Hour
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default HealthBot;
