import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const TextUtilities = () => {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [lexicalDensity, setLexicalDensity] = useState(null);

  // Handlers for various utilities
  const handleUppercase = () => setText(text.toUpperCase());
  const handleLowercase = () => setText(text.toLowerCase());
  const handleTitleCase = () => {
    const titleCased = text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    setText(titleCased);
  };
  const handleReverseText = () => setText(text.split("").reverse().join(""));
  const handleExtraSpaces = () => setText(text.split(/[ ]+/).join(" "));
  const handleClearText = () => setText("");
  const handleCopy = () => navigator.clipboard.writeText(text);

  // Handlers for Find and Replace
  const handleReplace = () => {
    if (!findText.trim()) return;
    const replacedText = text.replace(findText, replaceText);
    setText(replacedText);
    setFindText("");
    setReplaceText("");
  };

  const handleReplaceAll = () => {
    if (!findText.trim()) return;
    const replacedText = text.split(findText).join(replaceText);
    setText(replacedText);
    setFindText("");
    setReplaceText("");
  };

  // Handler for Lexical Density
  const calculateLexicalDensity = () => {
    const words = text.split(/\s+/).filter((word) => word);
    const uniqueWords = [...new Set(words)];
    const density =
      words.length > 0 ? (uniqueWords.length / words.length) * 100 : 0;
    setLexicalDensity(density.toFixed(2));
  };
  const handleHighlightFrequentWord = () => {
    const words = text.split(/\s+/).filter((word) => word);
    const wordFrequency = {};
    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    const maxFrequency = Math.max(...Object.values(wordFrequency));
    const highlightedText = text.replace(
      new RegExp(
        `\\b(${Object.keys(wordFrequency)
          .filter((word) => wordFrequency[word] === maxFrequency)
          .join("|")})\\b`,
        "g"
      ),
      "**$1**"
    );
    setText(highlightedText);
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="min-h-screen flex flex-col items-center mt-5 px-5">
        <h1 className="text-4xl text-sky-900 font-bold text-center mb-2">
          <span className="text-blue-700">&lt;</span>TEXT
          <span className="text-blue-700">
            <span className="text-green-600">bot</span>/&gt;
          </span>
        </h1>
        <p className="text-center text-lg text-blue-700 mb-6">
          Edit, Format, Perfect – Instantly
        </p>

        {/* Text Input */}
        <textarea
          className="w-3/4 p-3 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent mb-5"
          rows="8"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        ></textarea>

        {/* Formatting Buttons */}
        <div className="w-3/4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={handleUppercase}
          >
            Uppercase
          </button>
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={handleLowercase}
          >
            Lowercase
          </button>
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={handleTitleCase}
          >
            Title Case
          </button>
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={handleReverseText}
          >
            Reverse Text
          </button>
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={handleExtraSpaces}
          >
            Remove Extra Spaces
          </button>
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={handleCopy}
          >
            Copy Text
          </button>
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={handleHighlightFrequentWord}
          >
            Highlight Frequent Words
          </button>
          <button
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={handleClearText}
          >
            Clear Text
          </button>
        </div>

        {/* Find and Replace Section */}
        <div className="w-3/4 mt-8 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            Find and Replace
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="border rounded px-4 py-2"
              placeholder="Find text"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
            />
            <input
              type="text"
              className="border rounded px-4 py-2"
              placeholder="Replace with"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition-transform transform hover:scale-105"
                onClick={handleReplace}
              >
                Replace
              </button>
              <button
                className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition-transform transform hover:scale-105"
                onClick={handleReplaceAll}
              >
                Replace All
              </button>
            </div>
          </div>
        </div>

        {/* Text Summary Section */}
        <div className="w-3/4 mt-8 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Text Summary
          </h2>
          <p>
            <strong>Words:</strong>{" "}
            {text.split(/\s+/).filter((word) => word).length}
          </p>
          <p>
            <strong>Characters:</strong> {text.length}
          </p>
          <p>
            <strong>Estimated Read Time:</strong>{" "}
            {0.008 * text.split(/\s+/).filter((word) => word).length} minutes
          </p>
          <p>
            <strong>Lexical Density:</strong>{" "}
            {lexicalDensity !== null ? `${lexicalDensity}%` : "N/A"}
          </p>
          <button
            className="mt-2 bg-purple-500 text-white rounded px-4 py-2 hover:bg-purple-600 transition-transform transform hover:scale-105"
            onClick={calculateLexicalDensity}
          >
            Calculate Lexical Density
          </button>
        </div>

        {/* Text Preview Section */}
        <div className="w-3/4 mt-5 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Preview</h2>
          <p>
            {text.length > 0 ? text : "Enter something to preview it here."}
          </p>
        </div>
      </div>
    </>
  );
};

export default TextUtilities;
