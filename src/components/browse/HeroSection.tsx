import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
}

interface HeroSectionProps {
  books?: Book[];
  onBookClick?: (book: Book) => void;
  autoScrollInterval?: number;
}

const defaultBooks: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=600&fit=crop",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever.",
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverUrl:
      "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=800&h=600&fit=crop",
    description:
      "A lone astronaut must save humanity from a looming catastrophe.",
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    coverUrl:
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&h=600&fit=crop",
    description:
      "A stunning blend of adventure and mysticism, environmentalism and politics.",
  },
];

const HeroSection = ({
  books = defaultBooks,
  onBookClick = () => {},
  autoScrollInterval = 5000,
}: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [books.length, autoScrollInterval]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + books.length) % books.length,
    );
  };

  return (
    <div className="relative w-full h-[500px] bg-black overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out scale-105"
        style={{
          backgroundImage: `url(${books[currentIndex].coverUrl})`,
          transform: `translateX(${-currentIndex * 100}%)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="w-1/2 text-white space-y-6">
          <h1 className="text-5xl font-bold">{books[currentIndex].title}</h1>
          <p className="text-xl text-gray-300">
            By {books[currentIndex].author}
          </p>
          <p className="text-lg text-gray-400">
            {books[currentIndex].description}
          </p>
          <Button
            onClick={() => onBookClick(books[currentIndex])}
            className="text-lg px-8 py-6"
            variant="secondary"
          >
            Read Now
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 right-8 flex gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full bg-black/50 hover:bg-black/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full bg-black/50 hover:bg-black/70"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
