
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { productDatabase } from '@/types/chemical';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Food Safety AI Assistant. Ask me about any Indian food product's ingredients, safety rating, or health concerns. Just mention the product name!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini-api-key') || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getProductInfo = (productName: string) => {
    const lowerName = productName.toLowerCase();
    const matchedProduct = Object.keys(productDatabase).find(key => 
      key.toLowerCase().includes(lowerName) ||
      productDatabase[key].name.toLowerCase().includes(lowerName) ||
      productDatabase[key].brand.toLowerCase().includes(lowerName)
    );

    if (matchedProduct) {
      return productDatabase[matchedProduct];
    }
    return null;
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // Check if API key is provided
    if (!apiKey) {
      const userApiKey = prompt('Please enter your Gemini AI API key to continue:');
      if (!userApiKey) return;
      setApiKey(userApiKey);
      localStorage.setItem('gemini-api-key', userApiKey);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get product info from local database first
      const productInfo = getProductInfo(inputValue);
      let contextInfo = '';
      
      if (productInfo) {
        contextInfo = `Product found in database: ${productInfo.name} by ${productInfo.brand}. 
        Category: ${productInfo.category}. 
        Risk Level: ${productInfo.riskLevel}. 
        Key Ingredients: ${productInfo.keyIngredients?.join(', ') || 'Not specified'}. 
        Health Concerns: ${productInfo.healthConcerns?.join(', ') || 'None specified'}. 
        Additives: ${productInfo.additives?.join(', ') || 'None specified'}.`;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a food safety AI assistant specializing in Indian food products. 
              User query: "${inputValue}"
              
              ${contextInfo ? `Database information: ${contextInfo}` : ''}
              
              Please provide helpful information about:
              1. Product ingredients and their safety
              2. Health benefits or concerns
              3. Safety rating (if applicable)
              4. Recommendations for healthier alternatives
              
              Keep responses concise, informative, and focused on food safety. If you don't have specific information about a product, provide general guidance about similar products or ingredients.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.candidates[0].content.parts[0].text,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the AI service. Please check your API key and try again.",
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
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Food Safety AI</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!message.isUser && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                    {message.isUser && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any food product..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {!apiKey && (
              <p className="text-xs text-gray-500 mt-2">
                Gemini AI API key required for chat functionality
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
