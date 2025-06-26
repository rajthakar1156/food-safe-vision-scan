
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

    // Key ingredients of concern (limit to 2 for brevity)
    if (productInfo.chemicals && productInfo.chemicals.length > 0) {
      response += `**Key Ingredients:** ${productInfo.chemicals.slice(0, 2).join(', ')}\n\n`;
    }

    // Health recommendation
    response += `**Recommendation:** `;
    if (riskLevel === 'low') {
      response += `Suitable for regular consumption.\n\n`;
    } else if (riskLevel === 'medium') {
      response += `Consume occasionally. Balance with fresh foods.\n\n`;
    } else {
      response += `Limit consumption. Consider healthier alternatives.\n\n`;
    }

    // Add healthy alternatives based on product category
    response += `**🌟 Healthier Alternatives:**\n`;
    
    const category = productInfo.category.toLowerCase();
    if (category.includes('chips') || category.includes('snacks')) {
      response += `• Roasted chickpeas or nuts\n`;
      response += `• Baked sweet potato chips\n`;
      response += `• Air-popped popcorn\n`;
    } else if (category.includes('biscuits')) {
      response += `• Oats biscuits (sugar-free)\n`;
      response += `• Multigrain crackers\n`;
      response += `• Homemade whole wheat cookies\n`;
    } else if (category.includes('noodles') || category.includes('ready to cook')) {
      response += `• Whole grain pasta\n`;
      response += `• Quinoa noodles\n`;
      response += `• Fresh vegetable soup\n`;
    } else if (category.includes('beverages')) {
      response += `• Fresh fruit juices (no added sugar)\n`;
      response += `• Coconut water\n`;
      response += `• Herbal teas\n`;
    } else if (category.includes('chocolate')) {
      response += `• Dark chocolate (70%+ cocoa)\n`;
      response += `• Dates with nuts\n`;
      response += `• Homemade energy balls\n`;
    } else {
      response += `• Fresh fruits and vegetables\n`;
      response += `• Nuts and seeds\n`;
      response += `• Homemade alternatives\n`;
    }

    // Allergen warning if present
    if (productInfo.healthInfo?.allergens && productInfo.healthInfo.allergens.length > 0) {
      response += `\n⚠️ **Contains:** ${productInfo.healthInfo.allergens.join(', ')}`;
    }

    return response;
  } else {
    // Concise response when product not found
    let response = `Product "${userQuery}" not found in our database.\n\n`;
    
    response += `**Available Products:**\n`;
    response += `🥔 Chips: Lays, Kurkure, Balaji\n`;
    response += `🍪 Biscuits: Parle-G, Bourbon, Monaco\n`;
    response += `🍜 Noodles: Maggi, Ching's\n`;
    response += `🥤 Beverages: Thums Up, Frooti\n\n`;
    
    response += `Please specify a product name for detailed analysis.`;
    
    return response;
  }
};
