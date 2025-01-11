import React, { useState } from "react";
import BrowseHeader from "./browse/BrowseHeader";
import HeroSection from "./browse/HeroSection";
import SearchSection from "./browse/SearchSection";
import PromptSection from "./browse/PromptSection";
import CategoryRow from "./browse/CategoryRow";

interface HomeProps {
  onBookSelect?: (book: any) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = ({ onBookSelect = () => {} }: HomeProps) => {
  const [isPromptMode, setIsPromptMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch search results from API
  const fetchSearchResults = async () => {
    // Don't search if query is empty
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/books/search?query=${encodeURIComponent(searchQuery.trim())}&mode=normal&max_results=10`,
      );
      const text = await response.text();
      console.log("Raw response text:", text);

      if (text) {
        const books = JSON.parse(text);
        console.log("Parsed data:", books);
        setSearchResults(books);
      } else {
        console.log("Empty response received");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  };

  // Handle prompt submission
  const onPromptSubmit = async (prompt: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          is_prompt_mode: true,
        }),
      });
      const data = await response.json();
      console.log("Prompt response:", data);
    } catch (error) {
      console.error("Error submitting prompt:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <BrowseHeader
        isPromptMode={isPromptMode}
        onModeToggle={setIsPromptMode}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      <div className="pt-[80px]">
        <HeroSection onBookClick={onBookSelect} />
        {isPromptMode ? (
          <PromptSection
            onPromptSubmit={onPromptSubmit}
            isLoading={isLoading}
          />
        ) : (
          <SearchSection
            onBookSelect={onBookSelect}
            initialGenre="all"
            initialRating={0}
            books={searchQuery.trim() ? searchResults : undefined}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
