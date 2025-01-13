import React, { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import BookGrid from "./BookGrid";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  genre?: string;
}

interface SearchSectionProps {
  onBookSelect?: (book: Book) => void;
  books: Book[];
  isLoading: boolean;
  error: string | null;
}

const SearchSection = ({
  onBookSelect = () => {},
  books = [],
  isLoading = false,
  error = null,
}: SearchSectionProps) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const genreMatch =
        selectedGenre === "all" ||
        book.genre?.toLowerCase() === selectedGenre.toLowerCase();
      const ratingMatch = book.rating >= selectedRating;
      return genreMatch && ratingMatch;
    });
  }, [books, selectedGenre, selectedRating]);

  return (
    <div className="w-full min-h-[800px] bg-gray-950 flex flex-col">
      <FilterBar
        selectedGenre={selectedGenre}
        selectedRating={selectedRating}
        onGenreChange={setSelectedGenre}
        onRatingChange={setSelectedRating}
      />
      <div className="flex-1">
        {error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : isLoading ? (
          <div className="text-center text-white py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4" />
            Searching for books...
          </div>
        ) : filteredBooks.length > 0 ? (
          <BookGrid books={filteredBooks} onBookClick={onBookSelect} />
        ) : (
          <div className="text-center text-white py-8">
            {books.length > 0
              ? "No books match the selected filters"
              : "Start searching to find books"}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
