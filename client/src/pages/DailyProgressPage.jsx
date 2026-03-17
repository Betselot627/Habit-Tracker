import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../api/axios";

const dailyData = (habit, days = 30) => {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const completed = habit.completedDates.some(
      (cd) => new Date(cd).setHours(0, 0, 0, 0) === d.getTime(),
    );
    result.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      completed: completed ? 1 : 0,
    });
  }
  return result;
};

const DailyProgressPage = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/habits")
      .then(({ data }) => setHabits(data))
      .catch(() => setError("Failed to load habits."))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="lg:ml-64 min-h-screen bg-gray-50 dark:bg-[#111827] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );

  return (
    <div className="lg:ml-64 min-h-screen bg-gray-50 dark:bg-[#111827] p-4 md:p-8 pb-24 lg:pb-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Daily Progress
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Last 30 days — per habit
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        {habits.length === 0 && !error && (
          <div className="text-center py-16 bg-white dark:bg-[#1f2937] rounded-2xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No habits found. Create some habits first.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {habits.map((habit) => (
            <div
              key={habit._id}
              className="bg-white dark:bg-[#1f2937] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <h3 className="text-gray-900 dark:text-white font-semibold mb-1">
                {habit.name}
              </h3>
              {habit.timeGoal && (
                <span className="text-xs text-blue-600 dark:text-blue-300">
                  ⏱ {habit.timeGoal}
                </span>
              )}
              <div className="mt-4 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dailyData(habit)}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      interval={4}
                    />
                    <YAxis
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      domain={[0, 1]}
                      ticks={[0, 1]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                      }}
                      formatter={(v) => [v === 1 ? "Done" : "Missed", ""]}
                    />
                    <Bar
                      dataKey="completed"
                      fill="#3b82f6"
                      radius={[3, 3, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyProgressPage;
