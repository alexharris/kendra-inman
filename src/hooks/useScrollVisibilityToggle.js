import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for toggling visibility based on scroll position
 * Switches visibility when the top of bottomElement reaches the same vertical position as topElement
 * @param {string} topElementId - ID of the top element (top-about-text)
 * @param {string} bottomElementId - ID of the bottom element (footer-extension)
 * @returns {Object} Visibility state and utilities
 */
export const useScrollVisibilityToggle = (topElementId, bottomElementId) => {
  const [showTop, setShowTop] = useState(true);
  const [showBottom, setShowBottom] = useState(true);

  const checkScrollPosition = useCallback(() => {
    const topElement = document.getElementById(topElementId);
    const bottomElement = document.getElementById(bottomElementId);

    if (!topElement || !bottomElement) return;

    // Get the top positions relative to the viewport
    const topRect = topElement.getBoundingClientRect();
    const bottomRect = bottomElement.getBoundingClientRect();

    // Calculate the absolute positions from the top of the document
    const topPosition = topRect.top + window.scrollY;
    const bottomPosition = bottomRect.top + window.scrollY;


    // Toggle visibility based on whether the bottom has reached or passed the top position
    // When footer-extension top reaches the top-about-text position, switch visibility
    const shouldShowBottom = bottomPosition <= topPosition + 20;
    const shouldShowTop = !shouldShowBottom;

    setShowTop(shouldShowTop);
    setShowBottom(shouldShowBottom);
    // console.log('Scroll Check:', {
    //   shouldShowTop,
    //   shouldShowBottom,
    //   topPosition,
    //   bottomPosition,
    //   topRect: topRect.top,
    //   bottomRect: bottomRect.top,
    //   scrollY: window.scrollY,
    //   difference: bottomPosition - topPosition
    // });
  }, [topElementId, bottomElementId]);

  useEffect(() => {
    // Initial check
    const initialCheck = () => {
      setTimeout(checkScrollPosition, 100); // Small delay to ensure elements are rendered
    };

    if (document.readyState === 'complete') {
      initialCheck();
    } else {
      window.addEventListener('load', initialCheck);
    }

    // Add scroll listener
    const handleScroll = () => {
      checkScrollPosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScrollPosition, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('load', initialCheck);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  return {
    showTop,
    showBottom,
    checkScrollPosition // Manual trigger for updates
  };
};