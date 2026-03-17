import MiniCalendar from "./MiniCalendar";

const CircularProgress = ({ pct, completed, total }) => {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="#7c3aed"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {pct}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            done
          </span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
        {completed} of {total} habits
      </p>
    </div>
  );
};

const RightSidebar = ({ habits = [], selectedDate, onDateChange }) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const completedToday = habits.filter((h) =>
    h.completedDates?.some((d) => new Date(d).setHours(0, 0, 0, 0) === today),
  ).length;
  const total = habits.length;
  const pct = total > 0 ? Math.round((completedToday / total) * 100) : 0;

  const streakHabits = habits
    .filter((h) => h.streak > 0)
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 5);

  return (
    <div className="hidden lg:flex w-72 bg-white dark:bg-[#0f172a] h-screen fixed right-0 top-0 flex-col border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
          Calendar
        </p>
        <MiniCalendar
          selectedDate={selectedDate}
          onDateChange={onDateChange}
          habits={habits}
        />
      </div>

      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
          Today's Progress
        </p>
        <CircularProgress pct={pct} completed={completedToday} total={total} />
        {pct === 100 && total > 0 && (
          <p className="text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 -mt-2 mb-2">
            🎉 All done!
          </p>
        )}
      </div>

      <div className="p-4 flex-1">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
          Top Streaks
        </p>
        {streakHabits.length === 0 ? (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-6">
            Complete habits daily to build streaks
          </p>
        ) : (
          <div className="space-y-2">
            {streakHabits.map((h, i) => (
              <div
                key={h._id}
                className="flex items-center gap-3 bg-gray-50 dark:bg-[#1f2937] rounded-xl px-3 py-2.5 border border-gray-200 dark:border-gray-700"
              >
                <span className="text-sm font-bold text-gray-400 dark:text-gray-500 w-4 text-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {h.name}
                  </p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: Math.min(h.streak, 7) }).map(
                      (_, j) => (
                        <span
                          key={j}
                          className="w-2 h-2 rounded-full bg-orange-400"
                        />
                      ),
                    )}
                    {h.streak > 7 && (
                      <span className="text-xs text-gray-400 ml-1">
                        +{h.streak - 7}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <span>🔥</span>
                  <span className="text-sm font-bold text-orange-500">
                    {h.streak}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
