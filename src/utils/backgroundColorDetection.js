/**
 * Utility functions for detecting and analyzing background colors
 */

/**
 * Samples the background color of a specified area on the page
 * @param {number} height - Height of the area to sample (default: 200px)
 * @param {number} width - Width of the area to sample (default: window width)
 * @param {number} offsetY - Y offset from top of page (default: 0)
 * @returns {string} RGB color string
 */
export const getBackgroundColor = (height = 200, width = null, offsetY = 0) => {
  try {
    const sampleWidth = width || window.innerWidth;
    const samplePoints = [];
    const step = 50; // Sample every 50px
    
    // Sample multiple points across the specified area
    for (let x = 0; x < sampleWidth; x += step) {
      for (let y = offsetY; y < offsetY + height; y += step) {
        const element = document.elementFromPoint(x, y);
        if (element) {
          const styles = window.getComputedStyle(element);
          const bgColor = styles.backgroundColor;
          
          // Collect non-transparent colors
          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
            samplePoints.push(bgColor);
          }
        }
      }
    }
    
    // Return the first valid color found, or fallback to body background
    if (samplePoints.length > 0) {
      return samplePoints[0];
    }
    
    // Fallback: check body background
    const bodyStyles = window.getComputedStyle(document.body);
    return bodyStyles.backgroundColor || 'rgb(255, 255, 255)';
    
  } catch (error) {
    console.warn('Error detecting background color:', error);
    return 'rgb(255, 255, 255)'; // Default to white
  }
};

/**
 * Determines if a color is light or dark based on luminance
 * @param {string} color - RGB or RGBA color string
 * @returns {boolean} True if light, false if dark
 */
export const isLightColor = (color) => {
  // Parse RGB values from color string
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!rgbMatch) return true; // Default to light if we can't parse
  
  const r = parseInt(rgbMatch[1]);
  const g = parseInt(rgbMatch[2]);
  const b = parseInt(rgbMatch[3]);
  
  // Calculate luminance using the relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5; // Return true if light, false if dark
};

/**
 * Gets appropriate contrast colors based on background
 * @param {string} backgroundColor - The background color to analyze
 * @param {Object} colorScheme - Object with light and dark color options
 * @returns {string} The appropriate contrast color
 */
export const getContrastColor = (backgroundColor, colorScheme = { light: 'black', dark: '#F5F5DC' }) => {
  const isLight = isLightColor(backgroundColor);
  return isLight ? colorScheme.light : colorScheme.dark;
};

/**
 * Analyzes the background and returns appropriate styling classes
 * @param {string} backgroundColor - The background color to analyze
 * @param {Object} classMap - Object mapping light/dark to CSS classes
 * @returns {string} Space-separated CSS classes
 */
export const getContrastClasses = (backgroundColor, classMap = { light: 'text-black', dark: 'text-beige' }) => {
  const isLight = isLightColor(backgroundColor);
  return isLight ? classMap.light : classMap.dark;
};
