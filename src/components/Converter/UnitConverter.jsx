import React, { useState } from "react";

const UnitConverter = ({ darkMode, setDarkMode }) => {
  const [inputValue, setInputValue] = useState("");
  const [conversionType, setConversionType] = useState("metersToFeet");
  const [convertedValue, setConvertedValue] = useState("");

  const handleConvert = () => {
    let result;
    switch (conversionType) {
      case "metersToFeet":
        result = (parseFloat(inputValue) * 3.28084).toFixed(2) + " ft";
        break;
      case "feetToMeters":
        result = (parseFloat(inputValue) / 3.28084).toFixed(2) + " m";
        break;
      case "kilogramsToPounds":
        result = (parseFloat(inputValue) * 2.20462).toFixed(2) + " lbs";
        break;
      case "poundsToKilograms":
        result = (parseFloat(inputValue) / 2.20462).toFixed(2) + " kg";
        break;
      default:
        result = "Invalid Conversion";
    }
    setConvertedValue(result);
  };

  return (
    <div>
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
      <h1
        className={`text-4xl font-bold text-center mt-10 animate-fadeInDown ${
          darkMode ? "text-gray-300" : "text-sky-900"
        }`}
      >
        UNIT
        <span className={`${darkMode ? "text-sky-300" : "text-blue-700"}`}>
          Converter
        </span>
      </h1>
      <p
        className={`text-center text-lg mt-3 mb-40 animate-fadeIn ${
          darkMode ? "text-gray-400" : "text-blue-700"
        }`}
        style={{ animationDelay: "0.3s" }}
      >
        Convert SI Units to Metric and Vice Versa!
      </p>
      <div className="content">
        <h2
          className="text-xl font-bold"
          style={{ textAlign: "center", color: darkMode ? "#9CA3AF" : "#4F46E5" }}
        >
          Enter a Value to Convert
        </h2>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "200px",
              marginRight: "10px",
              textAlign: "center",
            }}
          />
          <select
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="metersToFeet">Meters to Feet</option>
            <option value="feetToMeters">Feet to Meters</option>
            <option value="kilogramsToPounds">Kilograms to Pounds</option>
            <option value="poundsToKilograms">Pounds to Kilograms</option>
          </select>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleConvert}
            disabled={!inputValue}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: inputValue ? "pointer" : "not-allowed",
              opacity: inputValue ? 1 : 0.5,
            }}
          >
            Convert
          </button>
        </div>
        {convertedValue && (
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "18px",
              color: darkMode ? "#9CA3AF" : "#4F46E5",
            }}
          >
            <strong>Converted Value:</strong> {convertedValue}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitConverter;
