import React, { useState } from 'react';

const ImageConversion = ({ darkMode, setDarkMode }) => {
  const [image, setImage] = useState(null);

  const handleImageConversion = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'converted_image.png';
          document.body.appendChild(link);
          link.click();
        }, 'image/png');
      };
    };
    reader.readAsDataURL(image);
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
        <span className={`${darkMode ? "text-sky-300" : "text-blue-700"}`}></span>
        Image
        <span className={`${darkMode ? "text-green-400" : "text-green-600"}`}>Converter</span>
      </h1>
      <p
        className={`text-center text-lg mt-3 mb-40 animate-fadeIn ${
          darkMode ? "text-gray-400" : "text-blue-700"
        }`}
        style={{ animationDelay: "0.3s" }}
      >
       Convert Images Instantly
      </p>

      <h2 className="text-xl font-bold" style={{ textAlign: "center", color: darkMode ? "#9CA3AF" : "#4F46E5" }}>Image Conversion</h2>

      <div className="image-upload-container text-center mt-5">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="input-file"
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        />
      </div>

      <div className="button-container text-center mt-5">
        <button
          onClick={handleImageConversion}
          disabled={!image}
          className="convert-btn"
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
          Convert to PNG
        </button>
      </div>
    </div>
  );
};

export default ImageConversion;
