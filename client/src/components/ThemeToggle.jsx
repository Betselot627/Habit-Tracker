import { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = ({ variant = "button" }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  if (variant === "switch") {
    return (
      <button
        onClick={toggleTheme}
        className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 bg-gray-200 dark:bg-gray-700"
        aria-label="Toggle theme"
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white dark:bg-gray-900 transition-transform shadow-lg ${
            isDark ? "translate-x-7" : "translate-x-1"
          }`}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-blue-500 m-1" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-500 m-1" />
          )}
        </span>
      </button>
    );
  }

  // Default button variant
  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
