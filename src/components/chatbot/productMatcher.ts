
import { productDatabase } from '@/types/chemical';

export const getProductInfo = (productName: string) => {
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
