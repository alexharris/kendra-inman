# Page Colors Utility

A simple utility system for managing page background colors, text colors, and header/menu colors across the site using Tailwind CSS classes.

## Overview

This utility replaces the old `CategoryBackground` component and provides a more flexible, reusable way to control page colors from any component or page.

## Files

- **`/src/utils/pageColors.js`** - Core utility functions
- **`/src/app/components/PageColorManager.js`** - Generic component wrapper
- **`/src/app/work/components/CategoryColorManager.js`** - Specialized component for category pages

## Usage

### Option 1: Direct Function Calls (Most Flexible)

Use this approach when you need fine control or want to change colors dynamically.

```javascript
'use client';

import { useEffect } from 'react';
import { setPageColors, resetPageColors } from '@/utils/pageColors';

export default function MyPage() {
  useEffect(() => {
    // Set custom colors
    setPageColors({
      background: 'bg-purple',
      text: 'text-black',
      fill: 'fill-black',
    });

    // Cleanup when component unmounts
    return () => {
      resetPageColors();
    };
  }, []);

  return <div>My Content</div>;
}
```

### Option 2: PageColorManager Component (Simple)

Use this approach for simple, static color management.

```javascript
import PageColorManager from '@/app/components/PageColorManager';

export default function MyPage() {
  return (
    <>
      <PageColorManager 
        background="bg-red" 
        text="text-black" 
        fill="fill-black" 
      />
      <div>My Content</div>
    </>
  );
}
```

### Option 3: Auto-Contrasting Colors

Let the utility automatically determine text/fill colors based on background:

```javascript
import { setPageColors, getContrastingColors } from '@/utils/pageColors';

const bgColor = 'bg-purple';
const { text, fill } = getContrastingColors(bgColor);

setPageColors({
  background: bgColor,
  text,
  fill,
});
```

### Option 4: From Sanity Objects

For pages that receive category or project data from Sanity:

```javascript
import { setPageColorsFromCategory, setPageColorsFromProject } from '@/utils/pageColors';

// For categories
setPageColorsFromCategory(categoryInfo);

// For projects
setPageColorsFromProject(project);
```

## Available Functions

### `setPageColors(options)`

Main function to set page colors.

**Parameters:**
- `background` (string) - Background color class (e.g., 'bg-purple')
- `text` (string) - Text color class (e.g., 'text-black')
- `fill` (string) - Fill color for SVGs (e.g., 'fill-black')
- `applyToHeader` (boolean) - Apply colors to header (default: true)
- `applyToFooter` (boolean) - Apply colors to footer (default: true)

**Example:**
```javascript
setPageColors({
  background: 'bg-purple',
  text: 'text-black',
  fill: 'fill-black',
  applyToHeader: true,
  applyToFooter: false,
});
```

### `resetPageColors()`

Resets page to default colors (black background, beige text).

**Example:**
```javascript
resetPageColors();
```

### `getContrastingColors(bgColor)`

Returns appropriate text and fill colors for a given background.

**Example:**
```javascript
const { text, fill } = getContrastingColors('bg-purple');
// Returns: { text: 'text-black', fill: 'fill-black' }
```

### `setPageColorsFromCategory(category)`

Sets colors from a Sanity category object.

**Example:**
```javascript
setPageColorsFromCategory(categoryInfo);
```

### `setPageColorsFromProject(project)`

Sets colors from a Sanity project object.

**Example:**
```javascript
setPageColorsFromProject(project);
```

## Available Color Classes

### Backgrounds
- `bg-black`
- `bg-beige`
- `bg-red`
- `bg-purple`
- `bg-blue`
- `bg-yellow`
- `bg-taupe`
- `bg-green`

### Text
- `text-black`
- `text-beige`
- `text-white`

### Fill (SVGs)
- `fill-black`
- `fill-beige`
- `fill-white`

## How It Works

1. The utility adds/removes Tailwind classes from:
   - `document.body` (for page background and default text color)
   - `#site-header` (for header text and SVG colors)
   - `#footer` (for footer background and text colors)

2. All existing color classes are removed before new ones are applied to prevent conflicts.

3. The utility automatically manages cleanup when components unmount.

## Migration from CategoryBackground

The old `CategoryBackground` component has been replaced with `CategoryColorManager`, which uses this utility system internally.

**Before:**
```javascript
import CategoryBackground from '../components/CategoryBackground';

<CategoryBackground categoryInfo={categoryInfo} isCategory={isCategory} />
```

**After:**
```javascript
import CategoryColorManager from '../components/CategoryColorManager';

<CategoryColorManager categoryInfo={categoryInfo} isCategory={isCategory} />
```

## Examples by Page Type

### Homepage
```javascript
// In page.js
import PageColorManager from '@/app/components/PageColorManager';

export default function HomePage() {
  return (
    <>
      <PageColorManager background="bg-black" />
      {/* Your content */}
    </>
  );
}
```

### Category Page
```javascript
// Already implemented in /work/[[...slug]]/page.js
import CategoryColorManager from '../components/CategoryColorManager';

<CategoryColorManager categoryInfo={categoryInfo} isCategory={isCategory} />
```

### Project Page
```javascript
// Already implemented in ProjectContent.js
import { setPageColorsFromProject, resetPageColors } from '@/utils/pageColors';

useEffect(() => {
  setPageColorsFromProject(project);
  return () => resetPageColors();
}, [project]);
```

### Dynamic Color Changes
```javascript
'use client';

import { useState, useEffect } from 'react';
import { setPageColors } from '@/utils/pageColors';

export default function DynamicPage() {
  const [currentColor, setCurrentColor] = useState('bg-black');

  useEffect(() => {
    setPageColors({ background: currentColor });
  }, [currentColor]);

  return (
    <div>
      <button onClick={() => setCurrentColor('bg-purple')}>Purple</button>
      <button onClick={() => setCurrentColor('bg-red')}>Red</button>
    </div>
  );
}
```

## Notes

- Always use `useEffect` cleanup to reset colors when components unmount
- The utility is client-side only ('use client' required)
- Make sure element IDs (`#site-header`, `#footer`) exist in your DOM
- Colors apply immediately without animation (add CSS transitions if needed)
