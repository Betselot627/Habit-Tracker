export const colors = {
  categories: {
    wellBeing: {
      light:
        "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700",
      button: "bg-rose-600 hover:bg-rose-700",
      icon: "💖",
    },
    health: {
      light:
        "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
      button: "bg-emerald-600 hover:bg-emerald-700",
      icon: "💪",
    },
    productivity: {
      light:
        "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
      button: "bg-blue-600 hover:bg-blue-700",
      icon: "⚡",
    },
    learning: {
      light:
        "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700",
      button: "bg-violet-600 hover:bg-violet-700",
      icon: "📚",
    },
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
