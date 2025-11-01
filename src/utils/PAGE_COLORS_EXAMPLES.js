/**
 * Page Colors Utility - Usage Examples
 * 
 * This file contains practical examples of using the pageColors utility
 * in different scenarios across the site.
 */

// ============================================
// Example 1: Simple Static Page with Custom Colors
// ============================================

// File: src/app/about/page.js
'use client';

import PageColorManager from '@/app/components/PageColorManager';

export default function AboutPage() {
  return (
    <>
      <PageColorManager background="bg-purple" text="text-black" fill="fill-black" />
      <div className="container mx-auto px-4">
        <h1>About Us</h1>
        <p>Content goes here...</p>
      </div>
    </>
  );
}

// ============================================
// Example 2: Page with Dynamic Color Changes
// ============================================

// File: src/app/showcase/page.js
'use client';

import { useState, useEffect } from 'react';
import { setPageColors, getContrastingColors } from '@/utils/pageColors';

export default function ShowcasePage() {
  const [currentColor, setCurrentColor] = useState('bg-black');

  useEffect(() => {
    const { text, fill } = getContrastingColors(currentColor);
    setPageColors({
      background: currentColor,
      text,
      fill,
    });
  }, [currentColor]);

  const colors = [
    'bg-black', 'bg-beige', 'bg-red', 'bg-purple', 
    'bg-blue', 'bg-yellow', 'bg-taupe', 'bg-green'
  ];

  return (
    <div className="container mx-auto px-4">
      <h1>Color Showcase</h1>
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setCurrentColor(color)}
            className={`px-4 py-2 border ${color} rounded`}
          >
            {color.replace('bg-', '')}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Example 3: Category/Collection Page
// ============================================

// Already implemented in: src/app/work/[[...slug]]/page.js
import CategoryColorManager from '../components/CategoryColorManager';

export default async function CategoryPage({ params }) {
  const categoryInfo = await getCategoryBySlug(params.slug);
  
  return (
    <>
      <CategoryColorManager categoryInfo={categoryInfo} isCategory={true} />
      <div className="container mx-auto">
        {/* Category content */}
      </div>
    </>
  );
}

// ============================================
// Example 4: Detail Page (Project/Article)
// ============================================

// Already implemented in: src/app/work/project/[slug]/ProjectContent.js
'use client';

import { useEffect } from 'react';
import { setPageColorsFromProject, resetPageColors } from '@/utils/pageColors';

export default function ProjectContent({ project }) {
  useEffect(() => {
    setPageColorsFromProject(project);

    return () => {
      resetPageColors(); // Clean up on unmount
    };
  }, [project]);

  return (
    <div className="container mx-auto">
      {/* Project content */}
    </div>
  );
}

// ============================================
// Example 5: Section-Based Color Changes (Homepage)
// ============================================

// The homepage has its own scroll-based color system
// It doesn't use the page-level utility but manages colors
// per scroll section. This is fine and doesn't need to change.

// File: src/app/page.js (partial example)
export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const brandColors = ['bg-black', 'bg-red', 'bg-purple', /* etc */];

  return (
    <div className={`${brandColors[currentSection]}`}>
      {/* Scroll sections with different background colors */}
    </div>
  );
}

// ============================================
// Example 6: Page with Header but No Footer Colors
// ============================================

'use client';

import PageColorManager from '@/app/components/PageColorManager';

export default function MyPage() {
  return (
    <>
      <PageColorManager 
        background="bg-red" 
        text="text-black"
        fill="fill-black"
        applyToHeader={true}
        applyToFooter={false} // Don't change footer colors
      />
      <div className="container mx-auto">
        <h1>My Content</h1>
      </div>
    </>
  );
}

// ============================================
// Example 7: Conditional Colors Based on Data
// ============================================

'use client';

import { useEffect } from 'react';
import { setPageColors } from '@/utils/pageColors';

export default function ConditionalPage({ data }) {
  useEffect(() => {
    // Set colors based on data properties
    if (data.isDarkMode) {
      setPageColors({
        background: 'bg-black',
        text: 'text-beige',
        fill: 'fill-beige',
      });
    } else if (data.category === 'creative') {
      setPageColors({
        background: 'bg-purple',
        text: 'text-black',
        fill: 'fill-black',
      });
    } else {
      setPageColors({
        background: 'bg-beige',
        text: 'text-black',
        fill: 'fill-black',
      });
    }
  }, [data]);

  return <div>Content...</div>;
}

// ============================================
// Example 8: Using in Server Components
// ============================================

// For server components, you need to create a client wrapper
// File: src/app/team/ColorWrapper.js
'use client';

import PageColorManager from '@/app/components/PageColorManager';

export default function ColorWrapper({ children }) {
  return (
    <>
      <PageColorManager background="bg-blue" text="text-black" fill="fill-black" />
      {children}
    </>
  );
}

// Then use it in your server component:
// File: src/app/team/page.js
import ColorWrapper from './ColorWrapper';

export default async function TeamPage() {
  const teamData = await getTeamData();
  
  return (
    <ColorWrapper>
      <div className="container mx-auto">
        {/* Server-rendered content */}
      </div>
    </ColorWrapper>
  );
}

// ============================================
// Example 9: Direct Utility Usage in Event Handlers
// ============================================

'use client';

import { setPageColors } from '@/utils/pageColors';

export default function InteractivePage() {
  const handleThemeChange = (theme) => {
    if (theme === 'dark') {
      setPageColors({
        background: 'bg-black',
        text: 'text-beige',
        fill: 'fill-beige',
      });
    } else if (theme === 'light') {
      setPageColors({
        background: 'bg-beige',
        text: 'text-black',
        fill: 'fill-black',
      });
    }
  };

  return (
    <div>
      <button onClick={() => handleThemeChange('dark')}>Dark Theme</button>
      <button onClick={() => handleThemeChange('light')}>Light Theme</button>
    </div>
  );
}
