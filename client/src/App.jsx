import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import RightSidebar from "./components/RightSidebar";
import DailyProgressPage from "./pages/DailyProgressPage";
import WeeklyProgressPage from "./pages/WeeklyProgressPage";
import YearlyProgressPage from "./pages/YearlyProgressPage";
import api from "./api/axios";

function App() {
  const { user, loading } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);
  const [activeSection, setActiveSection] = useState("habits");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (user) fetchHabits();
  }, [user]);

  const fetchHabits = async () => {
    try {
      const { data } = await api.get("/habits");
      setHabits(data);
    } catch (err) {
      console.error("Failed to fetch habits", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#111827]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return showLogin ? (
      <Login onToggle={() => setShowLogin(false)} />
    ) : (
      <Register onToggle={() => setShowLogin(true)} />
    );
  }

  const showRightSidebar = activeSection === "habits";

  const renderContent = () => {
    switch (activeSection) {
      case "habits":
        return (
          <MainContent selectedDate={selectedDate} onHabitsChange={setHabits} />
        );
      case "daily":
        return <DailyProgressPage />;
      case "weekly":
        return <WeeklyProgressPage />;
      case "yearly":
        return <YearlyProgressPage />;
      default:
        return (
          <MainContent selectedDate={selectedDate} onHabitsChange={setHabits} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111827]">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {renderContent()}
      {showRightSidebar && (
        <RightSidebar
          habits={habits}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      )}
    </div>
  );
}

export default App;
