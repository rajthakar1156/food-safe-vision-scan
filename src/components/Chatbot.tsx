
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

  const generateSmartResponse = (userQuery: string, productInfo: any) => {
    const query = userQuery.toLowerCase();
    
    if (productInfo) {
      let response = `**${productInfo.name}** by ${productInfo.brand}\n\n`;
      
      // Safety rating analysis
      const riskLevel = productInfo.riskLevel;
      if (riskLevel === 'low') {
        response += `✅ **Safety Rating: LOW RISK**\nThis product is generally safe for consumption with minimal health concerns.\n\n`;
      } else if (riskLevel === 'medium') {
        response += `⚠️ **Safety Rating: MEDIUM RISK**\nConsume in moderation. Some ingredients may cause concerns with regular consumption.\n\n`;
      } else {
        response += `🚨 **Safety Rating: HIGH RISK**\nConsider avoiding or consuming very rarely due to potentially harmful ingredients.\n\n`;
      }

      // Key ingredients
      if (productInfo.chemicals && productInfo.chemicals.length > 0) {
        response += `**Key Ingredients of Concern:**\n`;
        productInfo.chemicals.forEach((chemical: string) => {
          response += `• ${chemical}\n`;
        });
        response += '\n';
      }

      // Health information
      if (productInfo.healthInfo) {
        response += `**Nutritional Information (per serving):**\n`;
        const nutrition = productInfo.healthInfo.nutritionalValue;
        response += `• Calories: ${nutrition.calories}\n`;
        response += `• Protein: ${nutrition.protein}g\n`;
        response += `• Carbs: ${nutrition.carbs}g\n`;
        response += `• Fat: ${nutrition.fat}g\n\n`;

        if (productInfo.healthInfo.allergens && productInfo.healthInfo.allergens.length > 0) {
          response += `**Allergen Information:**\n`;
          productInfo.healthInfo.allergens.forEach((allergen: string) => {
            response += `⚠️ ${allergen}\n`;
          });
          response += '\n';
        }
      }

      // Specific query responses
      if (query.includes('safe') || query.includes('safety')) {
        response += `**Safety Assessment:**\nBased on the risk level and ingredients, this product is classified as ${riskLevel} risk. `;
        if (riskLevel === 'medium' || riskLevel === 'high') {
          response += `Consider limiting consumption frequency and exploring healthier alternatives.`;
        } else {
          response += `It's generally safe for regular consumption.`;
        }
      }

      if (query.includes('ingredient') || query.includes('chemical')) {
        response += `**Ingredient Analysis:**\nThe main ingredients of concern include preservatives and flavor enhancers. Check the full ingredient list on packaging for complete information.`;
      }

      if (query.includes('alternative') || query.includes('substitute')) {
        response += `**Healthier Alternatives:**\n• Look for organic or natural variants\n• Choose products with fewer preservatives\n• Consider homemade alternatives\n• Check for "no artificial flavors" labels`;
      }

      return response;
    } else {
      // General food safety advice when product not found
      let response = `I couldn't find specific information about "${userQuery}" in my database, but here's some general food safety guidance:\n\n`;
      
      if (query.includes('chip') || query.includes('snack')) {
        response += `**For Chips/Snacks:**\n• Look for products with minimal ingredients\n• Avoid items with MSG, TBHQ, or artificial colors\n• Check sodium content\n• Consider baked alternatives\n\n`;
      }
      
      if (query.includes('biscuit') || query.includes('cookie')) {
        response += `**For Biscuits/Cookies:**\n• Check for trans fats (partially hydrogenated oils)\n• Look for whole grain options\n• Limit products with high sugar content\n• Choose items with natural ingredients\n\n`;
      }

      response += `**General Tips:**\n• Always read ingredient labels\n• Choose products with fewer, recognizable ingredients\n• Limit processed foods in your diet\n• When in doubt, opt for fresh, whole foods\n\n`;
      response += `Could you provide the exact product name or brand? I can give you more specific information!`;
      
      return response;
    }
  };

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
      await new Promise(resolve => setTimeout(resolve, 800));

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
        text: "I'm having trouble processing your request right now. Please try asking about a specific product name or ingredient!",
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
                    <span className="text-sm">Analyzing product...</span>
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
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Free AI - No API key required
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
