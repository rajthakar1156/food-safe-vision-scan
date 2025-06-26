
import React from 'react';
import { Send, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  onSendMessage,
  isLoading,
  onKeyPress
}) => {
  return (
    <div className="p-4 border-t border-purple-200/50 bg-white">
      <div className="flex gap-3 mb-3">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask about any food product..."
          className="flex-1 rounded-xl border-2 border-purple-200 focus:border-purple-400"
          disabled={isLoading}
        />
        <Button
          onClick={onSendMessage}
          disabled={isLoading || !inputValue.trim()}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl px-4"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-purple-600 flex items-center gap-1 text-xs">
          <Award className="w-3 h-3" />
          Instant Product Analysis
        </p>
      </div>
    </div>
  );
};
