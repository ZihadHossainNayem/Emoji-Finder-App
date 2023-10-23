"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const EmojiShowcase = () => {
  /* manage the  state for the fetched emojis here */
  const [emojis, setEmojis] = useState([]);
  const [emojiName, setEmojiName] = useState(null);

  const [search, setSearch] = useState("");

  const [hoveredIndex, setHoveredIndex] = useState(null);
  /* data fetching when the component mounts */
  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = "https://emoji-api.com/emojis";
        if (search) {
          // If there's a search, use the search endpoint
          endpoint = `https://emoji-api.com/emojis?search=${search}&access_key=${process.env.NEXT_PUBLIC_OPEN_EMOJI_API_KEY}`;
        } else {
          // Use the default endpoint if there's no search query
          endpoint = `https://emoji-api.com/emojis?access_key=${process.env.NEXT_PUBLIC_OPEN_EMOJI_API_KEY}`;
        }

        const response = await axios.get(endpoint);
        setEmojis(response.data);
      } catch (error) {
        console.error("Error fetching emojis:", error);
      }
    };
    fetchData();
  }, [search]);

  /* filter searched term  */
  const filteredEmojis = emojis.filter((emoji) =>
    emoji.unicodeName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="md:px-6 px-2 md:py-6 py-4 flex flex-wrap gap-3">
      {/* search bar */}
      <div className="w-full flex justify-center mb-6 mt-2 relative">
        <input
          type="text"
          className="w-full border border-gray-400 rounded-lg py-2 px-6 pl-12 focus:outline-[#8b5cf6] hover:bg-gray-100"
          placeholder="Search emojis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
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
        </div>
      </div>
      {/* display emojis */}
      {filteredEmojis.map((emoji, index) => (
        <div
          key={index}
          className="md:text-3xl text-xl p-2 flex items-center justify-center 
          md:h-16 md:min-w-16 h-12 min-w-12 border border-gray-300  rounded relative
          hover:bg-gray-100 cursor-pointer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <span>{emoji.character}</span>
          {hoveredIndex === index && (
            <span
              className="absolute top-full left-full text-sm bg-[#8b5cf6] text-white 
            p-2 rounded whitespace-nowrap z-10 "
            >
              {emoji.unicodeName.split(" ").slice(1).join(" ")}
            </span>
          )}
          {console.log(emojiName)}
        </div>
      ))}
    </div>
  );
};
