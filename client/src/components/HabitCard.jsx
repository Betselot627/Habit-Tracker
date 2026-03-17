import {
  CheckCircle,
  Circle,
  MoreVertical,
  Trash2,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import { getCategoryColor } from "../styles/colors";

const HabitCard = ({ habit, onToggle, onDelete, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);
  const [editDesc, setEditDesc] = useState(habit.description || "");
  const [error, setError] = useState("");

  const isCompletedToday = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    return habit.completedDates.some(
      (d) => new Date(d).setHours(0, 0, 0, 0) === today,
    );
  };

  const completed = isCompletedToday();
  const categoryStyle = getCategoryColor(habit.category || "Productivity");

  const handleSave = async () => {
    if (!editName.trim()) {
      setError("Name cannot be empty.");
      return;
    }
    try {
      setError("");
      await onEdit(habit._id, {
        name: editName.trim(),
        description: editDesc.trim(),
      });
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save. Try again.");
    }
  };

  const handleCancel = () => {
    setEditName(habit.name);
    setEditDesc(habit.description || "");
    setError("");
    setEditing(false);
  };

  return (
    <div
      className={`rounded-xl p-4 md:p-5 transition-all border ${
        completed
          ? "bg-green-50 dark:bg-green-900/10 border-green-300 dark:border-green-500/40"
          : "bg-white dark:bg-[#1f2937] border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {!editing && (
            <button
              onClick={() => onToggle(habit._id)}
              className={`mt-1 shrink-0 transition-all hover:scale-110 ${
                completed
                  ? "text-green-500"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              {completed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
          )}

          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="space-y-2">
                <input
                  autoFocus
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-semibold"
                  placeholder="Habit name"
                />
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm resize-none"
                  placeholder="Description (optional)"
                />
                {error && (
                  <p className="text-red-500 dark:text-red-400 text-xs">
                    {error}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition"
                  >
                    <Check className="w-3.5 h-3.5" /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-medium transition"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3
                  className={`font-semibold text-base mb-1 ${completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"}`}
                >
                  {habit.name}
                </h3>
                {habit.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                    {habit.description}
                  </p>
                )}
                {habit.timeGoal && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50 mb-2">
                    ⏱ {habit.timeGoal}
                  </span>
                )}
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${categoryStyle.light}`}
                  >
                    <span>{categoryStyle.icon}</span>
                    <span>{habit.category}</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {!editing && (
          <div className="relative shrink-0">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#1f2937] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                  <button
                    onClick={() => {
                      setEditing(true);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
                  >
                    <Pencil className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(habit._id);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition text-sm"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitCard;
