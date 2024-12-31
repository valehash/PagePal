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
}

const SearchSection = ({
  onBookSelect = () => {},
  initialGenre = "all",
  initialRating = 0,
  books = [
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
  ],
}: SearchSectionProps) => {
  const [selectedGenre, setSelectedGenre] = React.useState(initialGenre);
  const [selectedRating, setSelectedRating] = React.useState(initialRating);

  const filteredBooks = React.useMemo(() => {
    return books.filter((book) => {
      const genreMatch = selectedGenre === "all" || true; // Placeholder for genre filtering
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
        <BookGrid books={filteredBooks} onBookClick={onBookSelect} />
      </div>
    </div>
  );
};

export default SearchSection;
