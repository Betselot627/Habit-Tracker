// Professional Color System
export const colors = {
  // Primary Colors (Red)
  primary: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // Category Colors
  categories: {
    wellBeing: {
      light: "bg-rose-50 text-rose-700 border-rose-200",
      dark: "dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900",
      button: "bg-rose-600 hover:bg-rose-700 text-white",
      icon: "💖",
    },
    health: {
      light: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dark: "dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900",
      button: "bg-emerald-700 hover:bg-emerald-800 text-white",
      icon: "💪",
    },
    productivity: {
      light: "bg-red-50 text-red-700 border-red-200",
      dark: "dark:bg-red-950/50 dark:text-red-300 dark:border-red-900",
      button: "bg-red-600 hover:bg-red-700 text-white",
      icon: "⚡",
    },
    learning: {
      light: "bg-violet-50 text-violet-700 border-violet-200",
      dark: "dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-900",
      button: "bg-violet-600 hover:bg-violet-700 text-white",
      icon: "📚",
    },
  },

  // Button Styles
  buttons: {
    primary:
      "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm hover:shadow-md transition-all duration-200",
    secondary:
      "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 text-gray-900 dark:text-white transition-all duration-200",
    danger:
      "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm hover:shadow-md transition-all duration-200",
    success:
      "bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white shadow-sm hover:shadow-md transition-all duration-200",
    ghost:
      "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200",
    outline:
      "border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200",
  },
};

export const getCategoryColor = (category) => {
  const categoryMap = {
    "Well Being": "wellBeing",
    Health: "health",
    Productivity: "productivity",
    Learning: "learning",
  };

  const key = categoryMap[category] || "productivity";
  return colors.categories[key];
};
