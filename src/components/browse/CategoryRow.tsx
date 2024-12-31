import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
}

interface CategoryRowProps {
  title?: string;
  books?: Book[];
  onBookClick?: (book: Book) => void;
}

const defaultBooks: Book[] = [
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
  {
    id: "4",
    title: "The Lost City",
    author: "Sarah Wilson",
    coverUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    rating: 4.6,
  },
  {
    id: "5",
    title: "Midnight Tales",
    author: "Robert Black",
    coverUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    rating: 4.3,
  },
];

const CategoryRow = ({
  title = "Featured Books",
  books = defaultBooks,
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
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-[280px] object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-white truncate">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">
                      {book.author}
                    </p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-gray-300">
                        {book.rating}
                      </span>
                    </div>
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
