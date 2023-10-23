"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

export const EmojiShowcase = () => {
  const [loading, setLoading] = useState(true);
  /* manage the  state for the fetched emojis here */
  const [emojis, setEmojis] = useState([]);
  /* manage the state for searched emojis here */
  const [search, setSearch] = useState("");
  /* state for hovered emoji to fetch name */
  const [hoveredIndex, setHoveredIndex] = useState(null);
  /* state for emoji category */
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  /* state for copy */
  const [copied, setCopied] = useState(false);
  const [copiedPosition, setCopiedPosition] = useState({ top: 0, left: 0 });

  /* data fetching when the component mounts */
  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = "https://emoji-api.com/emojis";
        if (search) {
          // If there's a search, use the search endpoint
          endpoint = `https://emoji-api.com/emojis?search=${search}&access_key=${process.env.NEXT_PUBLIC_OPEN_EMOJI_API_KEY}`;
        } else if (selectedCategory) {
          // If a category is selected, get emojis from that category
          endpoint = `https://emoji-api.com/categories/${selectedCategory}?access_key=${process.env.NEXT_PUBLIC_OPEN_EMOJI_API_KEY}`;
        } else {
          // Use the default endpoint if there's no search query
          endpoint = `https://emoji-api.com/emojis?access_key=${process.env.NEXT_PUBLIC_OPEN_EMOJI_API_KEY}`;
        }
        const response = await axios.get(endpoint);
        console.log(response.data);
        setEmojis(response.data);
      } catch (error) {
        console.error("Error fetching emojis:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, selectedCategory]);

  /* fetch category name*/
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://emoji-api.com/categories?access_key=${process.env.NEXT_PUBLIC_OPEN_EMOJI_API_KEY}`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    console.log("Clicked category:", category.slug);
    setSelectedCategory(category.slug);
    setShowCategories(false);
    // Reset the search when a category is selected to display all emojis in that category
    setSearch("");
  };

  /* filter searched term  */
  const filteredEmojis = Array.isArray(emojis)
    ? emojis.filter(
        (emoji) =>
          emoji.unicodeName &&
          emoji.unicodeName.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="md:px-6 px-2 md:py-6 py-4 flex flex-wrap gap-3">
      {/* search bar */}
      <div className="w-full flex justify-center mb-6 mt-2 relative">
        <input
          type="text"
          className="w-full border border-gray-400 rounded-lg py-2 px-12 md:pl-24 pl-20 focus:outline-[#8b5cf6] hover:bg-gray-100"
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
        {/* Category button */}
        <button
          className=" absolute md:left-12 left-10 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowCategories(!showCategories)}
        >
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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
        {/* Category dropdown */}
        {showCategories && (
          <div className="absolute w-[300px] left-0 top-10 mt-2 bg-white border border-[#8b5cf6] rounded shadow-lg z-[100]">
            {categories.map((category) => (
              <div
                key={category.slug}
                className="px-4 py-2 cursor-pointer hover:bg-[#8b5cf6] hover:text-white border-b "
                onClick={() => handleCategoryClick(category)}
              >
                {category.slug}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display emojis, loading state, or no results message */}
      {loading && <div>Loading... </div>}
      {!loading && filteredEmojis.length === 0 ? (
        <div>No results found...</div>
      ) : (
        filteredEmojis.map((emoji, index) => (
          <div
            key={index}
            className="md:text-3xl text-xl p-2 flex items-center justify-center 
          md:h-16 md:min-w-16 h-12 min-w-12 border border-gray-300  rounded relative
          hover:bg-gray-100 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={async (e) => {
              await navigator.clipboard.writeText(emoji.character);
              const rect = e.target.getBoundingClientRect();
              setCopiedPosition({ top: rect.top - 15, left: rect.right + 10 });
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          >
            <span>{emoji.character}</span>
            {hoveredIndex === index && !copied && (
              <span
                className="absolute top-full left-full text-sm bg-[#8b5cf6] text-white 
            p-2 rounded whitespace-nowrap z-10 "
              >
                {emoji.unicodeName?.split(" ").slice(1).join(" ")}
              </span>
            )}
          </div>
        ))
      )}
      {copied && (
        <div
          className="bg-green-400 text-sm p-2 rounded-lg absolute "
          style={{ top: copiedPosition.top, left: copiedPosition.left }}
        >
          Copied!
        </div>
      )}
    </div>
  );
};
