import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";

// baki pages...

export default function App() {
  const [currentTab, setCurrentTab] = useState("Dashboard");

  return (
    <div className="bg-gray-950 min-h-screen font-sans antialiased">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      {currentTab === "Dashboard" && <Dashboard />}
      {/* baki tabs ka logic */}
    </div>
  );
}