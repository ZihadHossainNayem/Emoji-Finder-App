"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const EmojiShowcase = () => {
  /* manage the  state for the fetched emojis here */
  const [emojis, setEmojis] = useState([]);
  const [emojiName, setEmojiName] = useState(null);
  /* data fetching when the component mounts */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://emoji-api.com/emojis?access_key=${process.env.NEXT_PUBLIC_OPEN_EMOJI_API_KEY}`
        );

        setEmojis(response.data);
      } catch (error) {
        console.error("Error fetching emojis:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="md:px-6 px-2 md:py-6 py-4 flex flex-wrap gap-3">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="md:text-3xl text-xl p-2 flex items-center justify-center 
          md:h-16 md:min-w-16 h-12 min-w-12 border rounded relative
          hover:bg-gray-100"
          onMouseEnter={() => setEmojiName(emoji)}
          onMouseLeave={() => setEmojiName(null)}
        >
          <span>{emoji.character}</span>
          {emojiName === emoji && (
            <span
              className="absolute top-full left-full text-sm bg-gray-600 text-white 
            p-2 rounded whitespace-nowrap z-10 "
            >
              {emoji.unicodeName}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
