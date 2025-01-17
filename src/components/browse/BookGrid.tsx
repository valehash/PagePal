import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Star, ImageOff } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
}

interface BookGridProps {
  books: Book[];
  onBookClick?: (book: Book) => void;
}

const BookCard = ({ book, onClick }: { book: Book; onClick: () => void }) => {
  const [imageError, setImageError] = useState(false);

  // Fallback image URL - you can replace this with your own fallback image
  //const fallbackImage = "/api/placeholder/240/360";

  return (
    <Card
      className="transition-transform duration-200 hover:scale-105 cursor-pointer bg-gray-900"
      onClick={onClick}
    >
      <CardContent className="p-0 relative">
        {imageError ? (
          <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center rounded-t-lg">
            <ImageOff className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <img
            src={book.coverUrl || fallbackImage}
            alt={book.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
            onError={(e) => {
              // If the main image fails, try the fallback
              const imgElement = e.target as HTMLImageElement;
              if (imgElement.src !== fallbackImage) {
                imgElement.src = fallbackImage;
              } else {
                // If fallback also fails, show error state
                setImageError(true);
              }
            }}
          />
        )}
        <div className="p-4 text-white">
          <h3 className="font-semibold truncate">{book.title}</h3>
          <p className="text-sm text-gray-400 truncate">{book.author}</p>
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm">{book.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BookGrid = ({ books, onBookClick = () => {} }: BookGridProps) => {
  const navigate = useNavigate();

  const handleBookClick = (book: Book) => {
    onBookClick(book);
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="bg-black p-6 min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <TooltipProvider key={book.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <BookCard book={book} onClick={() => handleBookClick(book)} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-sm">{book.author}</p>
                  <p className="text-sm">Rating: {book.rating.toFixed(1)}/5</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
