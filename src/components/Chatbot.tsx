
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
    const lowerName = productName.toLowerCase().trim();
    
    // Direct name matching
    const directMatch = Object.keys(productDatabase).find(key => 
      key.toLowerCase() === lowerName ||
      productDatabase[key].name.toLowerCase() === lowerName
    );
    
    if (directMatch) return productDatabase[directMatch];
    
    // Partial matching for common product queries
    const partialMatch = Object.keys(productDatabase).find(key => {
      const product = productDatabase[key];
      const keyWords = key.toLowerCase().split(' ');
      const nameWords = product.name.toLowerCase().split(' ');
      const brandWords = product.brand.toLowerCase().split(' ');
      const searchWords = lowerName.split(' ');
      
      return searchWords.some(searchWord => 
        keyWords.some(word => word.includes(searchWord) || searchWord.includes(word)) ||
        nameWords.some(word => word.includes(searchWord) || searchWord.includes(word)) ||
        brandWords.some(word => word.includes(searchWord) || searchWord.includes(word))
      );
    });
    
    return partialMatch ? productDatabase[partialMatch] : null;
  };

  const generateSmartResponse = (userQuery: string, productInfo: any) => {
    const query = userQuery.toLowerCase();
    
    if (productInfo) {
      let response = `**${productInfo.name}** by ${productInfo.brand}\n\n`;
      
      // Enhanced safety rating analysis with more detail
      const riskLevel = productInfo.riskLevel;
      if (riskLevel === 'low') {
        response += `✅ **Safety Rating: LOW RISK** ⭐⭐⭐⭐⭐\nThis product is generally safe for consumption with minimal health concerns. Suitable for regular consumption.\n\n`;
      } else if (riskLevel === 'medium') {
        response += `⚠️ **Safety Rating: MEDIUM RISK** ⭐⭐⭐\nConsume in moderation. Some ingredients may cause concerns with frequent consumption. Consider limiting intake.\n\n`;
      } else {
        response += `🚨 **Safety Rating: HIGH RISK** ⭐⭐\nConsider avoiding or consuming very rarely due to potentially harmful ingredients. Look for healthier alternatives.\n\n`;
      }

      // Detailed ingredient analysis
      if (productInfo.chemicals && productInfo.chemicals.length > 0) {
        response += `**Ingredients of Concern:**\n`;
        productInfo.chemicals.forEach((chemical: string) => {
          let riskEmoji = '⚠️';
          if (chemical.includes('MSG') || chemical.includes('TBHQ') || chemical.includes('BHA')) {
            riskEmoji = '🚨';
          } else if (chemical.includes('Artificial') || chemical.includes('Preservatives')) {
            riskEmoji = '⚠️';
          } else {
            riskEmoji = '🟡';
          }
          response += `${riskEmoji} ${chemical}\n`;
        });
        response += '\n';
      } else {
        response += `✅ **No Harmful Chemicals Detected**\nThis product appears to be free from major harmful additives.\n\n`;
      }

      // Enhanced nutritional information
      if (productInfo.healthInfo) {
        response += `**Nutritional Information (per 100g):**\n`;
        const nutrition = productInfo.healthInfo.nutritionalValue;
        response += `🔥 Calories: ${nutrition.calories} kcal\n`;
        response += `💪 Protein: ${nutrition.protein}g\n`;
        response += `🍞 Carbs: ${nutrition.carbs}g\n`;
        response += `🧈 Fat: ${nutrition.fat}g\n`;
        if (nutrition.fiber) response += `🌾 Fiber: ${nutrition.fiber}g\n`;
        response += '\n';

        // Allergen information with better formatting
        if (productInfo.healthInfo.allergens && productInfo.healthInfo.allergens.length > 0) {
          response += `**⚠️ Allergen Information:**\n`;
          productInfo.healthInfo.allergens.forEach((allergen: string) => {
            response += `• ${allergen}\n`;
          });
          response += '\n';
        }

        // Storage and shelf life info
        if (productInfo.healthInfo.shelfLife) {
          response += `**📦 Storage Information:**\n`;
          response += `• Shelf Life: ${productInfo.healthInfo.shelfLife}\n`;
          response += `• Storage: ${productInfo.healthInfo.storageInstructions}\n\n`;
        }
      }

      // Context-aware responses based on user query
      if (query.includes('safe') || query.includes('safety') || query.includes('risk')) {
        response += `**Detailed Safety Assessment:**\n`;
        if (riskLevel === 'high') {
          response += `This product contains multiple concerning ingredients that may pose health risks with regular consumption. Consider choosing alternatives with fewer artificial additives.`;
        } else if (riskLevel === 'medium') {
          response += `This product is relatively safe but contains some ingredients that warrant moderation. It's fine for occasional consumption.`;
        } else {
          response += `This product is generally safe for regular consumption with minimal health concerns.`;
        }
        response += '\n\n';
      }

      if (query.includes('ingredient') || query.includes('chemical') || query.includes('harmful')) {
        response += `**Ingredient Deep Dive:**\n`;
        if (productInfo.chemicals.length > 0) {
          response += `The main concerns are preservatives and artificial additives. `;
          if (productInfo.chemicals.includes('MSG')) {
            response += `MSG can cause headaches and sensitivity in some people. `;
          }
          if (productInfo.chemicals.includes('TBHQ')) {
            response += `TBHQ is a synthetic preservative linked to potential health issues. `;
          }
          response += `Always check the complete ingredient list on packaging.\n\n`;
        }
      }

      if (query.includes('alternative') || query.includes('substitute') || query.includes('healthier')) {
        response += `**🌱 Healthier Alternatives:**\n`;
        response += `• Look for organic or natural variants\n`;
        response += `• Choose products with fewer preservatives\n`;
        response += `• Consider homemade alternatives\n`;
        response += `• Check for "no artificial colors/flavors" labels\n`;
        response += `• Opt for brands with cleaner ingredient lists\n\n`;
      }

      // Category-specific advice
      if (productInfo.category === 'Beverages') {
        response += `**💧 Beverage Safety Tip:** Consider limiting sugary drinks and opt for water, fresh juices, or healthier alternatives.`;
      } else if (productInfo.category === 'Chips' || productInfo.category === 'Snacks') {
        response += `**🥔 Snack Safety Tip:** Enjoy in moderation and balance with healthier snacks like nuts, fruits, or homemade options.`;
      } else if (productInfo.category === 'Biscuits') {
        response += `**🍪 Biscuit Safety Tip:** Check for trans fats and choose whole grain options when available.`;
      }

      return response;
    } else {
      // Enhanced general guidance when product not found
      let response = `I couldn't find "${userQuery}" in our comprehensive database of Indian products, but here's helpful guidance:\n\n`;
      
      // Category-specific advice
      if (query.includes('chip') || query.includes('namkeen') || query.includes('wafer')) {
        response += `**🥔 For Chips/Namkeen:**\n• Avoid MSG, TBHQ, artificial colors\n• Check sodium content\n• Look for baked alternatives\n• Choose brands with natural ingredients\n\n`;
      }
      
      if (query.includes('biscuit') || query.includes('cookie')) {
        response += `**🍪 For Biscuits/Cookies:**\n• Avoid trans fats (partially hydrogenated oils)\n• Choose whole grain options\n• Limit high sugar content\n• Look for natural ingredients\n\n`;
      }

      if (query.includes('noodles') || query.includes('pasta')) {
        response += `**🍜 For Noodles:**\n• Check for TBHQ and MSG\n• Look for whole grain options\n• Limit sodium content\n• Choose brands with fewer preservatives\n\n`;
      }

      if (query.includes('drink') || query.includes('beverage') || query.includes('juice')) {
        response += `**🥤 For Beverages:**\n• Avoid high fructose corn syrup\n• Check artificial colors and flavors\n• Limit phosphoric acid content\n• Choose natural fruit juices\n\n`;
      }

      response += `**🔍 General Food Safety Tips:**\n`;
      response += `• Always read ingredient labels carefully\n`;
      response += `• Choose products with fewer, recognizable ingredients\n`;
      response += `• Limit processed foods in your diet\n`;
      response += `• When in doubt, opt for fresh, whole foods\n`;
      response += `• Look for certifications like organic or natural\n\n`;
      
      response += `**📋 Available Products in Our Database:**\n`;
      response += `I have detailed information about ${Object.keys(productDatabase).length} popular Indian products including:\n`;
      response += `• Lay's Magic Masala, Balaji Wafers\n`;
      response += `• Parle-G, Monaco, Britannia products\n`;
      response += `• Maggi Noodles, Kurkure, Haldiram's snacks\n`;
      response += `• Thums Up, Frooti, Amul products\n`;
      response += `• Cadbury chocolates and more!\n\n`;
      response += `Could you provide the exact product name or brand? I can give you detailed safety analysis!`;
      
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
