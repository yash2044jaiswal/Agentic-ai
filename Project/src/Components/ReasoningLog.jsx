import React from 'react';

const ReasoningLog = ({ steps = [] }) => {
  const formatStep = (step) => {
    if (typeof step === 'string') return { label: step };
    return step || { label: 'Unnamed step' };
  };

  return (
    <div className="bg-gray-900 text-green-400 font-mono rounded-2xl shadow-2xl p-6 max-w-3xl mx-auto">
      <div className="mb-4 text-xs uppercase tracking-[0.3em] text-green-300">
        Microsoft Foundry IQ Engine
      </div>

      <div className="bg-black/80 border border-green-900 rounded-2xl p-5 space-y-4">
        <div className="text-green-300 text-sm mb-3">&gt; Agent is thinking through reasoning steps in real time...</div>

        <div className="space-y-3">
          {steps.length === 0 ? (
            <div className="text-green-300/80">No reasoning steps available yet.</div>
          ) : (
            steps.map((rawStep, index) => {
              const step = formatStep(rawStep);
              const isActive = step.active || step.current || step.status === 'active';
              const isCompleted = step.completed || step.status === 'done' || step.status === 'complete' || step.status === 'completed';
              const symbol = isActive ? '⚙️' : isCompleted ? '✓' : '·';

              return (
                <div key={index} className="flex items-start gap-3">
                  <span
                    className="text-lg"
                    style={isActive ? { animation: 'reasoning-spin 1.2s linear infinite' } : {}}
                  >
                    {symbol}
                  </span>
                  <div className="space-y-1">
                    <div className={isActive ? 'text-white' : 'text-green-200'}>
                      {step.label || step.title || 'Unnamed step'}
                    </div>
                    {step.detail && (
                      <div className="text-xs text-green-300/80">{step.detail}</div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <style>{`
        @keyframes reasoning-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ReasoningLog;
