
import { productDatabase } from '@/types/chemical';

// Simple image comparison utility
export const compareImageWithProducts = async (uploadedImageFile: File): Promise<{
  match: boolean;
  productKey?: string;
  confidence?: number;
}> => {
  try {
    // Create a canvas to analyze the uploaded image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');

    // Load uploaded image
    const uploadedImage = new Image();
    const imageUrl = URL.createObjectURL(uploadedImageFile);
    
    return new Promise((resolve) => {
      uploadedImage.onload = async () => {
        canvas.width = uploadedImage.width;
        canvas.height = uploadedImage.height;
        ctx.drawImage(uploadedImage, 0, 0);
        
        // Get image data for comparison
        const uploadedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Compare with product images by analyzing colors and patterns
        let bestMatch = { match: false, productKey: '', confidence: 0 };
        
        for (const [productKey, product] of Object.entries(productDatabase)) {
          try {
            // Load product image
            const productImage = new Image();
            productImage.crossOrigin = 'anonymous';
            
            await new Promise<void>((imageResolve) => {
              productImage.onload = () => {
                // Resize canvas for product image
                canvas.width = productImage.width;
                canvas.height = productImage.height;
                ctx.drawImage(productImage, 0, 0);
                
                const productImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
                // Simple color histogram comparison
                const similarity = calculateImageSimilarity(uploadedImageData, productImageData);
                
                if (similarity > bestMatch.confidence) {
                  bestMatch = {
                    match: similarity > 0.7, // 70% similarity threshold
                    productKey,
                    confidence: similarity
                  };
                }
                
                imageResolve();
              };
              
              productImage.onerror = () => imageResolve();
              productImage.src = product.image;
            });
          } catch (error) {
            console.error('Error comparing with product:', productKey, error);
          }
        }
        
        URL.revokeObjectURL(imageUrl);
        resolve(bestMatch);
      };
      
      uploadedImage.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        resolve({ match: false });
      };
      
      uploadedImage.src = imageUrl;
    });
  } catch (error) {
    console.error('Image comparison failed:', error);
    return { match: false };
  }
};

// Calculate similarity between two images using color histogram
const calculateImageSimilarity = (imageData1: ImageData, imageData2: ImageData): number => {
  // Simple color histogram comparison
  const hist1 = createColorHistogram(imageData1);
  const hist2 = createColorHistogram(imageData2);
  
  // Calculate correlation coefficient
  let correlation = 0;
  let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0;
  
  for (let i = 0; i < hist1.length; i++) {
    sum1 += hist1[i];
    sum2 += hist2[i];
    sum1Sq += hist1[i] * hist1[i];
    sum2Sq += hist2[i] * hist2[i];
    pSum += hist1[i] * hist2[i];
  }
  
  const num = pSum - (sum1 * sum2 / hist1.length);
  const den = Math.sqrt((sum1Sq - sum1 * sum1 / hist1.length) * (sum2Sq - sum2 * sum2 / hist1.length));
  
  if (den === 0) return 0;
  
  correlation = num / den;
  return Math.max(0, correlation); // Ensure positive correlation
};

// Create a simple color histogram
const createColorHistogram = (imageData: ImageData): number[] => {
  const histogram = new Array(64).fill(0); // 4x4x4 RGB histogram
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = Math.floor(data[i] / 64);
    const g = Math.floor(data[i + 1] / 64);
    const b = Math.floor(data[i + 2] / 64);
    const index = r * 16 + g * 4 + b;
    histogram[index]++;
  }
  
  return histogram;
};

// Alternative: Simple dominant color comparison
export const compareDominantColors = async (uploadedImageFile: File): Promise<{
  match: boolean;
  productKey?: string;
  confidence?: number;
}> => {
  // This is a simpler fallback method that compares dominant colors
  const dominantColor = await extractDominantColor(uploadedImageFile);
  
  // Predefined dominant colors for known products (this would be more accurate with actual analysis)
  const productColors: Record<string, string> = {
    'lays magic masala': '#FFD700', // Yellow/Gold
    'maggi masala': '#FF6B35', // Orange/Red  
    'parle g': '#4169E1', // Blue
    'haldiram aloo bhujia': '#FF8C00', // Orange
    'britannia bourbon': '#8B4513', // Brown
    'thums up': '#000000', // Black
    'mango frooti': '#FFA500', // Orange
    // Add more as needed
  };
  
  let bestMatch = { match: false, productKey: '', confidence: 0 };
  
  for (const [productKey, expectedColor] of Object.entries(productColors)) {
    const similarity = colorSimilarity(dominantColor, expectedColor);
    if (similarity > bestMatch.confidence) {
      bestMatch = {
        match: similarity > 0.8,
        productKey,
        confidence: similarity
      };
    }
  }
  
  return bestMatch;
};

// Extract dominant color from image
const extractDominantColor = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) {
        resolve('#000000');
        return;
      }
      
      const data = imageData.data;
      let r = 0, g = 0, b = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      
      const pixelCount = data.length / 4;
      r = Math.floor(r / pixelCount);
      g = Math.floor(g / pixelCount);
      b = Math.floor(b / pixelCount);
      
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      resolve(hex);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Calculate color similarity
const colorSimilarity = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const rDiff = Math.abs(rgb1.r - rgb2.r);
  const gDiff = Math.abs(rgb1.g - rgb2.g);
  const bDiff = Math.abs(rgb1.b - rgb2.b);
  
  const maxDiff = 255 * 3;
  const totalDiff = rDiff + gDiff + bDiff;
  
  return 1 - (totalDiff / maxDiff);
};

// Convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
