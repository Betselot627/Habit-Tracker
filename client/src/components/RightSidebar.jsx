import { Award, Calendar as CalendarIcon, Flame, X } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MiniCalendar from "./MiniCalendar";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const RightSidebar = ({ habits, selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useContext(ThemeContext);

  const calculateTodayProgress = () => {
    if (habits.length === 0) return 0;
    const today = selectedDate.setHours(0, 0, 0, 0);
    const completedToday = habits.filter((h) =>
      h.completedDates.some((d) => new Date(d).setHours(0, 0, 0, 0) === today),
    ).length;
    return Math.round((completedToday / habits.length) * 100);
  };

  const calculateStreak = () => {
    if (habits.length === 0) return 0;
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);

      const completedOnDay = habits.some((h) =>
        h.completedDates.some(
          (d) => new Date(d).setHours(0, 0, 0, 0) === checkDate.getTime(),
        ),
      );

      if (completedOnDay) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  };

  const calculatePerfectDays = () => {
    if (habits.length === 0) return 0;
    const last30Days = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      last30Days.push(date.getTime());
    }

    return last30Days.filter((day) => {
      const completedCount = habits.filter((h) =>
        h.completedDates.some((d) => new Date(d).setHours(0, 0, 0, 0) === day),
      ).length;
      return completedCount === habits.length;
    }).length;
  };

  const progress = calculateTodayProgress();
  const streak = calculateStreak();
  const perfectDays = calculatePerfectDays();

  const renderSidebarContent = () => (
    <div className="p-4 md:p-6">
      {/* Progress Ring */}
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Today's Progress
        </h3>
        <div className="w-32 h-32 md:w-40 md:h-40 mx-auto">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              textSize: "20px",
              pathColor: progress === 100 ? "#059669" : "#dc2626",
              textColor: isDark ? "#ffffff" : "#1f2937",
              trailColor: isDark ? "#374151" : "#e5e7eb",
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition">
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 md:w-10 md:h-10" />
            <div>
              <p className="text-xs md:text-sm opacity-90 font-medium">
                Current Streak
              </p>
              <p className="text-xl md:text-2xl font-bold">{streak} days</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 md:w-10 md:h-10" />
            <div>
              <p className="text-xs md:text-sm opacity-90 font-medium">
                Perfect Days
              </p>
              <p className="text-xl md:text-2xl font-bold">{perfectDays}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Calendar */}
      <div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Calendar
        </h3>
        <MiniCalendar
          habits={habits}
          selectedDate={selectedDate}
          onDateChange={onDateChange}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Right Sidebar */}
      <div className="hidden lg:block w-80 bg-white dark:bg-gray-900 h-screen fixed right-0 top-0 border-l border-gray-200 dark:border-gray-800 overflow-y-auto shadow-xl">
        {renderSidebarContent()}
      </div>

      {/* Mobile Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center z-40 transition-all hover:scale-110"
      >
        <CalendarIcon className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center z-10">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Progress & Calendar
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
