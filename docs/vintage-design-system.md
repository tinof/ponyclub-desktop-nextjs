# Vintage Postcard Design System

## Overview

This design system defines the visual identity and implementation standards for vintage postcard-themed components in the Pony Club project. It ensures consistency across all vintage-styled elements while maintaining accessibility and performance standards.

## 1. Design Principles & Aesthetic Guidelines

### Core Philosophy
The vintage postcard aesthetic evokes nostalgia through aged paper textures, decorative borders, serif typography, and warm earth tones. Components should feel authentic and handcrafted while remaining modern and functional.

### Color Palette

#### Primary Vintage Colors
```css
/* Deep Forest Green - Primary vintage color */
--vintage-primary: #2d5a3d;

/* Medium Forest Green - Secondary accent */
--vintage-secondary: #4a7c59;

/* Sage Green - Light accent */
--vintage-light: #6b8362;

/* Vintage Orange - Alternative theme */
--vintage-orange-primary: #c2410c;
--vintage-orange-secondary: #ea580c;
--vintage-orange-light: #f97316;
```

#### Background Colors
```css
/* Aged Paper Base */
--vintage-paper-light: #f7f5f0;
--vintage-paper-medium: #ede8d8;
--vintage-paper-dark: #e5dcc9;

/* Texture Overlays */
--vintage-texture-light: rgba(120, 119, 108, 0.05);
--vintage-texture-medium: rgba(120, 119, 108, 0.1);
--vintage-texture-dark: rgba(120, 119, 108, 0.15);
```

#### Usage Rules
- **Green Theme**: Use for primary packages, main content areas
- **Orange Theme**: Use for secondary packages, accent elements
- **Paper Backgrounds**: Always use gradient combinations for depth
- **Texture Overlays**: Apply sparingly for subtle aging effects

### Typography Hierarchy

#### Font Stack
```css
font-family: 'Playfair Display', 'Crimson Text', serif;
```

#### Hierarchy Specifications
```css
/* Main Titles */
.vintage-title-main {
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1.2;
}

/* Section Titles */
.vintage-title-section {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1.3;
}

/* Pricing Display */
.vintage-price-large {
  font-size: 4xl; /* 2.25rem */
  font-weight: 700;
  letter-spacing: 0.05em;
}

.vintage-price-medium {
  font-size: 3xl; /* 1.875rem */
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* Body Text */
.vintage-body {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  line-height: 1.5;
}

/* Button Text */
.vintage-button-text {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 1.2rem;
}
```

### Spacing & Layout Principles

#### Standard Spacing Scale
```css
/* Vintage spacing follows 8px grid with emphasis on generous spacing */
--vintage-space-xs: 0.5rem;   /* 8px */
--vintage-space-sm: 0.75rem;  /* 12px */
--vintage-space-md: 1rem;     /* 16px */
--vintage-space-lg: 1.5rem;   /* 24px */
--vintage-space-xl: 2rem;     /* 32px */
--vintage-space-2xl: 3rem;    /* 48px */
```

#### Layout Guidelines
- **Card Padding**: Minimum 2rem (32px) for breathing room
- **Section Spacing**: 1.5rem (24px) between content sections
- **Border Spacing**: 15-20px from card edges for inner decorative borders
- **Icon Spacing**: 0.75rem (12px) gap between icons and text

## 2. Technical Implementation Standards

### CSS-in-JS Patterns

#### Base Vintage Card Structure
```jsx
<style jsx>{`
  .vintage-card {
    background: linear-gradient(135deg, #f7f5f0 0%, #ede8d8 100%);
    border: 8px solid #2d5a3d;
    border-radius: 20px;
    position: relative;
    padding: 2rem;
    font-family: 'Playfair Display', 'Crimson Text', serif;
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 108, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(120, 119, 108, 0.1) 0%, transparent 50%);
    box-shadow: 
      0 20px 40px rgba(45, 90, 61, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  }
  
  .vintage-card::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(45deg, #2d5a3d, #4a7c59, #2d5a3d);
    border-radius: 24px;
    z-index: -1;
  }
  
  .vintage-card::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border: 2px solid #2d5a3d;
    border-radius: 12px;
    opacity: 0.3;
    pointer-events: none;
  }
`}</style>
```

### Component Structure Convention
```jsx
// Standard vintage component structure
export default function VintageComponent({ variant = 'green', ...props }) {
  const colorTheme = {
    green: {
      primary: '#2d5a3d',
      secondary: '#4a7c59',
      background: 'bg-gradient-to-br from-green-50 to-green-100',
      // ... other theme properties
    },
    orange: {
      primary: '#c2410c',
      secondary: '#ea580c',
      background: 'bg-gradient-to-br from-orange-50 to-orange-100',
      // ... other theme properties
    }
  };
  
  const theme = colorTheme[variant];
  
  return (
    <div className="vintage-component">
      <style jsx>{/* CSS-in-JS styles */}</style>
      {/* Component content */}
    </div>
  );
}
```

### Responsive Design Patterns
```css
/* Mobile-first approach with vintage aesthetics maintained */
.vintage-responsive {
  padding: 1.5rem;
  border-width: 6px;
}

@media (min-width: 768px) {
  .vintage-responsive {
    padding: 2rem;
    border-width: 8px;
  }
}

@media (min-width: 1024px) {
  .vintage-responsive {
    padding: 2.5rem;
    border-width: 10px;
  }
}
```

## 3. Visual Elements Library

### Aged Paper Backgrounds
```css
/* Standard aged paper gradient */
background: linear-gradient(135deg, #f7f5f0 0%, #ede8d8 100%);

/* With texture overlay */
background-image: 
  radial-gradient(circle at 20% 80%, rgba(120, 119, 108, 0.1) 0%, transparent 50%),
  radial-gradient(circle at 80% 20%, rgba(120, 119, 108, 0.1) 0%, transparent 50%),
  radial-gradient(circle at 40% 40%, rgba(120, 119, 108, 0.05) 0%, transparent 50%);
```

### Decorative Borders
```css
/* Main card border */
border: 8px solid #2d5a3d;
border-radius: 20px;

/* Inner decorative border */
.inner-border::after {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border: 2px solid #2d5a3d;
  border-radius: 12px;
  opacity: 0.3;
  pointer-events: none;
}
```

### Corner Flourishes
```css
.corner-flourish {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 3px solid #2d5a3d;
  opacity: 0.6;
}

.corner-flourish::before,
.corner-flourish::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 3px;
  background: #2d5a3d;
}

.corner-flourish.top-left {
  top: 20px;
  left: 20px;
  border-right: none;
  border-bottom: none;
  border-radius: 0 0 0 12px;
}
```

### Activity Icon System
```jsx
const getActivityIcon = (activity) => {
  const iconMap = {
    rafting: '🌊',  // Water wave for rafting
    kayak: '🚣',    // Rowing for kayaking  
    riding: '🐎',   // Horse for riding
    hiking: '🥾',   // Hiking boot for hiking/trekking
    extras: '🎒'    // Backpack for additional items
  };
  
  return iconMap[activity.toLowerCase()] || '•';
};
```

## 4. Component Templates & Examples

### Vintage Button Template
```jsx
<button className={`
  bg-gradient-to-r from-[#2d5a3d] to-[#4a7c59]
  hover:from-[#4a7c59] hover:to-[#2d5a3d]
  border-3 border-[#2d5a3d]
  font-serif tracking-wider uppercase
  transform transition-all duration-200
  hover:scale-105 hover:shadow-xl
  text-white font-bold
  px-8 py-4 rounded-lg
  shadow-lg
`}>
  {buttonText}
</button>
```

### Pricing Section Template
```jsx
<div className="pricing-section">
  <style jsx>{`
    .price-item {
      background: rgba(255, 255, 255, 0.6);
      border: 2px solid #2d5a3d;
      border-radius: 8px;
      padding: 0.75rem 1rem;
      margin: 0.5rem 0;
      font-family: 'Playfair Display', serif;
      font-weight: 600;
      color: #2d5a3d;
      font-size: 1.1rem;
      letter-spacing: 0.05em;
    }
  `}</style>

  <div className="price-item">
    <div className="text-base font-bold uppercase tracking-wide">
      Adults
    </div>
    <div className="text-4xl font-bold tracking-wider">
      20 €
    </div>
  </div>
</div>
```

### Color Theming System
```jsx
// Theme configuration object
const vintageThemes = {
  green: {
    primary: '#2d5a3d',
    secondary: '#4a7c59',
    light: '#6b8362',
    gradient: 'from-[#2d5a3d] to-[#4a7c59]',
    hoverGradient: 'from-[#4a7c59] to-[#2d5a3d]',
    background: 'bg-gradient-to-br from-green-50 to-green-100',
    textColor: 'text-[#2d5a3d]'
  },
  orange: {
    primary: '#c2410c',
    secondary: '#ea580c',
    light: '#f97316',
    gradient: 'from-[#c2410c] to-[#ea580c]',
    hoverGradient: 'from-[#ea580c] to-[#c2410c]',
    background: 'bg-gradient-to-br from-orange-50 to-orange-100',
    textColor: 'text-[#c2410c]'
  }
};

// Usage in component
const VintageComponent = ({ theme = 'green' }) => {
  const colors = vintageThemes[theme];

  return (
    <div className={`vintage-card ${colors.background}`}>
      <style jsx>{`
        .vintage-card {
          border-color: ${colors.primary};
          color: ${colors.primary};
        }
      `}</style>
    </div>
  );
};
```

## 5. Usage Guidelines

### When to Apply Vintage Styling

#### ✅ Appropriate Use Cases
- **Package/Product Cards**: Main content showcasing activities
- **Pricing Displays**: Modal popups, pricing sections
- **Call-to-Action Elements**: Booking buttons, contact forms
- **Feature Highlights**: Special offers, testimonials
- **Navigation Elements**: When part of vintage-themed pages

#### ❌ Avoid Vintage Styling For
- **Form Inputs**: Keep modern for usability
- **Error Messages**: Maintain clarity with standard styling
- **Loading States**: Use modern, accessible indicators
- **Administrative Interfaces**: Keep functional and clean
- **Mobile Navigation**: Prioritize usability over aesthetics

### Integration with Modern Components

#### Hybrid Approach
```jsx
// Vintage wrapper with modern functionality
<div className="vintage-card">
  <style jsx>{/* Vintage styling */}</style>

  {/* Modern form elements inside vintage container */}
  <form className="space-y-4">
    <input
      type="email"
      className="modern-input" // Keep modern styling
      placeholder="Email address"
    />

    <button className="vintage-button">
      Subscribe
    </button>
  </form>
</div>
```

#### Component Composition
```jsx
// Vintage aesthetic with modern accessibility
<VintageCard theme="green">
  <VintageTitle>Package Details</VintageTitle>
  <ModernBookingWidget /> {/* Modern component inside */}
  <VintageButton>Book Now</VintageButton>
</VintageCard>
```

### Accessibility Considerations

#### Color Contrast Requirements
```css
/* Ensure WCAG AA compliance */
.vintage-text-primary {
  color: #2d5a3d; /* Contrast ratio: 4.8:1 on #f7f5f0 background */
}

.vintage-text-secondary {
  color: #1f3a26; /* Darker variant for better contrast when needed */
}
```

#### Focus States
```css
.vintage-button:focus {
  outline: 3px solid #2d5a3d;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px white, 0 0 0 5px #2d5a3d;
}
```

#### Screen Reader Considerations
```jsx
// Always include proper ARIA labels
<button
  className="vintage-button"
  aria-label="Open price list modal"
  aria-describedby="price-list-description"
>
  View Prices
</button>

<div id="price-list-description" className="sr-only">
  Opens a modal with detailed pricing for all activities
</div>
```

### Performance Optimization

#### CSS-in-JS Best Practices
```jsx
// ✅ Good: Memoize styles to prevent re-renders
const vintageStyles = useMemo(() => ({
  card: {
    background: 'linear-gradient(135deg, #f7f5f0 0%, #ede8d8 100%)',
    border: '8px solid #2d5a3d',
    // ... other styles
  }
}), [theme]);

// ❌ Avoid: Inline styles that recreate on every render
<div style={{
  background: 'linear-gradient(135deg, #f7f5f0 0%, #ede8d8 100%)',
  border: '8px solid #2d5a3d'
}}>
```

#### Image Optimization
```jsx
// Use Next.js Image component for vintage decorative elements
import Image from 'next/image';

<div className="vintage-card">
  <Image
    src="/vintage-texture.png"
    alt=""
    fill
    className="vintage-texture-overlay"
    priority={false}
    quality={75}
  />
</div>
```

## Implementation Checklist

### For New Vintage Components
- [ ] Apply base vintage card structure with CSS-in-JS
- [ ] Implement proper color theming (green/orange variants)
- [ ] Use Playfair Display font family with correct hierarchy
- [ ] Add decorative borders and corner flourishes
- [ ] Include appropriate activity icons from the standard set
- [ ] Ensure responsive behavior across all devices
- [ ] Test accessibility with screen readers and keyboard navigation
- [ ] Verify color contrast meets WCAG AA standards
- [ ] Optimize performance with memoized styles
- [ ] Add proper ARIA labels and descriptions

### Quality Assurance
- [ ] Visual consistency with existing vintage components
- [ ] Smooth animations and hover effects
- [ ] Proper spacing following the 8px grid system
- [ ] Typography hierarchy matches design system
- [ ] Color themes work correctly in both variants
- [ ] Component works with internationalization (Greek/English)
- [ ] No console errors or warnings
- [ ] Passes accessibility audit tools
- [ ] Performance metrics within acceptable ranges
- [ ] Cross-browser compatibility verified

## Maintenance Notes

### Version History
- **v1.0**: Initial vintage design system implementation
- **v1.1**: Added VintagePackageCard component
- **v1.2**: Added VintagePriceListPopup modal component
- **v1.3**: Comprehensive design system documentation

### Future Enhancements
- [ ] Vintage form components (contact forms, booking forms)
- [ ] Vintage navigation elements
- [ ] Additional color theme variants (sepia, blue vintage)
- [ ] Vintage loading states and micro-interactions
- [ ] Print-friendly vintage styling
- [ ] Dark mode vintage theme adaptation

---

*This design system is a living document. Update it whenever new vintage components are added or existing patterns are modified to ensure consistency across the project.*
