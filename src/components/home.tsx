import React, { useState } from "react";
import BrowseHeader from "./browse/BrowseHeader";
import HeroSection from "./browse/HeroSection";
import SearchSection from "./browse/SearchSection";
import PromptSection from "./browse/PromptSection";
import CategoryRow from "./browse/CategoryRow";

interface HomeProps {
  onBookSelect?: (book: any) => void;
}

const Home = ({ onBookSelect = () => {} }: HomeProps) => {
  const [isPromptMode, setIsPromptMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Trending Now",
      books: [
        {
          id: "1",
          title: "The Silent Echo",
          author: "Maria Rivers",
          coverUrl:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
          rating: 4.7,
        },
        {
          id: "2",
          title: "Quantum Dreams",
          author: "David Chen",
          coverUrl:
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
          rating: 4.5,
        },
        {
          id: "3",
          title: "Lost in Time",
          author: "Sarah Blake",
          coverUrl:
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
          rating: 4.8,
        },
      ],
    },
    {
      title: "New Releases",
      books: [
        {
          id: "4",
          title: "Digital Horizons",
          author: "Alex Morgan",
          coverUrl:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
          rating: 4.6,
        },
        {
          id: "5",
          title: "The Last Page",
          author: "Emma Wilson",
          coverUrl:
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
          rating: 4.4,
        },
        {
          id: "6",
          title: "Midnight Tales",
          author: "James Wright",
          coverUrl:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
          rating: 4.9,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <BrowseHeader
        isPromptMode={isPromptMode}
        onModeToggle={setIsPromptMode}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <div className="pt-[80px]">
        <HeroSection onBookClick={onBookSelect} />

        {isPromptMode ? (
          <PromptSection
            onPromptSubmit={(prompt) =>
              console.log("Prompt submitted:", prompt)
            }
            isLoading={false}
          />
        ) : (
          <SearchSection
            onBookSelect={onBookSelect}
            initialGenre="all"
            initialRating={0}
          />
        )}

        <div className="space-y-6 py-8">
          {categories.map((category, index) => (
            <CategoryRow
              key={index}
              title={category.title}
              books={category.books}
              onBookClick={onBookSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
