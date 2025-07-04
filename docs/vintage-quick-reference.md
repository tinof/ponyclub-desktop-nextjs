# Vintage Design System - Quick Reference

## 🎨 Color Palette

### Green Theme (Primary)
```css
--vintage-primary: #2d5a3d;
--vintage-secondary: #4a7c59;
--vintage-light: #6b8362;
```

### Orange Theme (Alternative)
```css
--vintage-orange-primary: #c2410c;
--vintage-orange-secondary: #ea580c;
--vintage-orange-light: #f97316;
```

### Backgrounds
```css
--vintage-paper-light: #f7f5f0;
--vintage-paper-medium: #ede8d8;
```

## 📝 Typography

### Font Stack
```css
font-family: 'Playfair Display', 'Crimson Text', serif;
```

### Common Classes
```css
.vintage-title-main     /* 2.5rem, 700, uppercase, 0.1em spacing */
.vintage-title-section  /* 1.5rem, 700, uppercase, 0.08em spacing */
.vintage-price-large    /* 4xl, 700, 0.05em spacing */
.vintage-body           /* 1.1rem, 600, 0.025em spacing */
.vintage-button-text    /* 700, uppercase, 0.1em spacing */
```

## 🎯 Activity Icons

```jsx
const icons = {
  rafting: '🌊',  // Water wave
  kayak: '🚣',    // Rowing
  riding: '🐎',   // Horse
  hiking: '🥾',   // Hiking boot
  extras: '🎒'    // Backpack
};
```

## 🏗️ Base Card Structure

```jsx
<div className="vintage-card">
  <style jsx>{`
    .vintage-card {
      background: linear-gradient(135deg, #f7f5f0 0%, #ede8d8 100%);
      border: 8px solid #2d5a3d;
      border-radius: 20px;
      padding: 2rem;
      font-family: 'Playfair Display', serif;
      position: relative;
      box-shadow: 0 20px 40px rgba(45, 90, 61, 0.3);
    }
    
    .vintage-card::before {
      content: '';
      position: absolute;
      top: -4px; left: -4px; right: -4px; bottom: -4px;
      background: linear-gradient(45deg, #2d5a3d, #4a7c59, #2d5a3d);
      border-radius: 24px;
      z-index: -1;
    }
    
    .vintage-card::after {
      content: '';
      position: absolute;
      top: 15px; left: 15px; right: 15px; bottom: 15px;
      border: 2px solid #2d5a3d;
      border-radius: 12px;
      opacity: 0.3;
      pointer-events: none;
    }
  `}</style>
  
  {/* Content here */}
</div>
```

## 🔘 Vintage Button

```jsx
<button className={`
  bg-gradient-to-r from-[#2d5a3d] to-[#4a7c59]
  hover:from-[#4a7c59] hover:to-[#2d5a3d]
  border-3 border-[#2d5a3d]
  font-serif tracking-wider uppercase
  transform transition-all duration-200
  hover:scale-105 hover:shadow-xl
  text-white font-bold px-8 py-4 rounded-lg
  shadow-lg
`}>
  {buttonText}
</button>
```

## 💰 Price Display

```jsx
<div className="price-section">
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

## 🎨 Theme Variants

```jsx
const vintageThemes = {
  green: {
    primary: '#2d5a3d',
    secondary: '#4a7c59',
    gradient: 'from-[#2d5a3d] to-[#4a7c59]',
    hoverGradient: 'from-[#4a7c59] to-[#2d5a3d]'
  },
  orange: {
    primary: '#c2410c',
    secondary: '#ea580c',
    gradient: 'from-[#c2410c] to-[#ea580c]',
    hoverGradient: 'from-[#ea580c] to-[#c2410c]'
  }
};
```

## 📱 Responsive Breakpoints

```css
/* Mobile */
.vintage-responsive {
  padding: 1.5rem;
  border-width: 6px;
}

/* Tablet */
@media (min-width: 768px) {
  .vintage-responsive {
    padding: 2rem;
    border-width: 8px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .vintage-responsive {
    padding: 2.5rem;
    border-width: 10px;
  }
}
```

## ♿ Accessibility Checklist

- [ ] Color contrast ≥ 4.5:1 (WCAG AA)
- [ ] Focus states with visible outlines
- [ ] ARIA labels for interactive elements
- [ ] Screen reader friendly text
- [ ] Keyboard navigation support

```jsx
// Focus state example
.vintage-button:focus {
  outline: 3px solid #2d5a3d;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px white, 0 0 0 5px #2d5a3d;
}
```

## 🚀 Performance Tips

- ✅ Use `useMemo` for CSS-in-JS styles
- ✅ Optimize images with Next.js Image component
- ✅ Minimize inline styles
- ❌ Avoid recreating styles on every render

## 📋 Implementation Checklist

- [ ] Base vintage card structure applied
- [ ] Correct color theme (green/orange)
- [ ] Playfair Display font family
- [ ] Decorative borders and flourishes
- [ ] Appropriate activity icons
- [ ] Responsive behavior
- [ ] Accessibility compliance
- [ ] Performance optimized

---

**Quick Start**: Copy the base card structure, apply your theme colors, add content with proper typography hierarchy, and ensure accessibility compliance.

For complete documentation, see: `docs/vintage-design-system.md`
