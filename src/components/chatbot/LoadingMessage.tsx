
import React from 'react';
import { Bot, Loader2 } from 'lucide-react';

export const LoadingMessage: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white text-gray-800 p-4 rounded-2xl border border-purple-100 shadow-lg mr-4">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5 text-purple-600" />
          <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
          <span className="text-sm font-medium">Analyzing product database...</span>
        </div>
      </div>
    </div>
  );
};
