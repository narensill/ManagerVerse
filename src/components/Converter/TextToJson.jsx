import React, { useState } from 'react';

const TextToJson = ({ darkMode, setDarkMode }) => {
  const [file, setFile] = useState(null);

  const handleConvert = () => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const json = JSON.stringify({ content: text.split('\n') }, null, 2);
      const blob = new Blob([json], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'converted.json';
      link.click();
    };
    reader.readAsText(file);
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
        TEXT
        <span className={`${darkMode ? "text-sky-300" : "text-blue-700"}`}>
          to
        </span>
        <span className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
          JSON
        </span>
      </h1>
      <p
        className={`text-center text-lg mt-3 mb-40 animate-fadeIn ${
          darkMode ? "text-gray-400" : "text-blue-700"
        }`}
        style={{ animationDelay: "0.3s" }}
      >
        Convert Text to Json instantly!!
      </p>
      <div className="content">
        <h2 className="text-xl font-bold" style={{ textAlign: "center", color: darkMode ? "#9CA3AF" : "#4F46E5" }}>
          Upload a Text File
        </h2>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleConvert}
            disabled={!file}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: file ? "pointer" : "not-allowed",
              opacity: file ? 1 : 0.5,
            }}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToJson;
