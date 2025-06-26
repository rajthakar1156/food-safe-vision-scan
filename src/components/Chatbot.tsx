
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatHeader } from './chatbot/ChatHeader';
import { ChatMessage } from './chatbot/ChatMessage';
import { ChatInput } from './chatbot/ChatInput';
import { LoadingMessage } from './chatbot/LoadingMessage';
import { Message } from './chatbot/types';
import { getProductInfo } from './chatbot/productMatcher';
import { generateSmartResponse } from './chatbot/responseGenerator';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Good day! I am your dedicated Food Safety AI Assistant, equipped with comprehensive data on 16+ popular Indian food products.\n\nI provide detailed analysis including:\n• Complete ingredient profiles and safety assessments\n• Nutritional information and health recommendations\n• Risk evaluations and alternative product suggestions\n• Storage guidelines and consumption advice\n\nPlease feel free to inquire about any specific product such as Maggi, Lays, Parle-G, or similar items for a thorough analysis.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Get product info from local database
      const productInfo = getProductInfo(currentInput);
      
      // Generate smart response using local logic
      const responseText = generateSmartResponse(currentInput, productInfo);

      // Add a small delay to simulate processing for better UX
      await new Promise(resolve => setTimeout(resolve, 1200));

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize for the technical difficulty. Please try rephrasing your query or specify a particular product name for analysis.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="w-7 h-7" />
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300" />
          </Button>
        )}
      </div>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-3xl shadow-2xl border-2 border-purple-200/50 flex flex-col overflow-hidden backdrop-blur-xl">
          <ChatHeader onClose={() => setIsOpen(false)} />

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50/30 to-pink-50/30">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <LoadingMessage />}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSendMessage={sendMessage}
            isLoading={isLoading}
            onKeyPress={handleKeyPress}
          />
        </div>
      )}
    </>
  );
};

export default Chatbot;
