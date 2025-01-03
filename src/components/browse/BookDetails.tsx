import React from "react";
import { useParams } from "react-router-dom";
import CategoryRow from "./CategoryRow";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  rating: number;
}

const BookDetails = () => {
  const { id } = useParams();

  // This would typically come from an API call using the id
  const book: Book = {
    id: "1",
    title: "The Great Adventure",
    author: "John Smith",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description:
      "An epic tale of discovery and wonder, following the journey of an unlikely hero through mysterious lands and ancient civilizations. As our protagonist faces increasingly challenging obstacles, they must learn to trust in their own abilities and the power of friendship.",
    rating: 4.5,
  };

  const similarBooks = [
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
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto pt-20 px-6">
        {/* Hero Section */}
        <div className="flex gap-8 mb-12">
          {/* Left Side - Book Cover */}
          <div className="w-1/3">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-[600px] object-cover rounded-lg shadow-2xl"
            />
          </div>

          {/* Right Side - Book Details */}
          <div className="w-2/3 text-white space-y-6">
            <h1 className="text-4xl font-bold">{book.title}</h1>
            <p className="text-xl text-gray-400">By {book.author}</p>
            <div className="h-px bg-gray-800 my-6" />
            <p className="text-lg leading-relaxed text-gray-300">
              {book.description}
            </p>
            <div className="flex items-center gap-4 mt-8">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Read Now
              </button>
              <button className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                Add to List
              </button>
            </div>
          </div>
        </div>

        {/* Similar Books Section */}
        <div className="mb-12">
          <CategoryRow
            title="Similar Books You Might Like"
            books={similarBooks}
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
