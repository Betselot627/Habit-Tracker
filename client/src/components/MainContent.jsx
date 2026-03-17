import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import api from "../api/axios";
import HabitCard from "./HabitCard";
import NewHabitModal from "./NewHabitModal";
import Button from "./Button";

const TodayProgress = ({ completed, total }) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="bg-white dark:bg-[#1f2937] rounded-xl p-5 border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-600 dark:text-gray-300 font-medium">
          Today's Progress
        </span>
        <span className="text-gray-900 dark:text-white font-bold">
          {completed} / {total} completed
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {completed === total && total > 0 && (
        <p className="mt-3 text-green-600 dark:text-green-400 text-sm font-medium text-center">
          🎉 All habits completed for today!
        </p>
      )}
    </div>
  );
};

const MainContent = ({ selectedDate = new Date(), onHabitsChange }) => {
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const { data } = await api.get("/habits");
      setHabits(data);
      onHabitsChange?.(data);
    } catch (err) {
      setError("Failed to load habits. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  const updateHabits = (updated) => {
    setHabits(updated);
    onHabitsChange?.(updated);
  };

  const isCompletedToday = (habit) => {
    const today = new Date(selectedDate).setHours(0, 0, 0, 0);
    return habit.completedDates.some(
      (d) => new Date(d).setHours(0, 0, 0, 0) === today,
    );
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await api.post(`/habits/${id}/toggle`);
      updateHabits(habits.map((h) => (h._id === id ? data : h)));
    } catch (err) {
      console.error("Failed to toggle", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this habit?")) return;
    try {
      await api.delete(`/habits/${id}`);
      updateHabits(habits.filter((h) => h._id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleEditHabit = async (id, updates) => {
    const { data } = await api.put(`/habits/${id}`, updates);
    updateHabits(habits.map((h) => (h._id === id ? data : h)));
  };

  const handleAddHabit = async (habitData) => {
    const { data } = await api.post("/habits", habitData);
    updateHabits([...habits, data]);
    setShowModal(false);
  };

  const activeHabits = habits.filter((h) => !isCompletedToday(h));
  const completedHabits = habits.filter((h) => isCompletedToday(h));

  const dateLabel = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen lg:ml-64 lg:mr-72 bg-gray-50 dark:bg-[#111827]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="lg:ml-64 lg:mr-72 min-h-screen bg-gray-50 dark:bg-[#111827] p-4 md:p-8 pb-24 lg:pb-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {dateLabel}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Focus on today's habits
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <TodayProgress
          completed={completedHabits.length}
          total={habits.length}
        />

        <div className="mb-6">
          <Button
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => setShowModal(true)}
          >
            Add Habit
          </Button>
        </div>

        {activeHabits.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Active ({activeHabits.length})
            </h3>
            <div className="space-y-3">
              {activeHabits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEditHabit}
                />
              ))}
            </div>
          </div>
        )}

        {completedHabits.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Completed ({completedHabits.length})
            </h3>
            <div className="space-y-3">
              {completedHabits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEditHabit}
                />
              ))}
            </div>
          </div>
        )}

        {habits.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#1f2937] rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No habits yet. Create your first one!
            </p>
            <Button
              variant="primary"
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
