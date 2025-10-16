# Logistics Management Dashboard - Design Guidelines

## Design Approach

**Selected Approach:** Design System - Modern SaaS Dashboard Pattern

**Justification:** This is a utility-focused, information-dense logistics management application where efficiency, clarity, and usability are paramount. Drawing inspiration from industry-leading productivity dashboards like Linear, Notion, and Asana, combined with enterprise design systems like Material Design and Carbon Design.

**Core Design Principles:**
- Clarity over decoration: Every element serves a functional purpose
- Information hierarchy: Critical data immediately visible, supporting details accessible
- Consistent patterns: Users learn once, apply everywhere
- Performance-focused: Fast load times, smooth interactions, minimal cognitive load

---

## Color Palette

### Light Mode (Primary)
- **Background:** 0 0% 100% (pure white)
- **Surface:** 0 0% 98% (off-white cards/panels)
- **Border:** 0 0% 90% (subtle dividers)
- **Primary Brand:** 217 91% 60% (vibrant blue for CTAs, active states)
- **Primary Hover:** 217 91% 50% (darker blue)
- **Success:** 142 71% 45% (delivery completed, vehicle available)
- **Warning:** 38 92% 50% (pending orders, maintenance needed)
- **Error:** 0 84% 60% (cancelled orders, critical alerts)
- **Text Primary:** 0 0% 13% (headings, primary content)
- **Text Secondary:** 0 0% 45% (supporting text, labels)
- **Text Tertiary:** 0 0% 64% (placeholders, disabled states)

### Dark Mode
- **Background:** 222 47% 11% (deep blue-gray)
- **Surface:** 217 33% 17% (elevated cards)
- **Border:** 217 20% 25% (subtle dividers)
- **Primary Brand:** 217 91% 60% (same blue, works in both modes)
- **Text Primary:** 0 0% 98% (high contrast white)
- **Text Secondary:** 0 0% 70% (muted white)

---

## Typography

**Font Families:**
- Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Monospace: 'JetBrains Mono', 'Courier New', monospace (for order IDs, tracking numbers)

**Type Scale:**
- Display (Dashboard Titles): text-3xl font-bold (30px)
- Heading 1 (Section Headers): text-2xl font-semibold (24px)
- Heading 2 (Card Titles): text-xl font-semibold (20px)
- Body Large (Primary Content): text-base font-medium (16px)
- Body (Default Text): text-sm font-normal (14px)
- Caption (Labels, Metadata): text-xs font-medium (12px)

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (between related items): p-2, gap-2
- Component padding: p-4, p-6
- Section spacing: p-8, py-12
- Page margins: px-6 md:px-8 lg:px-12

**Grid System:**
- Dashboard layout: Sidebar (256px fixed) + Main content (fluid)
- Card grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Stat cards: grid-cols-2 lg:grid-cols-4 (KPI overview)
- Form layouts: Single column with max-w-2xl for focus

---

## Component Library

### Navigation
- **Sidebar:** Fixed left, 256px width, contains logo, main navigation, user profile
- **Top Bar:** Sticky header with breadcrumbs, search, notifications bell, user avatar
- **Tabs:** Underlined style for section switching (Orders, Drivers, Vehicles)

### Data Display
- **Stat Cards:** White/elevated surface, large number (text-3xl), label below, trend indicator (↑/↓)
- **Tables:** Striped rows on hover, sticky header, action buttons in last column, pagination at bottom
- **Status Badges:** Rounded-full px-3 py-1 with color-coded backgrounds (green=delivered, yellow=pending, blue=in-transit, red=cancelled)
- **Maps:** Embedded Google Maps with custom markers, full-width in content area, min-h-[500px]

### Forms & Inputs
- **Input Fields:** Rounded-lg border with focus ring, label above, error message below
- **Buttons Primary:** bg-primary text-white rounded-lg px-4 py-2.5 with subtle shadow
- **Buttons Secondary:** border-2 border-gray-300 rounded-lg px-4 py-2.5
- **Select Dropdowns:** Custom styled with chevron icon, matches input field design
- **Date Pickers:** Calendar overlay with range selection support

### Overlays
- **Modals:** Centered overlay with max-w-2xl, backdrop blur, slide-up animation
- **Notifications:** Toast-style, top-right corner, auto-dismiss after 5s
- **Tooltips:** Dark background, white text, arrow pointer, appear on hover

### Analytics
- **Charts:** Recharts library with consistent color scheme, gridlines off, smooth curves
- **Bar Charts:** For daily delivery counts, vertical bars with rounded tops
- **Line Charts:** For delivery time trends, gradient fill below line
- **Pie Charts:** For delivery status distribution, donut style with center label

---

## Animations

**Minimal & Purposeful:**
- Page transitions: None (instant for dashboard speed)
- Modal entrance: Slide-up with fade (200ms)
- Loading states: Pulse animation on skeleton screens
- Hover states: Scale-105 on cards (subtle lift)
- Status updates: Color transition (300ms ease)

**NO decorative animations** - this is a productivity tool where speed matters.

---

## Images

**Hero Section:** NOT applicable for this dashboard application

**Image Usage:**
- Driver avatars: Circular, 40px diameter in lists, 80px in profile views
- Vehicle photos: 16:9 aspect ratio cards in vehicle management
- Map markers: Custom SVG icons for different delivery statuses
- Empty states: Simple SVG illustrations (not photos) for "No orders yet" states