import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface PromptInputProps {
  onSubmit?: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const PromptInput = ({
  onSubmit = () => {},
  isLoading = false,
  placeholder = 'Try "Show me fantasy books with strong female protagonists" or "Find me books similar to The Lord of the Rings"',
}: PromptInputProps) => {
  const [prompt, setPrompt] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="min-h-[120px] text-lg p-4 bg-gray-800 border-gray-700 focus:border-primary"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-6 py-2 text-lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Get Recommendations
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
