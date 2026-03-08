import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ProgressChart = ({ habits }) => {
  const { isDark } = useContext(ThemeContext);

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const getChartData = () => {
    const days = getLast7Days();
    return days.map((date) => {
      const dayStr = date.toLocaleDateString("en-US", { weekday: "short" });
      const completions = habits.reduce((acc, habit) => {
        const completed = habit.completedDates.some(
          (d) => new Date(d).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0),
        );
        return acc + (completed ? 1 : 0);
      }, 0);
      return { day: dayStr, completions };
    });
  };

  const data = getChartData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#374151" : "#e5e7eb"}
        />
        <XAxis dataKey="day" stroke={isDark ? "#9ca3af" : "#6b7280"} />
        <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: "none",
            borderRadius: "8px",
            color: isDark ? "#ffffff" : "#000000",
          }}
        />
        <Line
          type="monotone"
          dataKey="completions"
          stroke="#dc2626"
          strokeWidth={3}
          dot={{ fill: "#dc2626", r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
