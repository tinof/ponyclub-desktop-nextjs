# Pony Club Design Guidelines

## Color Palette

### Primary Colors
- **Green Shades**:
  - Dark Green: `#3E5A35` - Used for headings, primary backgrounds, hover states
  - Medium Green: `#6b8362` - Used for buttons, accents, icons
- **Amber/Earth Tones**:
  - Amber Dark: `#b45309` (amber-700) - Used for secondary elements, complementary to green
  - Amber Medium: `#92400e` (amber-800) - Used for hover states
- **Neutrals**:
  - Background: `#f5f0e8` - Main page background
  - White: `#FAF7F2` - Header background, light elements

### Opacity Guidelines
- Text overlays: 80% opacity for primary, 60% for secondary
- Glass effects: 10-30% opacity depending on importance
- Border highlights: 20-40% opacity
- Hover states: Increase opacity by 10-20%

## Typography

- **Heading Font**: Roboto Slab (`font-roboto-slab`) for titles and headings
- **Body Font**: System font-stack for general text
- **Font Weights**:
  - Headings: Bold (700) for main titles, Semi-bold (600) for subtitles
  - Buttons: Semi-bold (600)
  - Body text: Regular (400)
- **Font Sizes**:
  - Large headings: 3xl-5xl (1.875rem-3rem)
  - Card titles: 3xl-4xl (1.875rem-2.25rem)
  - Button text: lg (1.125rem)
  - Body text: base-lg (1rem-1.125rem)

## Glass Morphism

### Implementation Technique
1. **Base layer**: Content on image background
2. **Glassmorphism overlay**: Semi-transparent color with blur effect
   ```css
   .glass-overlay {
     @apply bg-[#colorHex]/10 backdrop-blur-[2px];
   }
   ```
3. **Content layer**: Elements on top of glass effect

### Common Glass Effects
- **Light Glass**: `bg-white/80 backdrop-blur-md`
- **Dark Glass**: `bg-[#colorHex]/70 backdrop-blur-md`
- **Subtle Glass**: `bg-[#colorHex]/10 backdrop-blur-[2px]`

## Layering System

### Z-Index Structure
- Background elements: z-0
- Glass/blur effects: z-10
- Content elements: z-20
- Interactive elements: z-30
- Hover/focus effects: z-40

### Layering Techniques
1. **Card Construction**:
   - Base image layer
   - Glass overlay layer
   - Content section layers (header, body, footer)
   - Border effects and highlights

2. **Visual Depth**:
   - Use shadows with varying intensities
   - Apply subtle borders with low opacity
   - Use gradient overlays for dimension

## Component Styles

### Cards
- **Dimensions**: Full content cards typically use h-[550px]
- **Border Radius**: rounded-2xl (1rem) for cards
- **Shadow**: shadow-xl for cards, shadow-lg for internal elements
- **Transitions**: 
  - transform hover:scale-[1.02]
  - transition-all duration-500

### Buttons
- **Border Radius**: rounded-lg (0.5rem)
- **Padding**: py-3 px-6
- **Text**: text-lg font-semibold text-white
- **Shadow**: shadow-lg
- **Hover Effect**: 
  - Darker background color
  - transform translateY(-2px)
- **Border**: None, or subtle white/20 border

### Badges
- **Style**: rounded-full px-4 py-1.5
- **Border**: border border-white/20
- **Text**: text-sm font-semibold
- **Background**: Colored with 90% opacity and backdrop-blur-xs

## Effect Patterns

### Gradient Overlays
- **Top-to-Bottom Fade**: 
  ```css
  bg-linear-to-b from-[#colorHex]/80 via-[#colorHex]/60 to-transparent
  ```

- **Corner Highlight**: 
  ```css
  bg-linear-to-tr from-[#colorHex]/40 via-transparent to-[#colorHex]/30
  ```

### Border Effects
- **Glass Border**: 
  ```css
  border border-white/40
  ```
  
- **Highlight Border**: 
  ```css
  border-t border-white/20
  ```

### Shadow Patterns
- **Card Shadow**: 
  ```css
  shadow-xl hover:shadow-2xl transition-shadow duration-300
  ```

- **Button Shadow**:
  ```css
  shadow-lg hover:shadow-xl
  ```

## Animation Guidelines

- **Hover Scale**: 
  ```css
  transform hover:scale-[1.02] transition-all duration-500
  ```

- **Button Press**: 
  ```css
  hover:transform translateY(-2px) transition-all duration-300
  ```

- **Subtle Animations**: 
  ```css
  animate-pulse
  ```

## Responsive Design

### Breakpoints
- **Mobile**: Default styling
- **Tablet**: md (768px) and up
- **Desktop**: lg (1024px) and up

### Card Layout
- **Mobile**: Full width, stacked vertically
- **Tablet+**: 50% width, side by side

### Text Sizing
- **Mobile**: Base sizes (reduce by 1 step)
- **Tablet+**: Full sizes

## Accessibility Guidelines

- Maintain text contrast ratios of at least 4.5:1
- Use semantic HTML elements
- Ensure hover states have clear visual feedback
- Provide focus indicators for keyboard navigation
- Test color combinations for color blindness compatibility
