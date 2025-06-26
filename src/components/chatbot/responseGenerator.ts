
export const generateSmartResponse = (userQuery: string, productInfo: any) => {
  const query = userQuery.toLowerCase();
  
  if (productInfo) {
    // Concise product analysis
    let response = `**${productInfo.name.toUpperCase()} ANALYSIS**\n`;
    response += `Brand: ${productInfo.brand} | Category: ${productInfo.category}\n\n`;
    
    // Safety rating
    const riskLevel = productInfo.riskLevel;
    let safetyIcon, safetyText, riskScore;
    
    if (riskLevel === 'low') {
      safetyIcon = '🟢';
      safetyText = 'SAFE FOR CONSUMPTION';
      riskScore = '8.5/10';
    } else if (riskLevel === 'medium') {
      safetyIcon = '🟡';
      safetyText = 'MODERATE CAUTION';
      riskScore = '6.5/10';
    } else {
      safetyIcon = '🔴';
      safetyText = 'HIGH CAUTION ADVISED';
      riskScore = '4.0/10';
    }
    
    response += `${safetyIcon} **Safety Rating:** ${safetyText} (${riskScore})\n\n`;

    // Key ingredients of concern
    if (productInfo.chemicals && productInfo.chemicals.length > 0) {
      response += `**Key Ingredients:**\n`;
      productInfo.chemicals.slice(0, 3).forEach((chemical: string) => {
        response += `• ${chemical}\n`;
      });
      if (productInfo.chemicals.length > 3) {
        response += `• +${productInfo.chemicals.length - 3} more additives\n`;
      }
      response += `\n`;
    }

    // Nutritional summary
    if (productInfo.healthInfo) {
      const nutrition = productInfo.healthInfo.nutritionalValue;
      response += `**Nutrition (per 100g):**\n`;
      response += `Calories: ${nutrition.calories} | Protein: ${nutrition.protein}g | Fat: ${nutrition.fat}g\n\n`;
    }

    // Health recommendation
    response += `**Recommendation:** `;
    if (riskLevel === 'low') {
      response += `Suitable for regular consumption as part of balanced diet.`;
    } else if (riskLevel === 'medium') {
      response += `Consume occasionally. Balance with fresh foods.`;
    } else {
      response += `Limit consumption. Consider healthier alternatives.`;
    }

    // Allergen warning if present
    if (productInfo.healthInfo?.allergens && productInfo.healthInfo.allergens.length > 0) {
      response += `\n\n⚠️ **Contains:** ${productInfo.healthInfo.allergens.join(', ')}`;
    }

    return response;
  } else {
    // Concise response when product not found
    let response = `Product "${userQuery}" not found in our database.\n\n`;
    
    response += `**Available Products:**\n`;
    response += `🥔 Chips: Lays, Kurkure, Balaji\n`;
    response += `🍪 Biscuits: Parle-G, Bourbon, Monaco\n`;
    response += `🍜 Noodles: Maggi, Ching's\n`;
    response += `🥤 Beverages: Thums Up, Frooti\n`;
    response += `🍫 Chocolate: Dairy Milk\n\n`;
    
    response += `Please specify a product name for detailed analysis.`;
    
    return response;
  }
};
