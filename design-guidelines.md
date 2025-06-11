# Pony Club Design Guidelines

## Color Palette

### Primary Colors

- **Green Shades**:
  - Dark Green: `#3E5A35` - Used for headings, primary backgrounds, hover states
  - Medium Green: `#6b8362` - Used for buttons, accents, icons
- **Amber/Earth Tones**:
  - Amber Dark: `#b45309` (amber-700) - Used for secondary elements,
    complementary to green
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
  hover: transform translateY(-2px) transition-all duration-300;
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

### WCAG 2.1 AA Compliance Standards

#### Color Contrast Requirements

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio
- **UI components and graphics**: Minimum 3:1 contrast ratio
- **Focus indicators**: Minimum 3:1 contrast ratio against adjacent colors

#### Approved Color Combinations

- **High contrast**: Dark Green (#3E5A35) on White (#FAF7F2) - 9.2:1 ✅
- **Medium contrast**: Medium Green (#6b8362) on White (#FAF7F2) - 5.8:1 ✅
- **Amber contrast**: Amber Dark (#b45309) on White (#FAF7F2) - 4.9:1 ✅
- **Body text**: Gray-700 (#374151) on White - 8.9:1 ✅

#### Interactive Elements

##### Buttons

- **MUST** have accessible names via:
  - Visible text content, OR
  - `aria-label` attribute, OR
  - `aria-labelledby` pointing to descriptive text
- **Icon-only buttons** MUST have `aria-label`
- **Focus states** MUST be clearly visible with 2px outline
- **Hover states** MUST maintain contrast ratios

##### Links

- **MUST** have descriptive text or `aria-label`
- **Avoid** "click here" or "read more" without context
- **External links** should indicate they open in new window
- **Focus indicators** MUST be visible and distinct

##### Images

- **Decorative images**: Use `alt=""` or `role="presentation"`
- **Informative images**: Provide descriptive `alt` text
- **Complex images**: Use `aria-describedby` for detailed descriptions
- **Logo images**: Include company/site name in alt text

##### Iframes

- **MUST** have descriptive `title` attribute
- **Embedded content** should be keyboard accessible
- **Maps**: Title should describe location/purpose

#### Keyboard Navigation

- **All interactive elements** MUST be keyboard accessible
- **Tab order** MUST be logical and predictable
- **Focus indicators** MUST be visible (minimum 2px outline)
- **Skip links** for main content navigation
- **Dropdown menus** MUST support arrow key navigation

#### Screen Reader Support

- **Semantic HTML**: Use proper heading hierarchy (h1-h6)
- **ARIA landmarks**: `main`, `nav`, `aside`, `footer`
- **ARIA labels**: For complex UI components
- **Live regions**: For dynamic content updates
- **Form labels**: Properly associated with inputs

#### Implementation Checklist

##### For All Components:

- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works properly
- [ ] Screen reader announces content correctly
- [ ] Focus indicators are visible
- [ ] Interactive elements have accessible names

##### For Buttons:

- [ ] Visible text or `aria-label` present
- [ ] Focus state has 2px outline with 3:1 contrast
- [ ] Hover state maintains readability
- [ ] Purpose is clear from context

##### For Images:

- [ ] Alt text describes image content/purpose
- [ ] Decorative images have empty alt or role="presentation"
- [ ] Complex images have additional descriptions

##### For Forms:

- [ ] Labels are properly associated
- [ ] Error messages are descriptive
- [ ] Required fields are clearly marked
- [ ] Validation feedback is accessible

##### For Navigation:

- [ ] Logical tab order maintained
- [ ] Skip links provided
- [ ] Current page indicated in navigation
- [ ] Dropdown menus support keyboard navigation

#### Testing Requirements

- **Automated testing**: Use axe-core or similar tools
- **Keyboard testing**: Navigate entire site with keyboard only
- **Screen reader testing**: Test with NVDA, JAWS, or VoiceOver
- **Color blindness testing**: Use tools like Stark or Colour Contrast Analyser
- **Mobile accessibility**: Test with mobile screen readers

#### Common Accessibility Violations to Avoid

- Buttons without accessible names
- Insufficient color contrast (below 4.5:1 for normal text)
- Images without alt text
- Iframes without titles
- Links without descriptive text
- Missing focus indicators
- Improper heading hierarchy
- Form inputs without labels
