import React from "react";

export const Navbar = () => {
  return (
    <div className="md:px-8 px-4 md:py-6 py-4 flex justify-between border-b">
      {/* left */}
      <div className="flex items-center gap-1 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          stroke="#8b5cf6"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <h1 className="md:text-2xl text-xl">
          <span className="font-bold text-[#8b5cf6]">Emoji</span>
          <span className="font-medium">Finder</span>
        </h1>
      </div>
      {/* right */}
      <div
        className="px-4 py-1 md:text-lg font-medium border rounded-xl
       border-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white"
      >
        <a
          href="https://github.com/ZihadHossainNayem/Emoji-Finder-App"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    </div>
  );
};
