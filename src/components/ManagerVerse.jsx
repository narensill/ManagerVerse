import React, { useState } from "react";
import Card from "./stylers/Cards";

const ManagerVerse = ({ darkMode, setDarkMode }) => {
  const cardData = [
    {
      link: "/passbot",
      hoverText: "Password Manager",
      hoverImage: "/lock.png",
    },
    {
      link: "/todolist",
      hoverText: "Task Manager",
      hoverImage: "/to-do-list.png",
    },
    {
      link: "/textbot",
      hoverText: "Text Bot",
      hoverImage: "/text-box.png",
    },
    {
      link: "/healthbot",
      hoverText: "Health Bot",
      hoverImage: "/heartbeat.png",
    },
    {
      link: "/convertbot",
      hoverText: "Convert Bot",
      hoverImage: "/technology.png",
    },
  ];

  return (
    <>
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
        className={`text-6xl font-bold text-center mt-10 animate-fadeInDown ${
          darkMode ? "text-gray-300" : "text-sky-900"
        }`}
      >
        <span className={`${darkMode ? "text-sky-300" : "text-blue-700"}`}>
          &lt;
        </span>
        Manager
        <span className={`${darkMode ? "text-sky-300" : "text-blue-700"}`}>
          <span className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
            Verse
          </span>
          /&gt;
        </span>
      </h1>
      <p
        className={`text-center text-lg mt-3 mb-40 animate-fadeIn ${
          darkMode ? "text-gray-400" : "text-blue-700"
        }`}
        style={{ animationDelay: "0.3s" }}
      >
        From Ideas to Actions, Manage Everything Effortlessly
      </p>
      <div className="flex justify-center gap-10 mt-10">
        {cardData.map((card, index) => (
          <a
            key={index}
            href={card.link}
            className={`transition-transform transform hover:scale-105 ${
              darkMode ? "text-gray-400" : "text-indigo-950"
            }`}
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <div className="animate-zoomIn">
              <Card
                hoverText={card.hoverText}
                hoverImage={card.hoverImage}
                darkMode={darkMode}
              />
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default ManagerVerse;
