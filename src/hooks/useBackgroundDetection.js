import { useState, useEffect, useCallback } from 'react';

// Background detection timing
const BACKGROUND_DETECTION_DELAY = 1000; // milliseconds
import { getBackgroundColor, getContrastColor, getContrastClasses } from '../utils/backgroundColorDetection';

/**
 * Custom hook for detecting background color and providing contrast adjustments
 * @param {Object} options - Configuration options
 * @param {number} options.sampleHeight - Height of area to sample (default: 200)
 * @param {number} options.sampleWidth - Width of area to sample (default: window width)
 * @param {number} options.offsetY - Y offset from top (default: 0)
 * @param {Object} options.colorScheme - Colors for light/dark backgrounds
 * @param {Object} options.classMap - CSS classes for light/dark backgrounds
 * @param {boolean} options.trackScroll - Whether to update on scroll (default: true)
 * @param {boolean} options.trackResize - Whether to update on resize (default: false)
 * @param {boolean} options.enabled - Whether the hook is enabled (default: true)
 * @returns {Object} Background detection state and utilities
 */
export const useBackgroundDetection = (options = {}) => {
  const {
    sampleHeight = 200,
    sampleWidth = null,
    offsetY = 0,
    colorScheme = { light: 'black', dark: '#F5F5DC' },
    classMap = { light: 'text-black fill-black', dark: 'text-beige fill-beige' },
    trackScroll = true,
    trackResize = false,
    enabled = true
  } = options;

  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');
  const [isLight, setIsLight] = useState(false);
  const [contrastColor, setContrastColor] = useState(colorScheme.dark);
  const [contrastClasses, setContrastClasses] = useState(classMap.dark);

  // Function to update all color-related state
  const updateColorState = () => {
    // console.log('Updating background color state...');
    const bgColor = getBackgroundColor(sampleHeight, sampleWidth, offsetY);
    const contrast = getContrastColor(bgColor, colorScheme);
    const classes = getContrastClasses(bgColor, classMap);
    const lightBg = contrast === colorScheme.light;

    setBackgroundColor(bgColor);
    setContrastColor(contrast);
    setContrastClasses(classes);
    setIsLight(lightBg);
  };

  // Effect for initial detection and scroll/resize tracking
  useEffect(() => {
    if (!enabled) return;

    // Initial detection with delay for page load
    const detectOnLoad = () => {
      setTimeout(updateColorState, BACKGROUND_DETECTION_DELAY);
    };

    if (document.readyState === 'complete') {
      detectOnLoad();
    } else {
      window.addEventListener('load', detectOnLoad);
    }

    // Event handlers
    const handleScroll = trackScroll ? updateColorState : null;
    const handleResize = trackResize ? updateColorState : null;

    // Add event listeners
    if (handleScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    if (handleResize) {
      window.addEventListener('resize', handleResize, { passive: true });
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', detectOnLoad);
      if (handleScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [sampleHeight, sampleWidth, offsetY, trackScroll, trackResize, enabled]);

  return {
    backgroundColor,
    isLight,
    contrastColor,
    contrastClasses,
    updateColorState // Manual trigger for updates
  };
};
