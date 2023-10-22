"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const EmojiShowcase = () => {
  /* manage the  state for the fetched emojis here */
  const [emojis, setEmojis] = useState([]);
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
    <div className="md:px-8 px-4 md:py-6 py-4 flex flex-wrap gap-2 bg-[#f7f7f7]">
      {emojis.map((emoji, index) => (
        <span
          key={index}
          className="text-3xl h-12 min-w-12 p-2 border rounded flex items-center justify-center"
        >
          {emoji.character}
        </span>
      ))}
    </div>
  );
};
