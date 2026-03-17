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

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const yearlyData = (habits) => {
  const year = new Date().getFullYear();
  return MONTHS.map((month, i) => {
    let completed = 0;
    habits.forEach((habit) => {
      habit.completedDates.forEach((cd) => {
        const d = new Date(cd);
        if (d.getFullYear() === year && d.getMonth() === i) completed++;
      });
    });
    return { month, completed };
  });
};

const YearlyProgressPage = () => {
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );

  const data = yearlyData(habits);
  const totalCompletions = data.reduce((s, d) => s + d.completed, 0);
  const bestMonth = data.reduce(
    (best, d) => (d.completed > best.completed ? d : best),
    data[0],
  );

  return (
    <div className="lg:ml-64 min-h-screen bg-gray-50 dark:bg-[#111827] p-4 md:p-8 pb-24 lg:pb-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Yearly Progress
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {new Date().getFullYear()} — monthly completions
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              Total Completions
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {totalCompletions}
            </p>
          </div>
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              Best Month
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {bestMonth?.completed > 0 ? bestMonth.month : "—"}
            </p>
          </div>
        </div>

        {habits.length === 0 && !error ? (
          <div className="text-center py-16 bg-white dark:bg-[#1f2937] rounded-2xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No habits found. Create some habits first.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1f2937] rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
              Completions by Month
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#6b7280", fontSize: 11 }}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280", fontSize: 11 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                    }}
                    formatter={(v) => [v, "Completions"]}
                  />
                  <Bar
                    dataKey="completed"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearlyProgressPage;
