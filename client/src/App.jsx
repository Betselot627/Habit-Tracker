import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import RightSidebar from "./components/RightSidebar";
import StatisticsView from "./components/StatisticsView";
import AreasView from "./components/AreasView";
import api from "./api/axios";

function App() {
  const { user, loading } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);
  const [activeSection, setActiveSection] = useState("habits");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600"></div>
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

  const renderContent = () => {
    switch (activeSection) {
      case "habits":
        return <MainContent selectedDate={selectedDate} />;
      case "statistics":
        return <StatisticsView />;
      case "areas":
        return <AreasView />;
      default:
        return <MainContent selectedDate={selectedDate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {renderContent()}
      <RightSidebar
        habits={habits}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
    </div>
  );
}

export default App;
