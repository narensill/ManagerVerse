import React from "react";
import Card from "./stylers/Cards";

const ManagerVerse = () => {
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
    hoverImage: "/healthbot.png",
  },
  {
    link: "/tools",
    hoverText: "Utilities",
    hoverImage: "/clipboard.png",
  },
];


  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <h1 className="text-6xl text-sky-900 font-bold text-center mt-10">
        <span className="text-blue-700">&lt;</span>Manager
        <span className="text-blue-700">
          <span className="text-green-600">Verse</span>/&gt;
        </span>
      </h1>
      <p className="text-center text-lg text-blue-700 mt-3 mb-40">
        From Ideas to Actions, Manage Everything Effortlessly
      </p>
      <div className="flex justify-center gap-10 mt-10">
        {cardData.map((card, index) => (
          <a
            key={index}
            href={card.link}
            className="transition-transform transform hover:scale-105"
          >
            <Card hoverText={card.hoverText} hoverImage={card.hoverImage} />
          </a>
        ))}
      </div>
    </>
  );
};

export default ManagerVerse;
