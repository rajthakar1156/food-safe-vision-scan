import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader2, Sparkles, Shield, TrendingUp, AlertTriangle, CheckCircle, Star, Award, Info } from 'lucide-react';
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
      text: "🌟 Hello! I'm your **Smart Food Safety AI Assistant**! 🍽️\n\nI have detailed information about **16+ popular Indian food products** including ingredients, safety ratings, nutritional facts, and health recommendations.\n\n✨ **What I can help with:**\n• Complete product analysis\n• Safety ratings & risk assessment\n• Ingredient breakdown\n• Nutritional information\n• Health recommendations\n• Alternative suggestions\n\n💬 Just mention any product name like *Maggi*, *Lays*, *Parle-G*, etc!",
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
    
    console.log('Searching for product:', lowerName);
    console.log('Available products:', Object.keys(productDatabase));
    
    // Enhanced exact matching with comprehensive product aliases
    const exactMatches = {
      // Maggi variations
      'maggi': 'maggi masala',
      'maggi masala': 'maggi masala', 
      'maggi noodles': 'maggi masala',
      'maggi instant noodles': 'maggi masala',
      'maggi 2 minute': 'maggi masala',
      'nestle maggi': 'maggi masala',
      
      // Parle-G variations
      'parle g': 'parle g',
      'parle-g': 'parle g',
      'parle g biscuit': 'parle g',
      'glucose biscuit': 'parle g',
      
      // Lays variations
      'lays': 'lays magic masala',
      'lays masala': 'lays magic masala',
      'lays magic masala': 'lays magic masala',
      'lays chips': 'lays magic masala',
      'magic masala': 'lays magic masala',
      
      // Balaji variations
      'balaji': 'balaji wafers',
      'balaji wafers': 'balaji wafers',
      'balaji simply salted': 'balaji wafers',
      'balaji chips': 'balaji wafers',
      
      // Haldiram variations
      'haldiram': 'haldiram aloo bhujia',
      'haldiram aloo bhujia': 'haldiram aloo bhujia',
      'haldirams': 'haldiram aloo bhujia',
      'aloo bhujia': 'haldiram aloo bhujia',
      'bhujia': 'haldiram aloo bhujia',
      
      // Britannia variations
      'britannia bourbon': 'britannia bourbon',
      'bourbon': 'britannia bourbon',
      'bourbon biscuit': 'britannia bourbon',
      'marie gold': 'britannia marie gold',
      'britannia marie': 'britannia marie gold',
      'marie biscuit': 'britannia marie gold',
      
      // Kurkure variations
      'kurkure': 'kurkure masala munch',
      'kurkure masala': 'kurkure masala munch',
      'kurkure masala munch': 'kurkure masala munch',
      'masala munch': 'kurkure masala munch',
      
      // Cadbury variations
      'cadbury': 'cadbury dairy milk',
      'dairy milk': 'cadbury dairy milk',
      'cadbury dairy milk': 'cadbury dairy milk',
      'dairy milk chocolate': 'cadbury dairy milk',
      
      // Ching's variations
      'ching': 'chings hakka noodles',
      'chings': 'chings hakka noodles',
      'chings noodles': 'chings hakka noodles',
      'hakka noodles': 'chings hakka noodles',
      'chings hakka': 'chings hakka noodles',
      
      // Amul variations
      'amul': 'amul kool milk',
      'amul kool': 'amul kool milk',
      'amul kool milk': 'amul kool milk',
      'kool milk': 'amul kool milk',
      
      // Beverages
      'thums up': 'thums up',
      'thumsup': 'thums up',
      'thums up cola': 'thums up',
      'frooti': 'mango frooti',
      'mango frooti': 'mango frooti',
      'frooti mango': 'mango frooti',
      
      // Monaco
      'monaco': 'parle monaco',
      'parle monaco': 'parle monaco',
      'monaco biscuit': 'parle monaco',
      'salted crackers': 'parle monaco'
    };

    // Check exact matches first
    if (exactMatches[lowerName]) {
      const productKey = exactMatches[lowerName];
      console.log('Found exact match:', productKey);
      return productDatabase[productKey];
    }

    // Direct key matching
    const directMatch = Object.keys(productDatabase).find(key => 
      key.toLowerCase() === lowerName
    );
    
    if (directMatch) {
      console.log('Found direct key match:', directMatch);
      return productDatabase[directMatch];
    }

    // Enhanced brand + product matching
    const brandProductMatches = Object.keys(productDatabase).find(key => {
      const product = productDatabase[key];
      const searchTerms = lowerName.split(' ');
      const productNameWords = product.name.toLowerCase().split(' ');
      const brandWords = product.brand.toLowerCase().split(' ');
      const keyWords = key.toLowerCase().split(' ');
      
      // Check if search contains both brand and product identifiers
      const hasBrand = brandWords.some(brand => 
        searchTerms.some(term => term.includes(brand) || brand.includes(term))
      );
      const hasProduct = productNameWords.some(word => 
        searchTerms.some(term => term.includes(word) || word.includes(term))
      ) || keyWords.some(word => 
        searchTerms.some(term => term.includes(word) || word.includes(term))
      );
      
      return hasBrand && hasProduct;
    });
    
    if (brandProductMatches) {
      console.log('Found brand+product match:', brandProductMatches);
      return productDatabase[brandProductMatches];
    }

    console.log('No match found for:', lowerName);
    return null;
  };

  const generateSmartResponse = (userQuery: string, productInfo: any) => {
    const query = userQuery.toLowerCase();
    
    if (productInfo) {
      // Enhanced product header with fancy styling
      let response = `🌟 **${productInfo.name}**\n`;
      response += `🏢 *${productInfo.brand}* | 📦 *${productInfo.category}*\n\n`;
      
      // Comprehensive safety rating with detailed analysis
      const riskLevel = productInfo.riskLevel;
      let safetyIcon, safetyText, safetyColor, stars;
      
      if (riskLevel === 'low') {
        safetyIcon = '✅';
        safetyText = 'EXCELLENT SAFETY';
        safetyColor = '🟢';
        stars = '⭐⭐⭐⭐⭐';
        response += `${safetyIcon} **SAFETY RATING: ${safetyText}** ${stars}\n`;
        response += `${safetyColor} **Verdict:** This product meets high safety standards with minimal health concerns. Perfect for regular consumption!\n\n`;
      } else if (riskLevel === 'medium') {
        safetyIcon = '⚠️';
        safetyText = 'MODERATE SAFETY';
        safetyColor = '🟡';
        stars = '⭐⭐⭐';
        response += `${safetyIcon} **SAFETY RATING: ${safetyText}** ${stars}\n`;
        response += `${safetyColor} **Verdict:** Generally safe but contains some additives. Best enjoyed in moderation as an occasional treat.\n\n`;
      } else {
        safetyIcon = '🚨';
        safetyText = 'CAUTION ADVISED';
        safetyColor = '🔴';
        stars = '⭐⭐';
        response += `${safetyIcon} **SAFETY RATING: ${safetyText}** ${stars}\n`;
        response += `${safetyColor} **Verdict:** Contains multiple concerning ingredients. Consider limiting consumption and exploring healthier alternatives.\n\n`;
      }

      // Detailed ingredient analysis with fancy formatting
      response += `🧪 **INGREDIENT ANALYSIS**\n`;
      response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      
      if (productInfo.chemicals && productInfo.chemicals.length > 0) {
        response += `**🔍 Chemicals & Additives Detected:**\n`;
        productInfo.chemicals.forEach((chemical: string, index: number) => {
          let riskEmoji = '🟡';
          let riskText = 'MODERATE';
          
          if (chemical.includes('MSG') || chemical.includes('TBHQ') || chemical.includes('BHA') || chemical.includes('Red 40')) {
            riskEmoji = '🔴';
            riskText = 'HIGH CONCERN';
          } else if (chemical.includes('Artificial') || chemical.includes('Preservatives') || chemical.includes('Colors')) {
            riskEmoji = '🟠';
            riskText = 'MODERATE CONCERN';
          } else {
            riskEmoji = '🟢';
            riskText = 'LOW CONCERN';
          }
          
          response += `${index + 1}. ${riskEmoji} **${chemical}** - *${riskText}*\n`;
        });
        response += '\n';
      } else {
        response += `✨ **CLEAN INGREDIENT PROFILE**\n`;
        response += `🟢 No major harmful chemicals detected! This product appears to use cleaner ingredients.\n\n`;
      }

      // Comprehensive nutritional information with attractive formatting
      if (productInfo.healthInfo) {
        response += `📊 **NUTRITIONAL BREAKDOWN** *(per 100g)*\n`;
        response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        
        const nutrition = productInfo.healthInfo.nutritionalValue;
        response += `🔥 **Energy:** ${nutrition.calories} kcal\n`;
        response += `💪 **Protein:** ${nutrition.protein}g *(Muscle Building)*\n`;
        response += `🍞 **Carbohydrates:** ${nutrition.carbs}g *(Energy Source)*\n`;
        response += `🧈 **Fat:** ${nutrition.fat}g *(Essential Fats)*\n`;
        if (nutrition.fiber) response += `🌾 **Fiber:** ${nutrition.fiber}g *(Digestive Health)*\n`;
        
        // Nutritional rating
        const totalCalories = nutrition.calories;
        let nutritionRating = '';
        if (totalCalories < 150) {
          nutritionRating = '🟢 **LOW CALORIE** - Good for weight management';
        } else if (totalCalories < 250) {
          nutritionRating = '🟡 **MODERATE CALORIE** - Consume mindfully';
        } else {
          nutritionRating = '🔴 **HIGH CALORIE** - Limit portion sizes';
        }
        response += `\n📈 **Caloric Assessment:** ${nutritionRating}\n\n`;

        // Enhanced allergen information
        if (productInfo.healthInfo.allergens && productInfo.healthInfo.allergens.length > 0) {
          response += `⚠️ **ALLERGEN ALERT**\n`;
          response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
          productInfo.healthInfo.allergens.forEach((allergen: string, index: number) => {
            response += `${index + 1}. 🚨 **${allergen}**\n`;
          });
          response += `\n💡 *Always check packaging for complete allergen information*\n\n`;
        }

        // Storage and shelf life with fancy formatting
        if (productInfo.healthInfo.shelfLife) {
          response += `📦 **STORAGE & FRESHNESS GUIDE**\n`;
          response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
          response += `⏰ **Shelf Life:** ${productInfo.healthInfo.shelfLife}\n`;
          response += `🏠 **Storage:** ${productInfo.healthInfo.storageInstructions}\n`;
          response += `💡 **Tip:** Always check expiry dates before consumption\n\n`;
        }
      }

      // Context-aware detailed recommendations
      if (query.includes('safe') || query.includes('safety') || query.includes('risk')) {
        response += `🛡️ **DETAILED SAFETY ASSESSMENT**\n`;
        response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        if (riskLevel === 'high') {
          response += `🔴 **HIGH RISK FACTORS IDENTIFIED**\n`;
          response += `• Contains multiple artificial additives\n`;
          response += `• May pose health risks with regular consumption\n`;
          response += `• Consider choosing alternatives with cleaner ingredients\n`;
          response += `• If consumed, limit frequency and portion sizes\n\n`;
        } else if (riskLevel === 'medium') {
          response += `🟡 **MODERATE RISK ASSESSMENT**\n`;
          response += `• Generally safe with some artificial components\n`;
          response += `• Perfect for occasional enjoyment\n`;
          response += `• Balance with healthier food choices\n`;
          response += `• Monitor consumption frequency\n\n`;
        } else {
          response += `🟢 **LOW RISK - EXCELLENT CHOICE**\n`;
          response += `• Meets high safety standards\n`;
          response += `• Suitable for regular consumption\n`;
          response += `• Contains minimal concerning ingredients\n`;
          response += `• Great option for everyday snacking\n\n`;
        }
      }

      // Enhanced health recommendations with fancy styling
      response += `💡 **SMART HEALTH RECOMMENDATIONS**\n`;
      response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      
      // Category-specific detailed advice
      if (productInfo.category === 'Beverages') {
        response += `🥤 **BEVERAGE WISDOM:**\n`;
        response += `• 💧 Hydrate primarily with water\n`;
        response += `• 🍊 Choose fresh fruit juices when possible\n`;
        response += `• ⏰ Best consumed during active hours\n`;
        response += `• 🚫 Avoid before bedtime if caffeinated\n\n`;
      } else if (productInfo.category === 'Chips' || productInfo.category === 'Snacks' || productInfo.category === 'Namkeen') {
        response += `🥔 **SNACKING SMART:**\n`;
        response += `• 🍎 Balance with fruits and nuts\n`;
        response += `• 💧 Drink plenty of water\n`;
        response += `• 🏃 Pair with physical activity\n`;
        response += `• 📏 Practice portion control\n\n`;
      } else if (productInfo.category === 'Biscuits') {
        response += `🍪 **BISCUIT BEST PRACTICES:**\n`;
        response += `• ☕ Perfect with tea or milk\n`;
        response += `• 🌾 Look for whole grain options\n`;
        response += `• ⚖️ Monitor trans fat content\n`;
        response += `• 🕐 Ideal for breakfast or evening snacks\n\n`;
      } else if (productInfo.category === 'Noodles') {
        response += `🍜 **NOODLE NUTRITION:**\n`;
        response += `• 🥬 Add vegetables for nutrition\n`;
        response += `• 🥚 Include protein sources\n`;
        response += `• 💧 Don't drink the excess water\n`;
        response += `• 🍽️ Make it a complete meal\n\n`;
      } else if (productInfo.category === 'Chocolate') {
        response += `🍫 **CHOCOLATE ENJOYMENT:**\n`;
        response += `• 🌙 Best consumed in evening\n`;
        response += `• 🏃 Balance with physical activity\n`;
        response += `• 🧘 Enjoy mindfully in small portions\n`;
        response += `• 🥛 Pair with milk for added nutrition\n\n`;
      }

      // Alternative suggestions with comprehensive formatting
      if (query.includes('alternative') || query.includes('substitute') || query.includes('healthier') || riskLevel === 'high') {
        response += `🌱 **HEALTHIER ALTERNATIVES & UPGRADES**\n`;
        response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        response += `**🏪 Shopping Tips:**\n`;
        response += `• 🔍 Look for "No Artificial Colors/Flavors" labels\n`;
        response += `• 🌿 Choose organic or natural variants\n`;
        response += `• 📋 Prefer products with shorter ingredient lists\n`;
        response += `• 🏆 Select brands with transparency certifications\n\n`;
        
        response += `**🍽️ Homemade Options:**\n`;
        response += `• 🥜 Roasted nuts and seeds\n`;
        response += `• 🍓 Fresh fruits and berries\n`;
        response += `• 🥕 Vegetable chips (baked)\n`;
        response += `• 🍪 Homemade biscuits/snacks\n\n`;
      }

      // Final summary with actionable insights
      response += `📋 **QUICK SUMMARY**\n`;
      response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      response += `**✅ What's Good:** ${riskLevel === 'low' ? 'Clean ingredients, safe for regular use' : riskLevel === 'medium' ? 'Decent option for occasional consumption' : 'Brand recognition, widely available'}\n`;
      response += `**⚠️ Watch Out For:** ${productInfo.chemicals.length > 0 ? productInfo.chemicals.slice(0, 2).join(', ') : 'No major concerns'}\n`;
      response += `**🎯 Best Use:** ${riskLevel === 'low' ? 'Daily snacking, any time' : riskLevel === 'medium' ? 'Weekend treats, special occasions' : 'Rare indulgence only'}\n`;
      response += `**💰 Value:** Great for the price point and convenience\n\n`;
      
      response += `*💡 Remember: Moderation is key to a healthy lifestyle! This analysis is based on ingredient information and general health guidelines.*`;

      return response;
    } else {
      // Enhanced response when product not found
      let response = `🔍 **Product Search Results**\n`;
      response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      response += `I couldn't find **"${userQuery}"** in our comprehensive database, but I'm here to help! 🤝\n\n`;
      
      // Smart category suggestions based on query
      if (query.includes('chip') || query.includes('namkeen') || query.includes('wafer') || query.includes('snack')) {
        response += `🥔 **CHIPS & SNACKS GUIDANCE:**\n`;
        response += `• ❌ **Avoid:** MSG, TBHQ, Artificial Colors (Red 40, Yellow 6)\n`;
        response += `• ✅ **Look For:** Natural ingredients, No trans fats\n`;
        response += `• 🏆 **Better Choices:** Baked varieties, Multigrain options\n`;
        response += `• 🧂 **Watch:** Sodium content (aim for <400mg per serving)\n\n`;
      }
      
      if (query.includes('biscuit') || query.includes('cookie') || query.includes('cracker')) {
        response += `🍪 **BISCUITS & COOKIES WISDOM:**\n`;
        response += `• ❌ **Red Flags:** Trans fats, High sugar (>20g per 100g)\n`;
        response += `• ✅ **Green Flags:** Whole grain, Natural sweeteners\n`;
        response += `• 🌾 **Upgrade:** Choose oat, multigrain variants\n`;
        response += `• 📊 **Check:** Fiber content (higher is better)\n\n`;
      }

      if (query.includes('noodles') || query.includes('pasta') || query.includes('instant')) {
        response += `🍜 **INSTANT NOODLES ANALYSIS:**\n`;
        response += `• ❌ **Concerning:** TBHQ, MSG, High sodium (>900mg)\n`;
        response += `• ✅ **Better Options:** Whole grain, Organic varieties\n`;
        response += `• 🥬 **Enhancement:** Add vegetables, proteins\n`;
        response += `• 💡 **Tip:** Use only half the seasoning packet\n\n`;
      }

      if (query.includes('drink') || query.includes('beverage') || query.includes('juice') || query.includes('cola')) {
        response += `🥤 **BEVERAGE SAFETY GUIDE:**\n`;
        response += `• ❌ **Avoid:** High Fructose Corn Syrup, Phosphoric Acid\n`;
        response += `• ✅ **Choose:** Natural fruit juices, No artificial colors\n`;
        response += `• 🍊 **Best:** Fresh juices, Coconut water, Herbal teas\n`;
        response += `• 📉 **Limit:** Added sugars (<25g daily for adults)\n\n`;
      }

      // Comprehensive product database showcase
      response += `📚 **OUR PRODUCT DATABASE** *(16+ Popular Products)*\n`;
      response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      
      response += `🥔 **CHIPS & SNACKS:**\n`;
      response += `• Lay's Magic Masala, Balaji Wafers\n`;
      response += `• Kurkure Masala Munch, Haldiram's Aloo Bhujia\n\n`;
      
      response += `🍪 **BISCUITS & CRACKERS:**\n`;
      response += `• Parle-G, Monaco, Britannia Bourbon\n`;
      response += `• Britannia Marie Gold\n\n`;
      
      response += `🍜 **INSTANT FOODS:**\n`;
      response += `• Maggi Masala Noodles, Ching's Hakka Noodles\n\n`;
      
      response += `🥤 **BEVERAGES:**\n`;
      response += `• Thums Up, Mango Frooti, Amul Kool Milk\n\n`;
      
      response += `🍫 **CHOCOLATES:**\n`;
      response += `• Cadbury Dairy Milk\n\n`;
      
      response += `💡 **HOW TO GET DETAILED ANALYSIS:**\n`;
      response += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      response += `Just type the **exact product name** or **brand name**!\n\n`;
      response += `**Examples:**\n`;
      response += `• "Maggi" or "Maggi Masala Noodles"\n`;
      response += `• "Lays" or "Lays Magic Masala"\n`;
      response += `• "Parle G" or "Glucose Biscuit"\n`;
      response += `• "Bourbon" or "Britannia Bourbon"\n\n`;
      
      response += `🎯 **TRY ASKING:**\n`;
      response += `• "Is Maggi safe?" → *Complete safety analysis*\n`;
      response += `• "Lays ingredients" → *Detailed chemical breakdown*\n`;
      response += `• "Parle G nutrition" → *Full nutritional profile*\n`;
      response += `• "Alternatives to Kurkure" → *Healthier suggestions*\n\n`;
      
      response += `✨ *I provide instant, detailed analysis with safety ratings, ingredient breakdowns, nutritional facts, and personalized health recommendations!*`;
      
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
        text: "🚨 I'm having trouble processing your request right now. Please try asking about a specific product name or ingredient! 🔄",
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
            className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse"
          >
            <MessageCircle className="w-7 h-7" />
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300" />
          </Button>
        )}
      </div>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-3xl shadow-2xl border-2 border-purple-200/50 flex flex-col overflow-hidden backdrop-blur-xl">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
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
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50/30 to-pink-50/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
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
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 p-4 rounded-2xl border border-purple-100 shadow-lg mr-4">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-purple-600" />
                    <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                    <span className="text-sm font-medium">Analyzing product database...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t border-purple-200/50 bg-white">
            <div className="flex gap-3 mb-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any food product..."
                className="flex-1 rounded-xl border-2 border-purple-200 focus:border-purple-400"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between text-xs">
              <p className="text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Free AI - No registration needed
              </p>
              <p className="text-purple-600 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Instant Analysis
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
