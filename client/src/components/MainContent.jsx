import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import api from "../api/axios";
import HabitCard from "./HabitCard";
import NewHabitModal from "./NewHabitModal";
import Button from "./Button";
import { getCategoryColor } from "../styles/colors";

const MainContent = ({ selectedDate }) => {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const filters = [
    { name: "All", color: "red", icon: "🌟" },
    { name: "Well Being", icon: "💖" },
    { name: "Health", icon: "💪" },
    { name: "Productivity", icon: "⚡" },
    { name: "Learning", icon: "📚" },
  ];

  useEffect(() => {
    fetchHabits();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [habits, activeFilter]);

  const fetchHabits = async () => {
    try {
      const { data } = await api.get("/habits");
      setHabits(data);
    } catch (err) {
      console.error("Failed to fetch habits", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (activeFilter === "All") {
      setFilteredHabits(habits);
    } else {
      setFilteredHabits(habits.filter((h) => h.category === activeFilter));
    }
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await api.post(`/habits/${id}/toggle`);
      setHabits(habits.map((h) => (h._id === id ? data : h)));
    } catch (err) {
      console.error("Failed to toggle habit", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this habit?")) return;
    try {
      await api.delete(`/habits/${id}`);
      setHabits(habits.filter((h) => h._id !== id));
    } catch (err) {
      console.error("Failed to delete habit", err);
    }
  };

  const handleAddHabit = async (habitData) => {
    try {
      console.log("Creating habit with data:", habitData);
      const { data } = await api.post("/habits", habitData);
      console.log("Habit created successfully:", data);
      setHabits([...habits, data]);
      setShowModal(false);
    } catch (err) {
      console.error("Failed to add habit:", err);
      console.error("Error response:", err.response?.data);
      alert(
        `Failed to create habit: ${err.response?.data?.message || err.message}`,
      );
    }
  };

  const isCompletedToday = (habit) => {
    const today = selectedDate.setHours(0, 0, 0, 0);
    return habit.completedDates.some(
      (date) => new Date(date).setHours(0, 0, 0, 0) === today,
    );
  };

  const activeHabits = filteredHabits.filter((h) => !isCompletedToday(h));
  const completedHabits = filteredHabits.filter((h) => isCompletedToday(h));

  const getFilterButtonClass = (filterName) => {
    const isActive = activeFilter === filterName;

    if (filterName === "All") {
      return isActive
        ? "bg-slate-700 hover:bg-slate-800 text-white shadow-md"
        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700";
    }

    const categoryColor = getCategoryColor(filterName);
    return isActive
      ? `${categoryColor.button} shadow-md`
      : `bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen lg:ml-64 lg:mr-80 transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="lg:ml-64 lg:mr-80 min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8 pb-20 lg:pb-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your daily habits and build consistency
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setActiveFilter(filter.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${getFilterButtonClass(
                  filter.name,
                )}`}
              >
                <span className="text-base">{filter.icon}</span>
                <span className="text-sm">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* New Habit Button */}
        <div className="mb-6">
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => setShowModal(true)}
            fullWidth={false}
          >
            New Habit
          </Button>
        </div>

        {/* Active Habits */}
        {activeHabits.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              Active Habits ({activeHabits.length})
            </h3>
            <div className="space-y-3">
              {activeHabits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Habits */}
        {completedHabits.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Completed ({completedHabits.length})
            </h3>
            <div className="space-y-3">
              {completedHabits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {filteredHabits.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No habits found. Create your first habit to get started!
            </p>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => setShowModal(true)}
            >
              Create Your First Habit
            </Button>
          </div>
        )}
      </div>

      {showModal && (
        <NewHabitModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddHabit}
        />
      )}
    </div>
  );
};

export default MainContent;
