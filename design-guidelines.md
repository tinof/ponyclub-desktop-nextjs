# Acheron River Excursion Design Guidelines

This document outlines the design principles, components, and patterns used throughout the Acheron River Excursion website. Following these guidelines will help maintain design consistency across the site.

## Design Philosophy

The site design embraces a natural, outdoor adventure theme with elegant layering effects that create visual depth. Key principles include:

- **Natural color palette** inspired by the Acheron River landscape
- **Subtle depth** through layered elements, gradients, and shadows
- **Gentle hover animations** for interactive elements
- **Consistent visual hierarchy** with clear section distinctions
- **Backdrop blur effects** to enhance readability while maintaining transparency

## Color Palette

Primary colors:
- Green (nature): `#6b8362` - Used for headings, highlights, and accent elements
- Terracotta (earth): `#c27a5f` - Used for secondary highlights and program cards
- Sand/cream background: `#f5f0e8` - Main background color
- White variations: `white/80`, `white/90` - For layered elements with transparency

Gradient combinations:
- Text underlines: `from-transparent via-[#6b8362]/70 to-transparent`
- Card glows: `from-[#6b8362]/30 via-white/40 to-[#6b8362]/30`
- Background elements: `from-amber-200/20 via-white/50 to-[#6b8362]/20`

## Typography

The site uses a combination of fonts:
- `Roboto_Slab` for headings and emphasis text, with weights 400 and 700
- System sans-serif fonts for body copy

Text styling patterns:
- Headings with subtle gradient underlines
- Drop shadows for text on hero sections: `drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]`
- Animated gradient text with the `animate-text-shine` class

## Layout Components

### Page Structure

All pages follow a consistent structure:
- Logo in top-left
- Navigation in top-right
- Hero section with title and subtitle
- Hero bottom text banner with brief description
- Content sections with consistent styling

### Common Container Classes

For page content:
```css
container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl flex flex-col gap-8
```

For single column layouts:
```css
container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col gap-8
```

## Component Styling

### Logo

```jsx
<div className="absolute top-4 left-4 z-50">
  <Link href="/" className="flex items-center">
    <div className="relative w-48 h-12 md:w-56 md:h-14 lg:w-64 lg:h-16 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md border border-amber-100 hover:bg-white transition-colors">
      <Image
        src="/images/ponyclub_logo.png"
        alt="Acheron River Excursion"
        fill
        className="object-contain p-1"
      />
      <div className="absolute -inset-[0.5px] -z-10 rounded-lg bg-gradient-to-r from-amber-200/20 via-[#6b8362]/30 to-transparent blur-sm"></div>
    </div>
  </Link>
</div>
```

Key features:
- Semi-transparent white background
- Subtle border
- Backdrop blur
- Gradient glow effect
- Responsive sizing

### Hero Section

```jsx
<div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] mt-16">
  <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden shadow-xl border border-amber-200/30">
    <Image
      src={heroImageSrc}
      alt={heroImageAlt}
      fill
      className="object-cover object-[center_20%]"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
  </div>
  
  <div className="absolute inset-0 flex items-start justify-center pt-10 md:pt-16">
    <div className="relative bg-amber-800/40 px-8 py-6 rounded-2xl max-w-3xl shadow-xl border-2 border-amber-200/50 backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-300">
      <h1 className={`${robotoSlab.variable} font-roboto-slab text-amber-50 text-4xl md:text-5xl lg:text-6xl text-center leading-tight font-bold px-4`}>
        <span className="block mb-2 drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{title}</span>
        <span className="block font-extrabold tracking-wide text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]">{subtitle}</span>
      </h1>
      <div className="absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-b from-amber-200/20 to-transparent blur-sm"></div>
    </div>
  </div>
</div>
```

Key features:
- Full-width/height image with subtle overlay gradient
- Semi-transparent title box with backdrop blur
- Text with drop shadows for legibility
- Hover effect on title box (subtle scale)
- Bordered container with shadow

### Hero Bottom Text Banner

```jsx
<div className="relative mx-4 -mt-8 z-20">
  <div className="bg-white/90 backdrop-blur-sm py-4 px-6 rounded-lg shadow-lg border border-amber-100 max-w-3xl mx-auto">
    <p className={`${robotoSlab.variable} font-roboto-slab text-lg md:text-xl text-center text-amber-800`}>
      {descriptionTitle}
    </p>
    <div className="absolute -inset-[0.5px] -z-10 rounded-lg bg-gradient-to-r from-amber-200/30 via-[#6b8362]/20 to-amber-200/30 blur-sm"></div>
  </div>
</div>
```

Key features:
- Negative margin to overlap with hero
- Semi-transparent white background with blur
- Shadow and border
- Glow effect behind

### Content Sections

Standard content section styling:
```jsx
<div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
  <h2 className={`${robotoSlab.variable} font-roboto-slab text-2xl font-bold text-amber-800 mb-4 relative inline-block`}>
    {sectionTitle}
    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
  </h2>
  <div className="prose max-w-none text-gray-700">
    {sectionContent}
  </div>
  <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
</div>
```

Key features:
- Semi-transparent white background
- Border and shadow with hover effect
- Gradient glow behind the container
- Section headings with gradient underline

### Program Cards

```jsx
<div className="program-card frosted-card bg-[#c27a5f] relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300">
  <div className="absolute inset-0 bg-pattern opacity-20 mix-blend-overlay"></div>
  <div className="relative m-4 p-6 backdrop-blur-md bg-white/30 border border-white/25 rounded-xl shadow-xl flex flex-col items-center text-stone-800">
    <div className="absolute -inset-[1px] -z-10 rounded-xl bg-gradient-to-tr from-[#c27a5f]/30 via-white/40 to-[#c27a5f]/30 blur-[2px]"></div>
    <h3 className="gradient-text text-2xl mb-4 font-bold animate-text-shine">PROGRAM 1</h3>
    <ul className="space-y-1 mb-4 text-center">
      <li className="drop-shadow-sm">Rafting: 30 minutes</li>
      <li className="drop-shadow-sm">Riding: 10-15 minutes</li>
      <li className="drop-shadow-sm mb-4">Hiking canyon crossing</li>
    </ul>
    <p className="text-2xl font-bold">20 € adults</p>
    <p className="text-sm text-gray-600 mt-2">10 € children under 12 years old</p>
  </div>
</div>
```

Program card colors:
- Program 1: `bg-[#c27a5f]` (terracotta)
- Program 2: `bg-[#6b8362]` (green)

Key features:
- Nested card design (outer and inner elements)
- Hover scale and shadow effects
- Gradient text with animation
- Semi-transparent layering
- Centered content for emphasis

### Information Cards

For "What's Included" or "What to Bring" sections:

```jsx
<div className="relative bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-amber-100/70 hover:shadow-xl transition-shadow duration-300">
  <h3 className="text-xl font-bold text-[#c27a5f] mb-3 relative inline-block">
    What's Included
    <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c27a5f]/50 to-transparent"></div>
  </h3>
  <ul className="list-disc list-inside space-y-2">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
  <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#c27a5f]/20 blur-sm"></div>
</div>
```

Key features:
- Semi-transparent background
- Subtle hover effect (shadow)
- Gradient underline for headings
- List styling with proper spacing
- Gradient glow behind

### Contact Information

```jsx
<div className="relative bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-amber-100/70 transform rotate-1 hover:shadow-2xl transition-shadow duration-300">
  <h2 className="text-center text-3xl mb-6 font-bold text-[#6b8362] relative inline-block w-full">
    {title}
    <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
  </h2>
  
  <div className="space-y-4">
    <!-- Content sections with icons -->
  </div>
  
  <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
</div>
```

Key features:
- Subtle rotation for visual interest
- Icon-based information display
- Structured spacing for readability
- Consistent styling with other components

### Maps and Images

```jsx
<div className="relative h-[400px] w-full rounded-lg shadow-xl overflow-hidden border border-amber-100/70 hover:shadow-2xl transition-shadow duration-300">
  <iframe
    src={mapUrl}
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Google Map of Acheron Adventures"
  ></iframe>
  <div className="absolute inset-0 pointer-events-none border rounded-lg border-amber-200/30"></div>
</div>
```

For images with a lightbox effect:
```jsx
<div 
  className="relative w-full h-[400px] cursor-pointer rounded-xl overflow-hidden shadow-xl border border-amber-100/70 hover:shadow-2xl transition-all duration-300"
  onClick={() => setIsModalOpen(true)}
>
  <Image 
    src="/images/image.jpg" 
    alt="Image description" 
    fill 
    className="object-contain"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent"></div>
</div>
```

## Animation Effects

The site uses several animation effects for interactivity:

### Hover Effects

- Scale transform: `hover:scale-[1.03]`
- Shadow enhancement: `hover:shadow-xl` or `hover:shadow-2xl`
- Background change: `hover:bg-white`
- Combined transitions: `transition-all duration-300` or `transition-transform duration-200`

### Text Animation

Gradient text animation (for headings):
```css
.animate-text-shine {
  background-size: 200% auto;
  animation: textShine 4s ease-in-out infinite;
}

@keyframes textShine {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## Layout Patterns

### Grid Layouts

Two-column layout for information cards:
```jsx
<div className="grid md:grid-cols-2 gap-6 mt-4">
  {/* Content */}
</div>
```

Flexible column layout:
```jsx
<div className="flex flex-col md:flex-row justify-center items-stretch gap-6 px-4 md:px-8 mt-8">
  <div className="md:w-1/2">
    {/* Content */}
  </div>
  <div className="md:w-1/2 mt-6 md:mt-0">
    {/* Content */}
  </div>
</div>
```

## Styling Techniques

### Layered Background Effects

Creating a gradient glow effect behind elements:
```jsx
<div className="relative">
  {/* Main content */}
  <div className="absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-tr from-amber-200/20 via-white/50 to-[#6b8362]/20 blur-sm"></div>
</div>
```

### Semi-Transparent Elements with Blur

For a frosted glass effect:
```jsx
<div className="bg-white/80 backdrop-blur-sm">
  {/* Content */}
</div>
```

### Gradient Underlines

For section headers:
```jsx
<h2 className="relative inline-block">
  Section Title
  <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6b8362]/70 to-transparent"></div>
</h2>
```

## Responsive Design

The site follows these responsive breakpoints:
- Default (mobile): Base styling
- sm: 640px and above
- md: 768px and above
- lg: 1024px and above
- xl: 1280px and above

Common responsive patterns:
- Font sizes: `text-2xl md:text-3xl lg:text-4xl`
- Padding: `p-4 md:p-6 lg:p-8`
- Margin: `mt-6 md:mt-8 lg:mt-10`
- Layout switches: `flex-col md:flex-row`
- Widths: `w-full md:w-1/2`

## Adding New Pages

When creating new pages:

1. Use the `ActivityPageLayout` component for consistent layout structure
2. Follow the examples in existing pages like `kayak-rafting`, `riding`, and `trekking`
3. Maintain the same design language with semi-transparent cards, gradients, and subtle animations
4. Use the color palette consistently (green, terracotta, sand/cream)
5. Structure content with appropriate spacing and hierarchy

## Best Practices

1. **Maintain consistency** across all pages
2. **Reuse existing patterns** rather than creating new ones
3. **Keep animations subtle** and purposeful
4. **Preserve the natural theme** with earth tones and organic shapes
5. **Test responsive layouts** at all breakpoints
6. **Use layering effects** to create depth without overwhelming the content
7. **Optimize images** for performance while maintaining quality 