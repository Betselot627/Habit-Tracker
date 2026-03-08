# Dark Mode Implementation Guide

## Overview

This application features a comprehensive dark mode implementation with smooth transitions, localStorage persistence, and system preference detection.

## Features Implemented

### 1. Theme Toggle

- **Location**: Available in both desktop sidebar and mobile bottom navigation
- **Component**: `ThemeToggle.jsx` - Reusable component with two variants:
  - `button`: Icon button (default)
  - `switch`: Toggle switch with animated transition
- **Icons**: Sun icon for light mode, Moon icon for dark mode

### 2. Theme Persistence

- **Storage**: User preference saved in `localStorage` as `"theme"` key
- **Values**: `"light"` or `"dark"`
- **Behavior**: Theme persists across page reloads and browser sessions

### 3. System Preference Detection

- **Auto-detection**: Automatically detects OS dark mode preference on first visit
- **Media Query**: Uses `prefers-color-scheme: dark`
- **Dynamic Updates**: Listens for system theme changes and updates automatically (only if user hasn't manually set preference)

### 4. Smooth Transitions

- **Global Transitions**: All color changes animate smoothly (200ms duration)
- **CSS Implementation**: Applied via `@layer base` in `index.css`
- **Properties**: background-color, border-color, color, fill, stroke
- **Timing**: cubic-bezier(0.4, 0, 0.2, 1) for smooth easing

### 5. Flash Prevention

- **Script**: Inline script in `index.html` runs before page render
- **Purpose**: Prevents flash of unstyled content (FOUC)
- **Implementation**: Immediately applies dark class to `<html>` element

## File Structure

```
client/
├── src/
│   ├── context/
│   │   └── ThemeContext.jsx          # Theme state management
│   ├── components/
│   │   ├── ThemeToggle.jsx           # Reusable toggle component
│   │   ├── Sidebar.jsx               # Desktop/mobile navigation with theme toggle
│   │   ├── Login.jsx                 # Auth page with dark mode
│   │   ├── Register.jsx              # Auth page with dark mode
│   │   ├── MainContent.jsx           # Main dashboard with dark mode
│   │   ├── StatisticsView.jsx        # Statistics page with dark mode
│   │   ├── AreasView.jsx             # Areas page with dark mode
│   │   ├── HabitCard.jsx             # Habit cards with dark mode
│   │   ├── NewHabitModal.jsx         # Modal with dark mode
│   │   ├── RightSidebar.jsx          # Right sidebar with dark mode
│   │   ├── MiniCalendar.jsx          # Calendar with dark mode
│   │   └── ProgressChart.jsx         # Charts with dark mode
│   └── index.css                     # Global styles with transitions
├── index.html                        # FOUC prevention script
└── tailwind.config.js                # Dark mode configuration
```

## Implementation Details

### ThemeContext.jsx

```javascript
// Features:
- useState with localStorage initialization
- useEffect for DOM manipulation
- useEffect for system preference listener
- toggleTheme function
- Provides { isDark, toggleTheme } to all components
```

### ThemeToggle.jsx

```javascript
// Two variants:
1. button: Simple icon button with hover effects
2. switch: iOS-style toggle switch with sliding animation

// Usage:
<ThemeToggle />                    // Default button
<ThemeToggle variant="switch" />   // Toggle switch
```

### index.css

```css
// Global smooth transitions for theme switching
@layer base {
  * {
    transition-property: background-color, border-color, color, fill, stroke;
    transition-duration: 200ms;
  }
}
```

### index.html

```html
<!-- Prevents flash of unstyled content -->
<script>
  (function () {
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (theme === "dark" || (!theme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  })();
</script>
```

## Dark Mode Color Palette

### Backgrounds

- Light: `bg-white`, `bg-gray-50`, `bg-gray-100`
- Dark: `dark:bg-gray-950`, `dark:bg-gray-900`, `dark:bg-gray-800`

### Text

- Light: `text-gray-900`, `text-gray-700`, `text-gray-600`
- Dark: `dark:text-white`, `dark:text-gray-300`, `dark:text-gray-400`

### Borders

- Light: `border-gray-200`, `border-gray-300`
- Dark: `dark:border-gray-800`, `dark:border-gray-700`, `dark:border-gray-600`

### Interactive Elements

- Hover Light: `hover:bg-gray-100`, `hover:bg-gray-200`
- Hover Dark: `dark:hover:bg-gray-800`, `dark:hover:bg-gray-700`

### Accent Colors (Red Theme)

- Primary: `bg-red-600`, `text-red-600`
- Dark: `dark:bg-red-600`, `dark:text-red-400`
- Hover: `hover:bg-red-700`, `dark:hover:bg-red-700`

## Component-Specific Dark Mode

### Charts (Recharts)

```javascript
// Dynamic colors based on isDark state
<CartesianGrid stroke={isDark ? "#374151" : "#e5e7eb"} />
<XAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
<Tooltip contentStyle={{
  backgroundColor: isDark ? "#1f2937" : "#ffffff",
  color: isDark ? "#ffffff" : "#000000"
}} />
```

### Progress Ring (react-circular-progressbar)

```javascript
buildStyles({
  pathColor: progress === 100 ? "#059669" : "#dc2626",
  textColor: isDark ? "#ffffff" : "#1f2937",
  trailColor: isDark ? "#374151" : "#e5e7eb",
});
```

### Modals

- Backdrop: `bg-black/70 backdrop-blur-sm`
- Content: `bg-white dark:bg-gray-800`
- Smooth transitions on all elements

## Best Practices

### 1. Always Include Dark Variants

```jsx
// ✅ Good
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

// ❌ Bad
<div className="bg-white text-gray-900">
```

### 2. Use Transition Classes

```jsx
// ✅ Good
<div className="bg-white dark:bg-gray-800 transition-colors duration-300">

// ❌ Bad (abrupt color change)
<div className="bg-white dark:bg-gray-800">
```

### 3. Test Both Themes

- Always test components in both light and dark mode
- Check contrast ratios for accessibility
- Verify hover and focus states work in both themes

### 4. Use Theme Context

```jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const MyComponent = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  // Use isDark for conditional logic
  return <div>{isDark ? "Dark Mode" : "Light Mode"}</div>;
};
```

## Testing Checklist

- [ ] Theme toggle works in desktop sidebar
- [ ] Theme toggle works in mobile navigation
- [ ] Theme persists after page reload
- [ ] No flash of unstyled content on initial load
- [ ] System preference detection works
- [ ] All pages support dark mode:
  - [ ] Login
  - [ ] Register
  - [ ] Dashboard/Habits
  - [ ] Statistics
  - [ ] Areas
- [ ] All components support dark mode:
  - [ ] Sidebar
  - [ ] Habit cards
  - [ ] Modals
  - [ ] Calendar
  - [ ] Charts
  - [ ] Progress rings
- [ ] Smooth transitions on theme change
- [ ] Hover states work in both themes
- [ ] Focus states work in both themes
- [ ] Text is readable in both themes
- [ ] Proper contrast ratios maintained

## Troubleshooting

### Theme not persisting

- Check localStorage is enabled in browser
- Verify ThemeProvider wraps entire app in main.jsx

### Flash of unstyled content

- Ensure inline script in index.html runs before React
- Check script syntax is correct

### Transitions too slow/fast

- Adjust duration in index.css `@layer base`
- Modify individual component transition classes

### Charts not updating colors

- Ensure chart components use isDark from ThemeContext
- Pass dynamic colors to chart props

## Future Enhancements

1. **Multiple Themes**: Add more color schemes (blue, green, purple)
2. **Scheduled Theme**: Auto-switch based on time of day
3. **Per-Component Themes**: Allow different themes for different sections
4. **Theme Customization**: Let users customize colors
5. **Accessibility**: Add high contrast mode option
