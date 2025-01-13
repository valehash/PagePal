import React, { useState, useEffect } from "react";
import BrowseHeader from "./browse/BrowseHeader";
import HeroSection from "./browse/HeroSection";
import SearchSection from "./browse/SearchSection";
import PromptSection from "./browse/PromptSection";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  genre?: string;
}

interface HomeProps {
  onBookSelect?: (book: Book) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = ({ onBookSelect = () => {} }: HomeProps) => {
  const [isPromptMode, setIsPromptMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSearchResults = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/books/search?query=${encodeURIComponent(query.trim())}&mode=normal&max_results=10`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const books = await response.json();
      setSearchResults(books);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to fetch books. Please try again.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        fetchSearchResults(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
            books={searchResults}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
