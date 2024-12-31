import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Search, Sparkles } from "lucide-react";

interface BrowseHeaderProps {
  onModeToggle?: (isPromptMode: boolean) => void;
  onSearch?: (query: string) => void;
  isPromptMode?: boolean;
  searchQuery?: string;
}

const BrowseHeader = ({
  onModeToggle = () => {},
  onSearch = () => {},
  isPromptMode = false,
  searchQuery = "",
}: BrowseHeaderProps) => {
  const [localSearchQuery, setLocalSearchQuery] = React.useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-[80px] bg-gray-900 border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-white">PagePal</h1>

          <form onSubmit={handleSearch} className="relative w-[400px]">
            <Input
              type="text"
              placeholder="Search books..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </form>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {isPromptMode ? "AI Prompt" : "Search"} Mode
          </span>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Switch
              checked={isPromptMode}
              onCheckedChange={onModeToggle}
              className="data-[state=checked]:bg-purple-600"
            />
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>

          <Button variant="secondary" className="ml-4">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default BrowseHeader;
