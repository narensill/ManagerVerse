// Import necessary libraries
import React, { useState } from "react";

function HealthBot() {
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

  // Handlers for updating state
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
        "You are underweight. Consider a diet plan rich in proteins and healthy fats."
      );
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      recs.push(
        "You have a normal BMI. Maintain a balanced diet and regular exercise."
      );
    } else {
      recs.push(
        "You are overweight. Focus on calorie deficit diets and cardio exercises."
      );
    }

    if (gender.toLowerCase() === "male") {
      recs.push("Consider strength training exercises like weightlifting.");
    } else if (gender.toLowerCase() === "female") {
      recs.push("Yoga and pilates can be great for overall health.");
    }

    return recs;
  };

  return (
    <>
      <div className=" min-h-screen">
        <div className="absolute inset-0 -z-10 h-3/4 w-3/4 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>

        <h1 className="text-4xl text-sky-900 font-bold text-center mt-5">
          <span className="text-blue-700">&lt;</span>Health
          <span className="text-blue-700">
            <span className="text-green-600">bot</span>/&gt;
          </span>
        </h1>
        <p className="text-center text-lg text-blue-700 ">
          Your Multitasking Password Manager
        </p>

        <main className="p-4 space-y-6 w-3/4 justify-center">
          {/* User Info Section */}
          <section className="bg-white p-4 rounded justify-center shadow">
            <h2 className="text-xl font-semibold mb-2">User Info</h2>
            <div className="space-y-2">
              <input
                type="number"
                value={weight}
                placeholder="Weight (kg)"
                className="w-3/4 border p-2 rounded justify-center"
                onChange={(e) => setWeight(e.target.value)}
              />
              <input
                type="number"
                value={height}
                placeholder="Height (cm)"
                className="w-3/4 border p-2 rounded justify-center"
                onChange={(e) => setHeight(e.target.value)}
              />
              <input
                type="text"
                value={gender}
                placeholder="Gender (Male/Female)"
                className="w-3/4 border p-2 rounded justify-center"
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
              <p className="mt-2">
                Your BMI: <span className="font-bold">{bmi}</span>
              </p>
            )}
          </section>

          {/* Recommendations Section */}
          <section className="bg-white p-4 rounded justify-center shadow">
            <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
            <ul className="list-disc ml-4 space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </section>

          {/* Water Intake Section */}
          <section className="bg-white p-4 rounded justify-center shadow">
            <h2 className="text-xl font-semibold mb-2">Water Intake</h2>
            <p>
              Today: <span className="font-bold">{waterIntake}</span> cups
            </p>
            <div className="space-x-2">
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
          <section className="bg-white p-4 rounded justify-center shadow">
            <h2 className="text-xl font-semibold mb-2">Step Tracker</h2>
            <p>
              Steps Today: <span className="font-bold">{dailySteps}</span>
            </p>
            <div className="space-x-2">
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
          <section className="bg-white p-4 rounded justify-center shadow">
            <h2 className="text-xl font-semibold mb-2">Sleep Tracker</h2>
            <p>
              Hours Slept Last Night:{" "}
              <span className="font-bold">{sleepHours}</span>
            </p>
            <div className="space-x-2">
              <button
                onClick={() => setSleepHours(sleepHours + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded justify-center hover:bg-blue-700"
              >
                Add an Hour
              </button>
              <button
                onClick={() => sleepHours > 0 && setSleepHours(sleepHours - 1)}
                className="bg-red-500 text-white px-4 py-2 rounded justify-center hover:bg-red-700"
              >
                Remove an Hour
              </button>
            </div>
          </section>

          {/* Meal Log Section */}
          <section className="bg-white p-4 rounded justify-center shadow">
            <h2 className="text-xl font-semibold mb-2">Meal Log</h2>
            <input
              type="text"
              value={currentMeal}
              placeholder="Add a meal or snack"
              className="w-3/4 border p-2 rounded justify-center mb-2"
              onChange={(e) => setCurrentMeal(e.target.value)}
            />
            <button
              onClick={handleAddMeal}
              className="bg-green-500 text-white px-4 py-2 rounded justify-center hover:bg-green-700"
            >
              Add Meal
            </button>
            <ul className="list-disc ml-4 mt-2 space-y-1">
              {mealLog.map((meal, index) => (
                <li key={index}>{meal}</li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="bg-blue-600 text-white py-4 text-center">
          <p>Health Manager App &copy; 2024</p>
        </footer>
      </div>
    </>
  );
}

export default HealthBot;
