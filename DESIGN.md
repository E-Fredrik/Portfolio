# Design System

## Overview
Apple-inspired minimalist portfolio with refined interactions and subtle 3D depth.

## Color Palette
- **Background:** `#000000` (true black)
- **Surface:** `#0a0a0a`, `#1a1a1a` (subtle depth layers)
- **Border:** `rgba(255, 255, 255, 0.08)` (thin, subtle)
- **Text Primary:** `#ffffff` (white, 100%)
- **Text Secondary:** `#A1A1A6` (gray, medium emphasis)
- **Accent (Legacy):** `#A70947` (magenta, used sparingly)

## Typography
- **Font:** Inter, sans-serif
- **Display:** clamp(48px, 8vw, 88px), font-weight: 700, letter-spacing: -0.04em
- **Heading L:** 36px, font-weight: 700, letter-spacing: -0.03em
- **Heading M:** clamp(24px, 4vw, 32px), font-weight: 700, letter-spacing: -0.03em
- **Body:** 16px, line-height: 1.6, #A1A1A6
- **Label:** 10px, letter-spacing: 0.2em, text-transform: uppercase, monospace

## Spacing Scale
- **XS:** 4px
- **S:** 8px
- **M:** 16px
- **L:** 24px
- **XL:** 32px
- **2XL:** 48px
- **3XL:** 64px

## Border Radius
- **Cards:** 12px (Apple-inspired, not overly rounded)
- **Small elements:** 8px
- **Buttons:** 8px

## Shadows & Depth
- **None on cards** (Apple aesthetic: flat with border instead of shadow)
- **Subtle hover elevation:** transform: scale(1.01-1.02)
- **3D effects:** use perspective and transform-origin for depth

## Component Patterns

### Project Card
- Border radius: 12px
- Border: 1px solid rgba(255, 255, 255, 0.08)
- Aspect ratio: 4/3
- Base: grayscale + low brightness for contrast
- Hover: subtle scale, color reveal on cursor
- Image scale on hover: 1.05 (subtle zoom)

### Tags
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border radius: 6px
- Padding: 6px 12px
- Backdrop blur: 4px
- Background: rgba(0, 0, 0, 0.4)
- Font size: 10px

## Animation Principles
- **Duration:** 300-800ms based on distance
- **Easing:** ease-out (exponential), spring for interactive elements
- **Triggers:** scroll-into-view, hover, focus, load
- **3D:** subtle perspective, rotate on scroll, parallax depth layers
- **No motion:** reduce-motion queries respected

## States
- **Hover:** scale 1.01-1.02, border opacity increase
- **Active/Press:** scale 0.98
- **Focus:** ring outline for keyboard nav
- **Disabled:** opacity 0.5
- **Loading:** subtle spin, opacity breathing

## Responsive Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px
