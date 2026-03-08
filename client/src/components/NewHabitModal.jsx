import { useState } from "react";
import { X, Target, FileText, Calendar } from "lucide-react";
import Button from "./Button";
import { getCategoryColor } from "../styles/colors";

const NewHabitModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [customDays, setCustomDays] = useState("");
  const [category, setCategory] = useState("Well Being");
  const [loading, setLoading] = useState(false);

  const categories = [
    { name: "Well Being" },
    { name: "Health" },
    { name: "Productivity" },
    { name: "Learning" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a habit name.");
      return;
    }

    if (frequency === "custom" && (!customDays || customDays <= 0)) {
      alert("Please enter a valid number of days for custom frequency.");
      return;
    }

    const habitData = {
      name,
      description,
      frequency,
      category,
    };

    // Add customDays only if frequency is custom
    if (frequency === "custom") {
      habitData.customDays = parseInt(customDays);
    }

    setLoading(true);
    try {
      await onAdd(habitData);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto transition-all duration-300">
      <div className="bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create New Habit
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[80vh] overflow-y-auto"
        >
          {/* Habit Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Habit Name
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
              <input
                type="text"
                placeholder="e.g., Morning Exercise"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition shadow-sm hover:shadow-md"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const colorStyle = getCategoryColor(cat.name);
                const isActive = category === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? `${colorStyle.button} text-white shadow-md transform scale-105`
                        : `${colorStyle.light} ${colorStyle.dark} hover:shadow-md hover:scale-105`
                    }`}
                  >
                    <span className="text-lg">{colorStyle.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description (Optional)
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-red-500" />
              <textarea
                placeholder="Describe your habit..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition shadow-sm hover:shadow-md resize-none"
              />
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Frequency
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none transition shadow-sm hover:shadow-md"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom Days</option>
              </select>
            </div>
            {frequency === "custom" && (
              <input
                type="number"
                min="1"
                placeholder="Enter number of days"
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                className="mt-3 w-full pl-3 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition shadow-sm hover:shadow-md"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
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
