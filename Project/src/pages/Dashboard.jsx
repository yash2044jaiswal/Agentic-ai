import React from 'react';

export default function Dashboard() {
  const tasks = [
    { id: 1, text: "Review Operating Systems Indexing", checked: false },
    { id: 2, text: "Audit Memory Management Pipelines", checked: true },
    { id: 3, text: "Validate Distributed Cache Sync", checked: false },
    { id: 4, text: "Optimize ML Feature Extraction", checked: false }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 ml-64">
      {/* Top Bar Header */}
      <div className="flex justify-between items-center border-b border-gray-800 pb-5 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-gray-400 mt-1">Welcome back, Yash! 👋</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-semibold text-green-400 tracking-wide">Microsoft IQ Connected</span>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-6">Overview of your current goals, progress, and focus tasks.</p>

      {/* Grid Cards layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Goals</p>
          <p className="text-3xl font-bold text-white mt-2">2</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tasks Finished</p>
          <p className="text-3xl font-bold text-green-400 mt-2">85%</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Foundry IQ Accuracy</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">99%</p>
        </div>
      </div>

      {/* Focus Tasks Section */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-4">Today's Focus Tasks</h3>
        <p className="text-xs text-gray-400 mb-4">Engineering topics to keep on your radar today.</p>
        
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center space-x-3 bg-gray-950 p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition">
              <input 
                type="checkbox" 
                defaultChecked={task.checked}
                className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500"
              />
              <span className={`text-sm ${task.checked ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}