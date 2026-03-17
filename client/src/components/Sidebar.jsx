import {
  Home,
  BarChart2,
  TrendingUp,
  Calendar,
  LogOut,
  User,
  Sun,
  Moon,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { logout, user } = useContext(AuthContext);
  const { dark, toggle } = useTheme();

  const menuItems = [
    { id: "habits", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    {
      id: "daily",
      label: "Daily Progress",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      id: "weekly",
      label: "Weekly Progress",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: "yearly",
      label: "Yearly Progress",
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-white dark:bg-[#0f172a] h-screen fixed left-0 top-0 flex-col border-r border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Habit Tracker
              </h1>
              <p className="text-xs text-gray-500">Build better habits</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeSection === item.id
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 space-y-2 border-t border-gray-200 dark:border-gray-800">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-medium text-sm"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-500" />
            )}
            <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Logged in as</p>
                <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                  {user?.name}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800 z-50">
        <div className="flex justify-around items-center py-2 px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all ${
                activeSection === item.id
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-500"
              }`}
            >
              {item.icon}
              <span className="text-xs font-medium">
                {item.label.split(" ")[0]}
              </span>
            </button>
          ))}
          <button
            onClick={toggle}
            className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-gray-500"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span className="text-xs font-medium">
              {dark ? "Light" : "Dark"}
            </span>
          </button>
          <button
            onClick={logout}
            className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-gray-500"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
