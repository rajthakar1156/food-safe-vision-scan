
import React from 'react';
import { Bot, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Bot className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <span className="font-bold text-lg">Food Safety AI</span>
          <div className="text-xs text-purple-100 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            16+ Products Database
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="text-white hover:bg-white/20 rounded-full p-2"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
};
