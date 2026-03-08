import { Grid } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { getCategoryColor } from "../styles/colors";

const AreasView = () => {
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

  const getCategoryCount = (category) => {
    return habits.filter((h) => h.category === category).length;
  };

  const areas = [
    { name: "Well Being" },
    { name: "Health" },
    { name: "Productivity" },
    { name: "Learning" },
  ];

  return (
    <div className="lg:ml-64 lg:mr-80 min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8 pb-20 lg:pb-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <Grid className="w-8 h-8 text-red-600" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Habit Areas
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
          Organize your habits into different life areas for better tracking and
          balance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {areas.map((area) => {
            const colorStyle = getCategoryColor(area.name);
            const count = getCategoryCount(area.name);
            return (
              <div
                key={area.name}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group"
              >
                <div
                  className={`inline-flex p-4 rounded-xl mb-4 ${colorStyle.light} ${colorStyle.dark} border ${colorStyle.light.replace("bg-", "border-")}`}
                >
                  <span className="text-3xl">{colorStyle.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {area.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {count}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {count === 1 ? "habit" : "habits"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AreasView;
