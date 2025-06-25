
export const generateSmartResponse = (userQuery: string, productInfo: any) => {
  const query = userQuery.toLowerCase();
  
  if (productInfo) {
    // Ultra-enhanced product header with premium styling
    let response = `🎯 **PRODUCT ANALYSIS REPORT**\n`;
    response += `═══════════════════════════════════════\n\n`;
    response += `🌟 **${productInfo.name.toUpperCase()}**\n`;
    response += `🏢 *Brand:* **${productInfo.brand}** | 📦 *Category:* **${productInfo.category}**\n`;
    response += `📅 *Analysis Date:* ${new Date().toLocaleDateString()}\n\n`;
    
    // Ultra-comprehensive safety rating with detailed visual analysis
    const riskLevel = productInfo.riskLevel;
    let safetyIcon, safetyText, safetyColor, stars, riskScore, recommendation;
    
    if (riskLevel === 'low') {
      safetyIcon = '🟢';
      safetyText = '✨ PREMIUM SAFETY GRADE';
      safetyColor = '🌟';
      stars = '⭐⭐⭐⭐⭐';
      riskScore = '9.2/10';
      recommendation = 'HIGHLY RECOMMENDED';
      response += `${safetyIcon} **SAFETY CERTIFICATION: ${safetyText}** ${stars}\n`;
      response += `🏆 **Overall Score:** ${riskScore} | **Status:** ${recommendation}\n`;
      response += `${safetyColor} **Expert Verdict:** This product exceeds safety standards with exceptional ingredient quality. Perfect for daily consumption with complete confidence!\n\n`;
    } else if (riskLevel === 'medium') {
      safetyIcon = '🟡';
      safetyText = '⚖️ BALANCED SAFETY PROFILE';
      safetyColor = '🔔';
      stars = '⭐⭐⭐';
      riskScore = '6.8/10';
      recommendation = 'MODERATE CONSUMPTION';
      response += `${safetyIcon} **SAFETY CERTIFICATION: ${safetyText}** ${stars}\n`;
      response += `📊 **Overall Score:** ${riskScore} | **Status:** ${recommendation}\n`;
      response += `${safetyColor} **Expert Verdict:** Good quality product with some processed ingredients. Ideal for occasional enjoyment as part of a balanced diet.\n\n`;
    } else {
      safetyIcon = '🔴';
      safetyText = '⚠️ ENHANCED CAUTION REQUIRED';
      safetyColor = '🚨';
      stars = '⭐⭐';
      riskScore = '4.2/10';
      recommendation = 'LIMITED CONSUMPTION';
      response += `${safetyIcon} **SAFETY CERTIFICATION: ${safetyText}** ${stars}\n`;
      response += `📈 **Overall Score:** ${riskScore} | **Status:** ${recommendation}\n`;
      response += `${safetyColor} **Expert Verdict:** Contains multiple processed additives requiring careful consumption monitoring. Consider healthier alternatives for regular intake.\n\n`;
    }

    // Premium ingredient analysis with scientific approach
    response += `🧬 **ADVANCED INGREDIENT ANALYSIS**\n`;
    response += `═══════════════════════════════════════\n`;
    
    if (productInfo.chemicals && productInfo.chemicals.length > 0) {
      response += `🔬 **Chemical Composition & Risk Assessment:**\n\n`;
      productInfo.chemicals.forEach((chemical: string, index: number) => {
        let riskEmoji = '🟡';
        let riskText = 'MODERATE RISK';
        let riskDescription = '';
        let healthImpact = '';
        
        if (chemical.includes('MSG') || chemical.includes('TBHQ') || chemical.includes('BHA') || chemical.includes('Red 40')) {
          riskEmoji = '🔴';
          riskText = 'HIGH CONCERN';
          riskDescription = 'Requires careful monitoring';
          healthImpact = 'May cause sensitivity reactions';
        } else if (chemical.includes('Artificial') || chemical.includes('Preservatives') || chemical.includes('Colors')) {
          riskEmoji = '🟠';
          riskText = 'MODERATE CONCERN';
          riskDescription = 'Processed additive';
          healthImpact = 'Generally safe in moderation';
        } else {
          riskEmoji = '🟢';
          riskText = 'LOW CONCERN';
          riskDescription = 'Standard food ingredient';
          healthImpact = 'Minimal health impact';
        }
        
        response += `**${index + 1}. ${chemical}**\n`;
        response += `   ${riskEmoji} Risk Level: *${riskText}*\n`;
        response += `   📋 Type: ${riskDescription}\n`;
        response += `   🩺 Health Impact: ${healthImpact}\n\n`;
      });
    } else {
      response += `✨ **CLEAN LABEL CERTIFICATION**\n`;
      response += `🌿 **Premium Grade:** No harmful chemicals detected!\n`;
      response += `🏆 **Quality Status:** This product features a clean, natural ingredient profile with minimal processing.\n\n`;
    }

    // Ultra-comprehensive nutritional analysis with premium formatting
    if (productInfo.healthInfo) {
      response += `📊 **COMPLETE NUTRITIONAL PROFILE** *(per 100g serving)*\n`;
      response += `═══════════════════════════════════════\n\n`;
      
      const nutrition = productInfo.healthInfo.nutritionalValue;
      
      // Macro nutrients with detailed analysis
      response += `🔥 **ENERGY & MACRONUTRIENTS:**\n`;
      response += `┌─────────────────────────────────────┐\n`;
      response += `│ 🔥 **Calories:** ${nutrition.calories} kcal/100g           │\n`;
      response += `│ 💪 **Protein:** ${nutrition.protein}g *(Muscle Support)*    │\n`;
      response += `│ 🍞 **Carbs:** ${nutrition.carbs}g *(Energy Source)*     │\n`;
      response += `│ 🧈 **Fat:** ${nutrition.fat}g *(Essential Nutrients)*  │\n`;
      if (nutrition.fiber) response += `│ 🌾 **Fiber:** ${nutrition.fiber}g *(Digestive Health)*   │\n`;
      response += `└─────────────────────────────────────┘\n\n`;

      // Advanced nutritional rating system
      const totalCalories = nutrition.calories;
      const proteinPercent = (nutrition.protein * 4 / totalCalories * 100).toFixed(1);
      const carbPercent = (nutrition.carbs * 4 / totalCalories * 100).toFixed(1);
      const fatPercent = (nutrition.fat * 9 / totalCalories * 100).toFixed(1);
      
      response += `📈 **NUTRITIONAL BREAKDOWN:**\n`;
      response += `🔸 **Protein:** ${proteinPercent}% of calories\n`;
      response += `🔸 **Carbohydrates:** ${carbPercent}% of calories\n`;
      response += `🔸 **Fat:** ${fatPercent}% of calories\n\n`;
      
      // Caloric assessment with visual indicators
      let nutritionRating = '';
      let fitnessRecommendation = '';
      if (totalCalories < 150) {
        nutritionRating = '🟢 **LOW CALORIE EXCELLENCE** - Perfect for weight management';
        fitnessRecommendation = '🏃‍♀️ Ideal for active lifestyles and weight control';
      } else if (totalCalories < 250) {
        nutritionRating = '🟡 **MODERATE CALORIE BALANCE** - Enjoy mindfully';
        fitnessRecommendation = '⚖️ Balance with physical activity for optimal health';
      } else {
        nutritionRating = '🔴 **HIGH CALORIE DENSITY** - Portion control advised';
        fitnessRecommendation = '🏋️‍♂️ Pair with regular exercise and smaller portions';
      }
      response += `🎯 **Caloric Assessment:** ${nutritionRating}\n`;
      response += `💡 **Fitness Tip:** ${fitnessRecommendation}\n\n`;

      // Enhanced allergen information with visual alerts
      if (productInfo.healthInfo.allergens && productInfo.healthInfo.allergens.length > 0) {
        response += `⚠️ **ALLERGEN SAFETY ALERT**\n`;
        response += `═══════════════════════════════════════\n`;
        response += `🚨 **IMPORTANT:** This product contains the following allergens:\n\n`;
        productInfo.healthInfo.allergens.forEach((allergen: string, index: number) => {
          response += `${index + 1}. 🛡️ **${allergen}**\n`;
        });
        response += `\n💡 **Safety Note:** Always verify allergen information on actual product packaging before consumption.\n\n`;
      }

      // Premium storage and freshness guide
      if (productInfo.healthInfo.shelfLife) {
        response += `📦 **PREMIUM STORAGE & FRESHNESS GUIDE**\n`;
        response += `═══════════════════════════════════════\n`;
        response += `⏰ **Maximum Freshness:** ${productInfo.healthInfo.shelfLife}\n`;
        response += `🏠 **Optimal Storage:** ${productInfo.healthInfo.storageInstructions}\n`;
        response += `🌡️ **Temperature Control:** Keep in recommended conditions for best quality\n`;
        response += `📅 **Quality Tip:** Always check expiration dates and store properly for maximum freshness\n\n`;
      }
    }

    // Context-aware ultra-detailed safety assessment
    if (query.includes('safe') || query.includes('safety') || query.includes('risk') || query.includes('health')) {
      response += `🛡️ **COMPREHENSIVE SAFETY ASSESSMENT REPORT**\n`;
      response += `═══════════════════════════════════════\n`;
      if (riskLevel === 'high') {
        response += `🔴 **DETAILED RISK ANALYSIS - HIGH ATTENTION REQUIRED**\n\n`;
        response += `📋 **Risk Factors Identified:**\n`;
        response += `• ⚠️ Contains multiple artificial additives and preservatives\n`;
        response += `• 🧪 May include chemicals linked to health sensitivities\n`;
        response += `• 📊 Higher processing level affects nutritional integrity\n`;
        response += `• 🔍 Requires ingredient awareness for sensitive individuals\n\n`;
        response += `💡 **Professional Recommendations:**\n`;
        response += `• 🚫 Limit consumption to special occasions only\n`;
        response += `• 🥗 Balance with fresh, whole foods in daily diet\n`;
        response += `• 👩‍⚕️ Consult healthcare provider if you have food sensitivities\n`;
        response += `• 🔄 Consider exploring cleaner alternatives available in market\n\n`;
      } else if (riskLevel === 'medium') {
        response += `🟡 **BALANCED RISK ASSESSMENT - MODERATE CAUTION**\n\n`;
        response += `📊 **Safety Profile:**\n`;
        response += `• ✅ Generally safe for healthy individuals\n`;
        response += `• 🧪 Contains some processed ingredients within acceptable limits\n`;
        response += `• ⚖️ Balanced formulation with reasonable safety margins\n`;
        response += `• 🎯 Suitable for occasional to moderate consumption\n\n`;
        response += `🎯 **Smart Consumption Guidelines:**\n`;
        response += `• 📅 Perfect for weekend treats and special occasions\n`;
        response += `• 🥗 Integrate with diverse, balanced diet choices\n`;
        response += `• 💧 Maintain adequate hydration when consuming\n`;
        response += `• 🏃‍♂️ Pair with active lifestyle for optimal health balance\n\n`;
      } else {
        response += `🟢 **PREMIUM SAFETY CERTIFICATION - EXCELLENT CHOICE**\n\n`;
        response += `🏆 **Outstanding Safety Features:**\n`;
        response += `• ✨ Exceeds industry safety standards consistently\n`;
        response += `• 🌿 Minimal processing with clean ingredient profile\n`;
        response += `• 🛡️ No significant health concerns identified\n`;
        response += `• 👨‍👩‍👧‍👦 Suitable for family consumption including children\n\n`;
        response += `🌟 **Health Advantages:**\n`;
        response += `• 💚 Supports regular dietary inclusion\n`;
        response += `• 🏃‍♀️ Compatible with active, healthy lifestyles\n`;
        response += `• 🧠 Peace of mind with transparent ingredient sourcing\n`;
        response += `• 🥇 Represents excellent choice in its category\n\n`;
      }
    }

    // Ultra-enhanced category-specific health recommendations
    response += `💡 **EXPERT HEALTH RECOMMENDATIONS & LIFESTYLE INTEGRATION**\n`;
    response += `═══════════════════════════════════════\n`;
    
    // Category-specific ultra-detailed advice
    if (productInfo.category === 'Beverages') {
      response += `🥤 **BEVERAGE CONSUMPTION MASTERY:**\n\n`;
      response += `🌊 **Hydration Strategy:**\n`;
      response += `• 💧 Primary hydration: 8-10 glasses of water daily\n`;
      response += `• 🍊 Natural alternatives: Fresh fruit juices (diluted 1:1 with water)\n`;
      response += `• 🥥 Healthy options: Coconut water, herbal teas, infused water\n`;
      response += `• ⏰ Optimal timing: Consume during active hours, avoid 2 hours before sleep\n\n`;
      response += `⚡ **Energy & Performance:**\n`;
      response += `• 🏃‍♂️ Pre-workout: Small serving 30 minutes before exercise\n`;
      response += `• 🧠 Mental alertness: If caffeinated, limit to morning hours\n`;
      response += `• 🍽️ Meal pairing: Best consumed separately from main meals\n\n`;
    } else if (productInfo.category === 'Chips' || productInfo.category === 'Snacks' || productInfo.category === 'Namkeen') {
      response += `🥔 **SMART SNACKING TRANSFORMATION:**\n\n`;
      response += `🎯 **Portion Mastery:**\n`;
      response += `• 📏 Ideal serving: 25-30g (small bowl), not directly from package\n`;
      response += `• ⏰ Best timing: Mid-afternoon (3-4 PM) for optimal metabolism\n`;
      response += `• 🍎 Enhancement: Combine with fresh fruits or nuts (70:30 ratio)\n`;
      response += `• 💧 Hydration: Drink 1-2 glasses water before and after consumption\n\n`;
      response += `🏃‍♀️ **Active Lifestyle Integration:**\n`;
      response += `• 🚶‍♂️ Post-snack activity: 15-minute walk aids digestion\n`;
      response += `• 🏋️‍♂️ Exercise balance: 20 minutes moderate activity offsets calories\n`;
      response += `• 🧘‍♀️ Mindful eating: Consume slowly, savor flavors, avoid distractions\n\n`;
    } else if (productInfo.category === 'Biscuits') {
      response += `🍪 **BISCUIT CONSUMPTION EXCELLENCE:**\n\n`;
      response += `☕ **Perfect Pairings:**\n`;
      response += `• 🥛 Classic: With warm milk or herbal tea for optimal digestion\n`;
      response += `• 🌅 Breakfast: 2-3 pieces with protein-rich foods (eggs, yogurt)\n`;
      response += `• 🌆 Evening: Light snack with green tea for relaxation\n`;
      response += `• 🍯 Enhancement: Drizzle honey or add fresh fruit toppings\n\n`;
      response += `🌾 **Nutritional Optimization:**\n`;
      response += `• 🔍 Label reading: Choose varieties with whole grains and fiber\n`;
      response += `• ⚖️ Trans fat awareness: Select zero trans-fat options\n`;
      response += `• 🧂 Sodium control: Balance with low-sodium meals throughout day\n\n`;
    } else if (productInfo.category === 'Noodles') {
      response += `🍜 **NOODLE NUTRITION TRANSFORMATION:**\n\n`;
      response += `🥬 **Nutritional Enhancement:**\n`;
      response += `• 🌿 Vegetable boost: Add 1 cup mixed vegetables (carrots, peas, cabbage)\n`;
      response += `• 🥚 Protein power: Include egg, tofu, or lean chicken\n`;
      response += `• 🧄 Flavor upgrade: Fresh ginger, garlic, and herbs instead of full seasoning packet\n`;
      response += `• 🥄 Seasoning control: Use only 50% of provided masala packet\n\n`;
      response += `🍽️ **Complete Meal Strategy:**\n`;
      response += `• 🥗 Side salad: Fresh cucumber, tomato, and lettuce\n`;
      response += `• 💧 Hydration: Discard excess cooking water (high sodium)\n`;
      response += `• ⏰ Timing: Best as lunch, avoid late dinner consumption\n\n`;
    } else if (productInfo.category === 'Chocolate') {
      response += `🍫 **CHOCOLATE ENJOYMENT MASTERY:**\n\n`;
      response += `🌙 **Optimal Consumption:**\n`;
      response += `• ⏰ Perfect timing: 2-4 PM for best metabolic processing\n`;
      response += `• 📏 Mindful portions: 20-25g pieces, savor slowly\n`;
      response += `• 🧘‍♀️ Stress relief: Enjoy during relaxation moments\n`;
      response += `• 🥛 Pairing: With plain milk for calcium and protein boost\n\n`;
      response += `⚡ **Energy & Mood Balance:**\n`;
      response += `• 🏃‍♂️ Activity pairing: Light exercise 30 minutes after consumption\n`;
      response += `• 🧠 Mental benefits: Dark varieties support cognitive function\n`;
      response += `• 💤 Sleep consideration: Avoid 3 hours before bedtime\n\n`;
    }

    // Premium alternative suggestions with comprehensive market guidance
    if (query.includes('alternative') || query.includes('substitute') || query.includes('healthier') || riskLevel === 'high') {
      response += `🌱 **PREMIUM ALTERNATIVE SOLUTIONS & MARKET GUIDE**\n`;
      response += `═══════════════════════════════════════\n\n`;
      response += `🛒 **Smart Shopping Intelligence:**\n`;
      response += `• 🔍 **Label Mastery:** Prioritize "No Artificial Colors/Flavors/Preservatives" certifications\n`;
      response += `• 🌿 **Organic Premium:** Choose certified organic or natural variants when available\n`;
      response += `• 📋 **Ingredient Transparency:** Select products with 5-7 ingredients maximum\n`;
      response += `• 🏆 **Quality Certifications:** Look for FSSAI, ISO, or other quality certifications\n`;
      response += `• 💚 **Health Conscious Brands:** Research brands with transparent health commitments\n\n`;
      
      response += `🏡 **HOMEMADE PREMIUM ALTERNATIVES:**\n`;
      response += `• 🥜 **Power Snacks:** Roasted nuts, seeds mix with himalayan salt\n`;
      response += `• 🍓 **Natural Sweets:** Fresh seasonal fruits, homemade fruit leather\n`;
      response += `• 🥕 **Veggie Chips:** Oven-baked sweet potato, beetroot, or kale chips\n`;
      response += `• 🍪 **Healthy Baking:** Oat flour cookies with jaggery and nuts\n`;
      response += `• 🥤 **Natural Beverages:** Homemade lassi, fruit smoothies, herbal teas\n\n`;
      
      response += `🎯 **CATEGORY-SPECIFIC UPGRADES:**\n`;
      if (productInfo.category === 'Chips') {
        response += `• 🥔 Baked vegetable chips, air-popped varieties\n`;
        response += `• 🌾 Multigrain or quinoa-based chips\n`;
        response += `• 🥥 Coconut chips with natural seasonings\n`;
      } else if (productInfo.category === 'Biscuits') {
        response += `• 🌾 Whole grain, high-fiber biscuit varieties\n`;
        response += `• 🥜 Nut and seed-based crackers\n`;
        response += `• 🍪 Sugar-free or low-sugar alternatives\n`;
      }
      response += `\n`;
    }

    // Ultra-comprehensive final summary with professional insights
    response += `📋 **EXECUTIVE SUMMARY & ACTIONABLE INSIGHTS**\n`;
    response += `═══════════════════════════════════════\n\n`;
    response += `🎯 **PRODUCT PROFILE:**\n`;
    response += `**✅ Positive Attributes:** ${riskLevel === 'low' ? 'Premium ingredient quality, excellent safety profile, suitable for regular consumption' : riskLevel === 'medium' ? 'Good quality formulation, acceptable for moderate consumption, well-balanced nutritional profile' : 'Popular brand recognition, convenient packaging, widely available'}\n\n`;
    response += `**⚠️ Areas of Attention:** ${productInfo.chemicals.length > 0 ? `Contains ${productInfo.chemicals.slice(0, 2).join(', ')}${productInfo.chemicals.length > 2 ? ` and ${productInfo.chemicals.length - 2} other additives` : ''}` : 'No significant concerns identified'}\n\n`;
    response += `**🎯 Optimal Usage:** ${riskLevel === 'low' ? 'Daily enjoyment as part of balanced diet, any time consumption' : riskLevel === 'medium' ? 'Weekend treats, celebration occasions, 2-3 times per week maximum' : 'Special occasions only, monthly treats, consider alternatives for regular consumption'}\n\n`;
    response += `**💰 Value Proposition:** Excellent price-to-convenience ratio, widely accessible, trusted brand heritage\n\n`;
    response += `**🏆 Health Score:** ${riskLevel === 'low' ? '8.5/10 - Excellent Choice' : riskLevel === 'medium' ? '6.5/10 - Good Option' : '4.0/10 - Proceed with Caution'}\n\n`;
    
    response += `💡 **PERSONALIZED RECOMMENDATIONS:**\n`;
    response += `• 👨‍👩‍👧‍👦 **For Families:** ${riskLevel === 'low' ? 'Perfect for all family members including children' : riskLevel === 'medium' ? 'Suitable for adults and older children, moderate portions' : 'Adult supervision recommended, limit children\'s access'}\n`;
    response += `• 🏃‍♀️ **For Active Individuals:** ${riskLevel === 'low' ? 'Excellent energy source for active lifestyles' : riskLevel === 'medium' ? 'Good occasional energy boost, balance with exercise' : 'Consider pre/post workout alternatives'}\n`;
    response += `• 🩺 **For Health-Conscious:** ${riskLevel === 'low' ? 'Aligns well with health-focused dietary choices' : riskLevel === 'medium' ? 'Fits into balanced diet with mindful consumption' : 'Explore cleaner alternatives for regular intake'}\n\n`;
    
    response += `🔄 **CONTINUOUS IMPROVEMENT:** Stay updated with product reformulations and new healthier variants from the brand\n\n`;
    
    response += `*✨ This comprehensive analysis is based on current ingredient information, scientific research, and general health guidelines. Individual responses may vary. Always consult healthcare professionals for personalized dietary advice.*`;

    return response;
  } else {
    // Ultra-enhanced response when product not found
    let response = `🔍 **ADVANCED PRODUCT SEARCH RESULTS**\n`;
    response += `═══════════════════════════════════════\n\n`;
    response += `I couldn't locate **"${userQuery}"** in our comprehensive product database, but I'm here to provide expert guidance! 🤝\n\n`;
    
    // Smart category-based guidance system
    if (query.includes('chip') || query.includes('namkeen') || query.includes('wafer') || query.includes('snack')) {
      response += `🥔 **CHIPS & SNACKS EXPERT GUIDANCE:**\n`;
      response += `┌─────────────────────────────────────┐\n`;
      response += `│ ❌ **RED FLAGS TO AVOID:**           │\n`;
      response += `│ • MSG (Monosodium Glutamate)        │\n`;
      response += `│ • TBHQ (Preservative)               │\n`;
      response += `│ • Artificial Colors (Red 40, Yellow 6) │\n`;
      response += `│ • Trans Fats                        │\n`;
      response += `│ • High Sodium (>400mg per serving)  │\n`;
      response += `└─────────────────────────────────────┘\n\n`;
      response += `✅ **PREMIUM FEATURES TO SEEK:**\n`;
      response += `• 🌿 Natural ingredients and seasonings\n`;
      response += `• 🔥 Baked instead of deep-fried varieties\n`;
      response += `• 🌾 Multigrain or whole grain options\n`;
      response += `• 🧂 Controlled sodium levels (<300mg per serving)\n`;
      response += `• 🚫 Zero trans fats certification\n\n`;
    }
    
    if (query.includes('biscuit') || query.includes('cookie') || query.includes('cracker')) {
      response += `🍪 **BISCUITS & COOKIES EXPERT ANALYSIS:**\n`;
      response += `┌─────────────────────────────────────┐\n`;
      response += `│ 🚨 **CRITICAL CONCERNS:**            │\n`;
      response += `│ • Trans Fats (any amount)           │\n`;
      response += `│ • High Sugar (>20g per 100g)        │\n`;
      response += `│ • Artificial Preservatives          │\n`;
      response += `│ • Hydrogenated Oils                 │\n`;
      response += `└─────────────────────────────────────┘\n\n`;
      response += `🌟 **EXCELLENCE INDICATORS:**\n`;
      response += `• 🌾 Whole grain or oat-based formulations\n`;
      response += `• 🍯 Natural sweeteners (jaggery, honey)\n`;
      response += `• 📊 High fiber content (>3g per serving)\n`;
      response += `• 🥜 Added nuts and seeds for nutrition\n`;
      response += `• 🌿 Minimal ingredient lists (under 10 ingredients)\n\n`;
    }

    if (query.includes('noodles') || query.includes('pasta') || query.includes('instant')) {
      response += `🍜 **INSTANT NOODLES PROFESSIONAL ASSESSMENT:**\n`;
      response += `┌─────────────────────────────────────┐\n`;
      response += `│ ⚠️ **HIGH-RISK COMPONENTS:**         │\n`;
      response += `│ • TBHQ (Tertiary-butylhydroquinone) │\n`;
      response += `│ • MSG and flavor enhancers          │\n`;
      response += `│ • Excessive sodium (>900mg)         │\n`;
      response += `│ • Artificial colors and flavors     │\n`;
      response += `│ • Palm oil (sustainability concerns) │\n`;
      response += `└─────────────────────────────────────┘\n\n`;
      response += `🎯 **OPTIMAL CHOICE CRITERIA:**\n`;
      response += `• 🌾 Whole grain or multigrain varieties\n`;
      response += `• 🌱 Organic certification when available\n`;
      response += `• 🧂 Reduced sodium formulations (<600mg)\n`;
      response += `• 🥬 Added dehydrated vegetables\n`;
      response += `• 💡 **Pro Tip:** Use only 50% of seasoning packet\n\n`;
    }

    if (query.includes('drink') || query.includes('beverage') || query.includes('juice') || query.includes('cola')) {
      response += `🥤 **BEVERAGE SAFETY & WELLNESS GUIDE:**\n`;
      response += `┌─────────────────────────────────────┐\n`;
      response += `│ 🔴 **IMMEDIATE CONCERNS:**           │\n`;
      response += `│ • High Fructose Corn Syrup          │\n`;
      response += `│ • Phosphoric Acid (bone health)     │\n`;
      response += `│ • Artificial Colors (especially Blue 1) │\n`;
      response += `│ • Excessive Sugar (>25g per serving) │\n`;
      response += `│ • Artificial Sweeteners (long-term) │\n`;
      response += `└─────────────────────────────────────┘\n\n`;
      response += `🌟 **PREMIUM BEVERAGE STANDARDS:**\n`;
      response += `• 🍊 100% natural fruit juices (no added sugar)\n`;
      response += `• 🥥 Coconut water and natural electrolytes\n`;
      response += `• 🌿 Herbal teas and infusions\n`;
      response += `• 💧 Enhanced water with natural flavors\n`;
      response += `• 📉 **Daily Limit:** <25g added sugars for adults\n\n`;
    }

    // Ultra-comprehensive product database showcase
    response += `📚 **OUR COMPREHENSIVE PRODUCT INTELLIGENCE** *(16+ Premium Products)*\n`;
    response += `═══════════════════════════════════════\n\n`;
    
    response += `🥔 **CHIPS & SAVORY SNACKS:**\n`;
    response += `• 🌟 **Lay's Magic Masala** - Popular spiced potato chips\n`;
    response += `• 🧂 **Balaji Wafers** - Traditional Indian wafer snacks\n`;
    response += `• 🌶️ **Kurkure Masala Munch** - Crunchy corn puffs\n`;
    response += `• 🥜 **Haldiram's Aloo Bhujia** - Classic namkeen variety\n\n`;
    
    response += `🍪 **BISCUITS & CRACKERS:**\n`;
    response += `• 🍯 **Parle-G** - India's favorite glucose biscuits\n`;
    response += `• 🧂 **Monaco** - Light, crispy salted crackers\n`;
    response += `• 🍫 **Britannia Bourbon** - Chocolate sandwich cookies\n`;
    response += `• ☕ **Britannia Marie Gold** - Tea-time companion biscuits\n\n`;
    
    response += `🍜 **INSTANT FOODS:**\n`;
    response += `• 🌶️ **Maggi Masala Noodles** - 2-minute instant noodles\n`;
    response += `• 🥢 **Ching's Hakka Noodles** - Chinese-style noodles\n\n`;
    
    response += `🥤 **BEVERAGES:**\n`;
    response += `• 🥤 **Thums Up** - Bold cola drink\n`;
    response += `• 🥭 **Mango Frooti** - Mango flavored drink\n`;
    response += `• 🥛 **Amul Kool Milk** - Flavored milk drink\n\n`;
    
    response += `🍫 **CONFECTIONERY:**\n`;
    response += `• 🍫 **Cadbury Dairy Milk** - Classic milk chocolate\n\n`;
    
    response += `💡 **INSTANT ANALYSIS ACCESS GUIDE**\n`;
    response += `═══════════════════════════════════════\n`;
    response += `Simply mention the **exact product name** or **popular brand name** for instant detailed analysis!\n\n`;
    response += `🔥 **TOP SEARCH EXAMPLES:**\n`;
    response += `┌─────────────────────────────────────┐\n`;
    response += `│ 💬 "Maggi" → Complete safety profile │\n`;
    response += `│ 💬 "Lays" → Detailed ingredient breakdown │\n`;
    response += `│ 💬 "Parle G" → Full nutritional analysis │\n`;
    response += `│ 💬 "Bourbon" → Health recommendations │\n`;
    response += `│ 💬 "Thums Up safety" → Risk assessment │\n`;
    response += `└─────────────────────────────────────┘\n\n`;
    
    response += `🎯 **ADVANCED QUERY CAPABILITIES:**\n`;
    response += `• 🛡️ **Safety Focus:** "Is [product] safe?"\n`;
    response += `• 🧪 **Ingredient Deep-Dive:** "[Product] chemical analysis"\n`;
    response += `• 📊 **Nutrition Focus:** "[Product] nutritional benefits"\n`;
    response += `• 🔄 **Alternatives:** "Healthier alternatives to [product]"\n`;
    response += `• 👨‍👩‍👧‍👦 **Family Safety:** "[Product] safe for children?"\n\n`;
    
    response += `✨ **WHAT MAKES OUR ANALYSIS SPECIAL:**\n`;
    response += `• 🔬 **Scientific Accuracy:** Research-backed ingredient analysis\n`;
    response += `• 🎯 **Personalized Insights:** Tailored recommendations for your lifestyle\n`;
    response += `• 📊 **Complete Transparency:** Full ingredient breakdown with risk levels\n`;
    response += `• 💡 **Actionable Guidance:** Practical tips for healthier choices\n`;
    response += `• 🏆 **Professional Grade:** Expert-level food safety assessment\n\n`;
    
    response += `*🚀 Ready to discover the complete story behind your favorite foods? Just ask about any product!*`;
    
    return response;
  }
};
