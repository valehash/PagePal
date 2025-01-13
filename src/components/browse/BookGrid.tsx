import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Star } from "lucide-react";

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
                <Card
                  className="transition-transform duration-200 hover:scale-105 cursor-pointer bg-gray-900"
                  onClick={() => handleBookClick(book)}
                >
                  <CardContent className="p-0 relative">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    <div className="p-4 text-white">
                      <h3 className="font-semibold truncate">{book.title}</h3>
                      <p className="text-sm text-gray-400 truncate">
                        {book.author}
                      </p>
                      <div className="flex items-center mt-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm">
                          {book.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
