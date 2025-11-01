'use client';

/**
 * Page Color Utility
 * 
 * A simple utility to manage page background colors, text colors, 
 * and header/menu colors across the site by adding/removing Tailwind classes.
 * 
 * Usage:
 * import { setPageColors, resetPageColors } from '@/utils/pageColors';
 * 
 * // In a useEffect:
 * useEffect(() => {
 *   setPageColors({ background: 'bg-purple', text: 'text-black' });
 *   return () => resetPageColors(); // Cleanup
 * }, []);
 */

// Default colors when no specific colors are provided
const DEFAULT_COLORS = {
  background: 'bg-black',
  text: 'text-beige',
  fill: 'fill-beige',
};

// All possible background colors used in the site
const ALL_BG_COLORS = [
  'bg-black',
  'bg-beige',
  'bg-red',
  'bg-purple',
  'bg-blue',
  'bg-yellow',
  'bg-taupe',
  'bg-green',
  'bg-transparent',
];

// All possible text colors
const ALL_TEXT_COLORS = [
  'text-black',
  'text-beige',
];

// All possible fill colors (for SVGs)
const ALL_FILL_COLORS = [
  'fill-black',
  'fill-beige',
];

/**
 * Set page colors by applying Tailwind classes to body and header elements
 * 
 * @param {Object} options - Color options
 * @param {string} options.background - Background color class (e.g., 'bg-purple', 'bg-black')
 * @param {string} options.text - Text color class (e.g., 'text-black', 'text-beige')
 * @param {string} options.fill - Fill color class for SVGs (e.g., 'fill-black', 'fill-beige')
 * @param {boolean} options.applyToHeader - Whether to apply colors to header (default: true)
 * @param {boolean} options.applyToFooter - Whether to apply colors to footer (default: true)
 */
export function setPageColors(options = {}) {
  const {
    background = DEFAULT_COLORS.background,
    text = DEFAULT_COLORS.text,
    fill = DEFAULT_COLORS.fill,
    applyToHeader = true,
    applyToFooter = true,
  } = options;

  // Get elements
  const body = document.body;
  const header = document.querySelector('#site-header');
  const footer = document.querySelector('#footer');

  if (!body) return;

  // Remove all existing color classes from body
  body.classList.remove(...ALL_BG_COLORS, ...ALL_TEXT_COLORS, ...ALL_FILL_COLORS);
  
  // Add new color classes to body
  body.classList.add(background, text, fill);

  // Apply to header if it exists and if requested
  if (header && applyToHeader) {
    header.classList.remove(...ALL_TEXT_COLORS, ...ALL_FILL_COLORS);
    header.classList.add(text, fill);
  }

  // Apply to footer if it exists and if requested
  if (footer && applyToFooter) {
    footer.classList.remove(...ALL_BG_COLORS, ...ALL_TEXT_COLORS, ...ALL_FILL_COLORS);
    footer.classList.add(background, text, fill);
  }
}

/**
 * Reset page colors to default (black background, beige text)
 */
export function resetPageColors() {
  setPageColors(DEFAULT_COLORS);
}

/**
 * Set page colors from a category object (from Sanity)
 * 
 * @param {Object} category - Category object from Sanity
 * @param {Object} category.color - Color object with name property
 * @param {string} category.color.name - Color name (e.g., 'Purple', 'Black')
 */
export function setPageColorsFromCategory(category) {
  if (!category?.color?.name) {
    resetPageColors();
    return;
  }

  const colorName = category.color.name.toLowerCase();
  const bgColor = `bg-${colorName}`;
  const text = bgColor === 'bg-black' ? 'text-beige' : 'text-black';
  const fill = bgColor === 'bg-black' ? 'fill-beige' : 'fill-black';

  setPageColors({
    background: bgColor,
    text,
    fill,
  });
}

/**
 * Set page colors from a project object (from Sanity)
 * 
 * @param {Object} project - Project object from Sanity
 * @param {Object} project.color - Color object with name property
 * @param {string} project.color.name - Color name (e.g., 'Purple', 'Black')
 */
export function setPageColorsFromProject(project) {
  if (!project?.color?.name) {
    resetPageColors();
    return;
  }

  const colorName = project.color.name.toLowerCase();
  const bgColor = `bg-${colorName}`;
  const text = bgColor === 'bg-black' ? 'text-beige' : 'text-black';
  const fill = bgColor === 'bg-black' ? 'fill-beige' : 'fill-black';

  console.log('Setting page colors for project:', project.title, bgColor, text, fill);

  setPageColors({
    background: bgColor,
    text,
    fill,
  });
}
