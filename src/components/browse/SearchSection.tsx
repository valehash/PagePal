import React from "react";
import FilterBar from "./FilterBar";
import BookGrid from "./BookGrid";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
}

interface SearchSectionProps {
  onBookSelect?: (book: Book) => void;
  initialGenre?: string;
  initialRating?: number;
  books?: Book[];
  isLoading?: boolean;
}
const defaultBooks = [
  {
    id: "1",
    title: "The Great Adventure",
    author: "John Smith",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    rating: 4.5,
  },
  {
    id: "2",
    title: "Mystery of the Ages",
    author: "Jane Doe",
    coverUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    rating: 4.8,
  },
  {
    id: "3",
    title: "Future Perfect",
    author: "Alan Johnson",
    coverUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    rating: 4.2,
  },
];

const SearchSection = ({
  onBookSelect = () => {},
  initialGenre = "all",
  initialRating = 0,
  books,
  isLoading = false,
}: SearchSectionProps) => {
  const [selectedGenre, setSelectedGenre] = React.useState(initialGenre);
  const [selectedRating, setSelectedRating] = React.useState(initialRating);

  // Use either provided books or default books
  const booksToDisplay = books || defaultBooks;

  const filteredBooks = React.useMemo(() => {
    return booksToDisplay.filter((book) => {
      const genreMatch = selectedGenre === "all" || true; // Placeholder for genre filtering
      const ratingMatch = book.rating >= selectedRating;
      return genreMatch && ratingMatch;
    });
  }, [booksToDisplay, selectedGenre, selectedRating]);

  return (
    <div className="w-full min-h-[800px] bg-gray-950 flex flex-col">
      <FilterBar
        selectedGenre={selectedGenre}
        selectedRating={selectedRating}
        onGenreChange={setSelectedGenre}
        onRatingChange={setSelectedRating}
      />
      <div className="flex-1">
        {isLoading ? (
          <div className="text-center text-white py-8">Loading...</div>
        ) : filteredBooks.length > 0 ? (
          <BookGrid books={filteredBooks} onBookClick={onBookSelect} />
        ) : (
          <div className="text-center text-white py-8">No books found</div>
        )}
      </div>
    </div>
  );
};
export default SearchSection;
