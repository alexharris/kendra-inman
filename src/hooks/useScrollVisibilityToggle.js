import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for toggling visibility based on scroll position
 * Switches visibility when the top of targetElement reaches the same vertical position as referenceElement
 * @param {string} referenceElementId - ID of the reference element (top-about-text)
 * @param {string} targetElementId - ID of the target element (footer-extension)
 * @returns {Object} Visibility state and utilities
 */
export const useScrollVisibilityToggle = (referenceElementId, targetElementId) => {
  const [showReference, setShowReference] = useState(true);
  const [showTarget, setShowTarget] = useState(true);

  const checkScrollPosition = useCallback(() => {
    const referenceElement = document.getElementById(referenceElementId);
    const targetElement = document.getElementById(targetElementId);

    if (!referenceElement || !targetElement) return;

    // Get the top positions relative to the viewport
    const referenceRect = referenceElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    // Calculate the absolute positions from the top of the document
    const referenceTop = referenceRect.top + window.scrollY;
    const targetTop = targetRect.top + window.scrollY;

    // Toggle visibility based on whether the target has reached or passed the reference position
    // When footer-extension top reaches the top-about-text position, switch visibility
    const shouldShowTarget = targetTop <= referenceTop;
    const shouldShowReference = !shouldShowTarget;

    setShowReference(shouldShowReference);
    setShowTarget(shouldShowTarget);
  }, [referenceElementId, targetElementId]);

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
    showReference,
    showTarget,
    checkScrollPosition // Manual trigger for updates
  };
};