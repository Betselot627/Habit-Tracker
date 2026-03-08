import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const MiniCalendar = ({ habits, selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isDateCompleted = (date) => {
    const checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      date,
    ).setHours(0, 0, 0, 0);

    const completedCount = habits.filter((h) =>
      h.completedDates.some(
        (d) => new Date(d).setHours(0, 0, 0, 0) === checkDate,
      ),
    ).length;

    return completedCount > 0;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    onDateChange(newDate);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h4 className="font-semibold text-gray-900 dark:text-white">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h4>
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div
            key={i}
            className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}

        {blanks.map((blank) => (
          <div key={`blank-${blank}`} className="aspect-square" />
        ))}

        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            className={`aspect-square flex items-center justify-center text-sm rounded-lg transition ${
              isSelected(day)
                ? "bg-red-600 text-white font-bold"
                : isToday(day)
                  ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 font-semibold"
                  : isDateCompleted(day)
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
