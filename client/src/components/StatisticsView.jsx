import { useState, useEffect } from "react";
import { TrendingUp, Target, Award } from "lucide-react";
import api from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatisticsView = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const { data } = await api.get("/habits");
      setHabits(data);
    } catch (err) {
      console.error("Failed to fetch habits", err);
    }
  };

  const getWeeklyData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStr = date.toLocaleDateString("en-US", { weekday: "short" });
      const completions = habits.reduce((acc, habit) => {
        const completed = habit.completedDates.some(
          (d) => new Date(d).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0),
        );
        return acc + (completed ? 1 : 0);
      }, 0);
      days.push({ day: dayStr, completions });
    }
    return days;
  };

  const getTotalCompletions = () => {
    return habits.reduce((acc, h) => acc + h.completedDates.length, 0);
  };

  const getAverageCompletion = () => {
    if (habits.length === 0) return 0;
    const total = getTotalCompletions();
    return Math.round(total / habits.length);
  };

  const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:ml-64 lg:mr-80 min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8 pb-20 lg:pb-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
          Statistics
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <StatCard
            icon={<Target className="w-6 h-6 text-red-600" />}
            title="Total Habits"
            value={habits.length}
            color="bg-red-100 dark:bg-red-950/50"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            title="Total Completions"
            value={getTotalCompletions()}
            color="bg-green-100 dark:bg-green-950/50"
          />
          <StatCard
            icon={<Award className="w-6 h-6 text-purple-600" />}
            title="Avg per Habit"
            value={getAverageCompletion()}
            color="bg-purple-100 dark:bg-purple-950/50"
          />
        </div>

        {/* Weekly Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
            Weekly Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getWeeklyData()}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.3}
              />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="completions" fill="#dc2626" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsView;
