import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MiniCalendar = ({ selectedDate, onDateChange, habits = [] }) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const hasCompletion = (day) => {
    const d = new Date(year, month, day).setHours(0, 0, 0, 0);
    return habits.some((h) =>
      h.completedDates?.some((cd) => new Date(cd).setHours(0, 0, 0, 0) === d),
    );
  };

  const isSelected = (day) =>
    new Date(year, month, day).toDateString() ===
    new Date(selectedDate).toDateString();

  const isToday = (day) =>
    new Date(year, month, day).toDateString() === new Date().toDateString();

  const monthName = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white dark:bg-[#1f2937] rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <span className="text-sm font-semibold text-gray-800 dark:text-white">
          {monthName}
        </span>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
        >
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-gray-400 dark:text-gray-500 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`e-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const selected = isSelected(day);
          const today = isToday(day);
          const done = hasCompletion(day);
          return (
            <button
              key={day}
              onClick={() => onDateChange(new Date(year, month, day))}
              className={`relative mx-auto w-7 h-7 flex items-center justify-center rounded-full text-xs font-medium transition-all
                ${selected ? "bg-blue-600 text-white" : today ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
            >
              {day}
              {done && !selected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
