
import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
          message.isUser
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white ml-4'
            : 'bg-white text-gray-800 border border-purple-100 mr-4'
        }`}
      >
        <div className="flex items-start gap-3">
          {!message.isUser && (
            <div className="flex-shrink-0">
              <Bot className="w-5 h-5 mt-1 text-purple-600" />
            </div>
          )}
          {message.isUser && (
            <div className="flex-shrink-0">
              <User className="w-5 h-5 mt-1" />
            </div>
          )}
          <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</div>
        </div>
      </div>
    </div>
  );
};
