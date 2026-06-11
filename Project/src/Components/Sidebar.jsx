import React from 'react';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const links = ['Dashboard', 'AI Planner', 'Resource Hub'];
  
  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col justify-between p-6 text-white fixed left-0 top-0">
      <div>
        <div className="flex items-center space-x-2 mb-10">
          <span className="text-2xl">🎯</span>
          <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">EduGuide AI</h1>
        </div>
        
        <nav className="space-y-2">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => setCurrentTab(link)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                currentTab === link 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {link}
            </button>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-800 pt-4">
        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Profile</p>
        <p className="text-sm font-semibold text-gray-200 mt-1">Yash Jaiswal</p>
        <span className="inline-block bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded mt-1 border border-blue-500/20">
          SDE Intern
        </span>
      </div>
    </div>
  );
}