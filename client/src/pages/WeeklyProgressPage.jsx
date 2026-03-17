import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../api/axios";

const weeklyData = (habits, weeks = 12) => {
  const now = new Date();
  return Array.from({ length: weeks }, (_, i) => {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (weeks - 1 - i) * 7 - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    let completed = 0;
    habits.forEach((habit) => {
      if (
        habit.completedDates.some((cd) => {
          const d = new Date(cd);
          return d >= weekStart && d <= weekEnd;
        })
      )
        completed++;
    });

    return {
      week: weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      rate:
        habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0,
    };
  });
};

const WeeklyProgressPage = () => {
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );

  const data = weeklyData(habits);

  return (
    <div className="lg:ml-64 min-h-screen bg-gray-50 dark:bg-[#111827] p-4 md:p-8 pb-24 lg:pb-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Weekly Progress
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Last 12 weeks — overall completion rate
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        {habits.length === 0 && !error ? (
          <div className="text-center py-16 bg-white dark:bg-[#1f2937] rounded-2xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No habits found. Create some habits first.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Habit Completion Rate (%)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                    domain={[0, 100]}
                    unit="%"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                    }}
                    formatter={(v) => [`${v}%`, "Completion Rate"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyProgressPage;
