import { Home, BarChart2, Grid, LogOut, User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { logout, user } = useContext(AuthContext);

  const menuItems = [
    { id: "habits", label: "All Habits", icon: <Home className="w-5 h-5" /> },
    {
      id: "statistics",
      label: "Statistics",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    { id: "areas", label: "Areas", icon: <Grid className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white dark:bg-gray-900 h-screen fixed left-0 top-0 flex-col shadow-xl border-r border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Habit Tracker
              </h1>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 ml-13">
            Build better habits daily
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeSection === item.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 space-y-2 border-t border-gray-200 dark:border-gray-800">
          {/* User Info */}
          <div className="px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Logged in as
                </p>
                <p className="text-sm text-gray-900 dark:text-white font-semibold truncate">
                  {user?.name}
                </p>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme
            </span>
            <ThemeToggle variant="switch" />
          </div>

          {/* Sign Out Button */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 shadow-2xl">
        <div className="flex justify-around items-center py-2 px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                activeSection === item.id
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
          <div className="flex flex-col items-center gap-1 px-3 py-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
