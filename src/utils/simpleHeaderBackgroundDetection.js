/**
 * Simple background detection that samples pixels directly from the header element
 * and determines if they are generally light or dark
 */

export function detectHeaderBackground() {
  // Sample the top 100 pixels of the page regardless of element visibility
  const sampleHeight = 100;
  const pageWidth = window.innerWidth;
  
  // Sample multiple points across the top of the page
  const samplePoints = [
    { x: pageWidth * 0.2, y: sampleHeight * 0.5 },
    { x: pageWidth * 0.5, y: sampleHeight * 0.5 },
    { x: pageWidth * 0.8, y: sampleHeight * 0.5 },
  ];
  
  let totalLuminance = 0;
  let validSamples = 0;
  
  samplePoints.forEach(point => {
    // Get the element at this point
    const elementBehind = document.elementFromPoint(point.x, point.y);
    
    if (elementBehind) {
      const computedStyle = window.getComputedStyle(elementBehind);
      const bgColor = computedStyle.backgroundColor;
      
      // Parse RGB values
      const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        
        // Calculate relative luminance (perceived brightness)
        // Using the formula: 0.299*R + 0.587*G + 0.114*B
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        totalLuminance += luminance;
        validSamples++;
        
        console.log(`Sample at (${point.x}, ${point.y}):`, {
          element: elementBehind.tagName,
          bgColor,
          rgb: { r, g, b },
          luminance: luminance.toFixed(2)
        });
      }
    }
  });
  
  if (validSamples === 0) {
    console.warn('No valid samples found');
    return 'light';
  }
  
  const avgLuminance = totalLuminance / validSamples;
  console.log(`Average luminance: ${avgLuminance.toFixed(2)}`);
  
  // If average luminance is above 0.5, it's light; otherwise dark
  return avgLuminance > 0.7 ? 'light' : 'dark';
}

/**
 * React hook version of the simple header background detection
 */
export function useSimpleHeaderDetection() {
  const [isLight, setIsLight] = React.useState(true);
  
  React.useEffect(() => {
    const checkBackground = () => {
      const result = detectHeaderBackground();
      setIsLight(result === 'light');
    };
    
    // Check on mount
    checkBackground();
    
    // Check on scroll
    window.addEventListener('scroll', checkBackground);
    
    // Check on resize
    window.addEventListener('resize', checkBackground);
    
    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
    };
  }, []);
  
  return isLight;
}
