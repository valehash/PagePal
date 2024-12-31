import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";

interface FilterBarProps {
  onGenreChange?: (genre: string) => void;
  onRatingChange?: (rating: number) => void;
  selectedGenre?: string;
  selectedRating?: number;
}

const FilterBar = ({
  onGenreChange = () => {},
  onRatingChange = () => {},
  selectedGenre = "all",
  selectedRating = 0,
}: FilterBarProps) => {
  const genres = [
    { value: "all", label: "All Genres" },
    { value: "fiction", label: "Fiction" },
    { value: "non-fiction", label: "Non-Fiction" },
    { value: "mystery", label: "Mystery" },
    { value: "sci-fi", label: "Science Fiction" },
    { value: "romance", label: "Romance" },
  ];

  return (
    <div className="w-full h-[60px] bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Select value={selectedGenre} onValueChange={onGenreChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre.value} value={genre.value}>
                {genre.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Rating:</span>
          <div className="w-[200px]">
            <Slider
              defaultValue={[selectedRating]}
              max={5}
              step={0.5}
              onValueChange={(value) => onRatingChange(value[0])}
            />
          </div>
          <span className="text-sm text-gray-400">{selectedRating} Stars</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">
          {/* Placeholder for additional filters or results count */}
          24 Results
        </span>
      </div>
    </div>
  );
};

export default FilterBar;
