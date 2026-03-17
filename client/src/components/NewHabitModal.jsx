import { useState } from "react";
import { X, Target, FileText, Clock } from "lucide-react";
import Button from "./Button";
import { getCategoryColor } from "../styles/colors";

const categories = ["Well Being", "Health", "Productivity", "Learning"];

const NewHabitModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeGoal, setTimeGoal] = useState("");
  const [category, setCategory] = useState("Well Being");
  const [frequency, setFrequency] = useState("daily");
  const [customDays, setCustomDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setName("");
    setDescription("");
    setTimeGoal("");
    setCategory("Well Being");
    setFrequency("daily");
    setCustomDays("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Habit name is required.");
      return;
    }
    if (frequency === "custom" && (!customDays || Number(customDays) <= 0)) {
      setError("Please enter a valid number of days.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const habitData = {
        name: name.trim(),
        description: description.trim(),
        timeGoal: timeGoal.trim(),
        category,
        frequency,
      };
      if (frequency === "custom") habitData.customDays = parseInt(customDays);
      await onAdd(habitData);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create habit. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition";

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1f2937] rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            New Habit
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          {error && (
            <div className="px-4 py-3 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Habit Name
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Morning Run"
                className={`${inputClass} pl-10`}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Description (optional)
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-blue-500" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Short description..."
                className={`${inputClass} pl-10 resize-none`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Time Goal (optional)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
              <input
                type="text"
                value={timeGoal}
                onChange={(e) => setTimeGoal(e.target.value)}
                placeholder="e.g., 30 minutes"
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const cs = getCategoryColor(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition-all border ${
                      category === cat
                        ? `${cs.button} text-white border-transparent shadow-md`
                        : `${cs.light} hover:opacity-80`
                    }`}
                  >
                    <span>{cs.icon}</span>
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className={inputClass}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Days</option>
            </select>
            {frequency === "custom" && (
              <input
                type="number"
                min="1"
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                placeholder="Number of days (e.g., 3)"
                className={`${inputClass} mt-2`}
              />
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handleClose}
              fullWidth
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Habit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewHabitModal;
