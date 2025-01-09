import React, { useState } from "react";

const ImageResizer = ({ darkMode, setDarkMode }) => {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(300); // Default width
  const [height, setHeight] = useState(300); // Default height
  const [resizedImage, setResizedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          setImage(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    if (image) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set the canvas size to the desired width and height
      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas with the new dimensions
      ctx.drawImage(image, 0, 0, width, height);

      // Get the resized image as a Data URL (PNG format by default)
      const resizedImageURL = canvas.toDataURL("image/png");
      setResizedImage(resizedImageURL);
    }
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
        Image
        <span className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
          Resizer
        </span>
      </h1>
      <p
        className={`text-center text-lg mt-3 mb-40 animate-fadeIn ${
          darkMode ? "text-gray-400" : "text-blue-700"
        }`}
        style={{ animationDelay: "0.3s" }}
      >
        Resize your Images Instantly
      </p>
      <div className="content">
        <h2 className="text-xl font-bold" style={{ textAlign: "center", color: darkMode ? "#9CA3AF" : "#4F46E5" }}>
          Upload an Image File
        </h2>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={resizedImage !== null}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "18px", color: darkMode ? "#ddd" : "#333" }}>
              Width:
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              style={{
                padding: "8px",
                fontSize: "16px",
                width: "100px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginLeft: "10px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "18px", color: darkMode ? "#ddd" : "#333" }}>
              Height:
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              style={{
                padding: "8px",
                fontSize: "16px",
                width: "100px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginLeft: "10px",
              }}
            />
          </div>

          <button
            onClick={handleResize}
            disabled={!image}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: image ? "pointer" : "not-allowed",
              opacity: image ? 1 : 0.5,
            }}
          >
            Resize
          </button>
        </div>

        {resizedImage && (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <h3>Resized Image</h3>
            <img
              src={resizedImage}
              alt="Resized"
              style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}
            />
            <a
              href={resizedImage}
              download="resized-image.png"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
              }}
            >
              Download Resized Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageResizer;
