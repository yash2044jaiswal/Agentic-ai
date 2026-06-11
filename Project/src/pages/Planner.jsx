import { useState } from "react";

const LoadingPanel = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-xl shadow-slate-900/40 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 animate-pulse rounded-full bg-cyan-500/20 ring-1 ring-cyan-400/30"></div>
        <div>
          <h2 className="text-lg font-semibold text-white">Generating your study path</h2>
          <p className="text-sm text-slate-400">This may take a moment while AI builds a plan based on your goal.</p>
        </div>
      </div>
    </div>
  );
};

const Planner = () => {
  const [goalName, setGoalName] = useState("");
  const [daysRemaining, setDaysRemaining] = useState(30);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const dropped = event.dataTransfer.files?.[0] ?? null;
    if (dropped) setFile(dropped);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Study Planner</p>
            <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Create your personalized study path</h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-300">
            Enter your exam goal, remaining days, and upload your syllabus or study materials to generate a study plan with AI.
          </p>
        </div>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <label className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/20">
            <span className="text-sm font-medium text-slate-300">Exam / Goal Name</span>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g. Final Math Exam, GRE, Project Deadline"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              required
            />
          </label>

          <label className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/20">
            <span className="text-sm font-medium text-slate-300">Days Remaining</span>
            <input
              type="number"
              value={daysRemaining}
              onChange={(e) => setDaysRemaining(Number(e.target.value))}
              min={1}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              required
            />
          </label>

          <div
            className={`rounded-3xl border-2 ${dragActive ? "border-cyan-400" : "border-white/10"} bg-slate-950/80 p-5 transition shadow-lg shadow-slate-950/20`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300">
                <span className="text-2xl">📁</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Drag & Drop or Upload</p>
                <p className="text-sm text-slate-400">Upload study materials or syllabus PDFs for smarter planning.</p>
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="syllabus-upload"
              />
              <label
                htmlFor="syllabus-upload"
                className="cursor-pointer rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/15"
              >
                Choose a file
              </label>
              <p className="text-sm text-slate-400">
                {file ? `Selected file: ${file.name}` : "No file selected yet."}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-4 text-base font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:scale-[1.01] hover:shadow-cyan-500/30"
          >
            Generate AI Study Path
          </button>
        </form>

        <LoadingPanel loading={loading} />
      </div>
    </main>
  );
};

export default Planner;
