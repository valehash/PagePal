import React from "react";
import PromptInput from "./PromptInput";
import BookGrid from "./BookGrid";

interface PromptSectionProps {
  onPromptSubmit?: (prompt: string) => void;
  isLoading?: boolean;
  recommendations?: Array<{
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    rating: number;
  }>;
}

const PromptSection = ({
  onPromptSubmit = () => {},
  isLoading = false,
  recommendations = [
    {
      id: "1",
      title: "AI Recommended: The Hidden Path",
      author: "Elena Rivers",
      coverUrl:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      rating: 4.7,
    },
    {
      id: "2",
      title: "AI Recommended: Quantum Dreams",
      author: "Marcus Chen",
      coverUrl:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
      rating: 4.5,
    },
    {
      id: "3",
      title: "AI Recommended: The Last Echo",
      author: "Sarah Blake",
      coverUrl:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      rating: 4.8,
    },
  ],
}: PromptSectionProps) => {
  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">
            AI-Powered Book Discovery
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Describe the kind of book you're looking for, and our AI will
            recommend the perfect reads for you.
          </p>
        </div>

        <PromptInput
          onSubmit={onPromptSubmit}
          isLoading={isLoading}
          placeholder="Try 'Show me books about space exploration with philosophical themes' or 'Find me something similar to 1984'"
        />

        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              AI Recommendations
            </h3>
            <BookGrid books={recommendations} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptSection;
