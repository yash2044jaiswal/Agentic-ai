import React from "react";

const TopBar = () => {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm px-6 py-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">Welcome back, Yash! 👋</p>
      </div>
      <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 border border-slate-200 text-sm font-medium text-slate-700">
        <span>Microsoft IQ Connected</span>
        <span className="ml-2 text-green-500">🟢</span>
      </div>
    </div>
  );
};

export default TopBar;
