# Quick Start - Dark Mode

## For Users

### Toggle Dark Mode

1. **Desktop**: Click the theme switch in the sidebar footer
2. **Mobile**: Tap the theme icon in the bottom navigation bar

### Features

- ✅ Your preference is saved automatically
- ✅ Works across all pages
- ✅ Smooth color transitions
- ✅ Auto-detects your system preference on first visit

## For Developers

### Using Theme in Components

```jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function MyComponent() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Current theme: {isDark ? "Dark" : "Light"}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

### Adding Dark Mode Styles

```jsx
// Basic pattern
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>

// With transitions
<div className="bg-white dark:bg-gray-800 transition-colors duration-300">
  Content
</div>

// Complete example
<div className="
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
  border border-gray-200 dark:border-gray-700
  hover:bg-gray-50 dark:hover:bg-gray-700
  transition-all duration-200
">
  Interactive content
</div>
```

### Common Patterns

#### Backgrounds

```jsx
bg-white dark:bg-gray-950          // Page background
bg-gray-50 dark:bg-gray-900        // Section background
bg-gray-100 dark:bg-gray-800       // Card background
```

#### Text

```jsx
text-gray-900 dark:text-white      // Primary text
text-gray-700 dark:text-gray-300   // Secondary text
text-gray-600 dark:text-gray-400   // Tertiary text
```

#### Borders

```jsx
border-gray-200 dark:border-gray-800   // Primary border
border-gray-300 dark:border-gray-700   // Secondary border
```

#### Interactive States

```jsx
hover:bg-gray-100 dark:hover:bg-gray-800
focus:ring-red-500 dark:focus:ring-red-400
```

### Using ThemeToggle Component

```jsx
import ThemeToggle from "./components/ThemeToggle";

// Button variant (default)
<ThemeToggle />

// Switch variant
<ThemeToggle variant="switch" />
```

### Dynamic Colors (Charts, etc.)

```jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function MyChart() {
  const { isDark } = useContext(ThemeContext);

  return (
    <Chart
      gridColor={isDark ? "#374151" : "#e5e7eb"}
      textColor={isDark ? "#9ca3af" : "#6b7280"}
    />
  );
}
```

## File Locations

```
client/
├── src/
│   ├── context/
│   │   └── ThemeContext.jsx       ← Theme state management
│   ├── components/
│   │   └── ThemeToggle.jsx        ← Reusable toggle component
│   └── index.css                  ← Global transitions
├── index.html                     ← Flash prevention
└── tailwind.config.js             ← Dark mode config
```

## Testing

1. Toggle theme and verify all pages update
2. Reload page and verify theme persists
3. Check system preference detection (clear localStorage first)
4. Verify smooth transitions on theme change
5. Test all interactive elements (buttons, inputs, etc.)

## Troubleshooting

**Theme not saving?**

- Check browser localStorage is enabled
- Open DevTools → Application → Local Storage
- Look for key "theme" with value "light" or "dark"

**Flash of white on load?**

- Verify inline script in index.html is present
- Check script runs before React loads

**Colors not changing?**

- Ensure component has `dark:` variants for all colors
- Check ThemeProvider wraps app in main.jsx
- Verify Tailwind config has `darkMode: "class"`

## Best Practices

1. ✅ Always include dark variants: `bg-white dark:bg-gray-800`
2. ✅ Add transitions: `transition-colors duration-300`
3. ✅ Test both themes during development
4. ✅ Use semantic color names (not hardcoded hex)
5. ✅ Maintain proper contrast ratios
6. ✅ Test hover and focus states in both themes

## Need Help?

See full documentation:

- `DARK_MODE_GUIDE.md` - Complete implementation guide
- `DARK_MODE_SUMMARY.md` - Feature summary
