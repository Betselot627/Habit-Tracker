import { CheckCircle, Circle, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { getCategoryColor } from "../styles/colors";

const HabitCard = ({ habit, onToggle, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const isCompletedToday = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    return habit.completedDates.some(
      (date) => new Date(date).setHours(0, 0, 0, 0) === today,
    );
  };

  const completed = isCompletedToday();
  const categoryStyle = getCategoryColor(habit.category || "Productivity");

  const getFrequencyLabel = () => {
    if (habit.frequency === "custom" && habit.customDays) {
      return `Every ${habit.customDays} days`;
    }
    return habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all border ${
        completed
          ? "border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/20"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={() => onToggle(habit._id)}
            className={`mt-1 transition-all flex-shrink-0 hover:scale-110 ${
              completed
                ? "text-green-600 dark:text-green-400"
                : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
            }`}
          >
            {completed ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-gray-900 dark:text-white mb-1 text-base md:text-lg ${
                completed ? "line-through opacity-60" : ""
              }`}
            >
              {habit.name}
            </h3>
            {habit.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                {habit.description}
              </p>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${categoryStyle.light} ${categoryStyle.dark}`}
              >
                <span>{categoryStyle.icon}</span>
                <span>{habit.category}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                📅 {getFrequencyLabel()}
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-20 overflow-hidden">
                <button
                  onClick={() => {
                    onDelete(habit._id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
