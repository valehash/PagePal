import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Book {
  id: string;
  title: string;
  authors: string[];
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  description: string | null;
}

interface CategoryRowProps {
  title?: string;
  books?: Book[];
  onBookClick?: (book: Book) => void;
}

const CategoryRow = ({
  title = "Featured Books",
  books = [],
  onBookClick = () => {},
}: CategoryRowProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-gray-900 py-6">
      <div className="px-6">
        <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
        <div className="relative">
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 scrollbar-hide relative"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {books.map((book) => (
              <Card
                key={book.id}
                className="flex-none w-[200px] transition-transform duration-200 hover:scale-105 cursor-pointer bg-gray-800"
                onClick={() => onBookClick(book)}
              >
                <CardContent className="p-0">
                  <img
                    src={
                      book.imageLinks?.thumbnail || "/api/placeholder/200/280"
                    }
                    alt={book.title}
                    className="w-full h-[280px] object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-white truncate">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {book.authors?.join(", ") || "Unknown Author"}
                    </p>
                    {/* Removed rating since it's not in the API response */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;
