import React from 'react';

/**
 * Football Pitch SVG Component
 * Pitch dimensions: 105m x 68m standard, rendered in a 100 x 100 normalized SVG grid
 * Supports custom overlays, shot dots, passing nodes, and tactical grid lines
 */
export const Pitch = ({ children, className = "", theme = "dark" }) => {
  return (
    <div className={`relative w-full aspect-[105/68] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full select-none"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="pitchGrassPattern" width="10" height="100" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="5" height="100" fill="#064e3b" fillOpacity="0.4" />
            <rect x="5" y="0" width="5" height="100" fill="#022c22" fillOpacity="0.4" />
          </pattern>
          <radialGradient id="pitchGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Pitch background grass stripes */}
        <rect width="100" height="100" fill="#064e3b" />
        <rect width="100" height="100" fill="url(#pitchGrassPattern)" />
        <rect width="100" height="100" fill="url(#pitchGlow)" />

        {/* Outer boundary lines */}
        <rect x="3" y="3" width="94" height="94" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />

        {/* Halfway line */}
        <line x1="50" y1="3" x2="50" y2="97" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />

        {/* Center circle */}
        <circle cx="50" cy="50" r="12" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        <circle cx="50" cy="50" r="0.8" fill="#34d399" fillOpacity="0.8" />

        {/* Left Penalty Area */}
        <rect x="3" y="21" width="16" height="58" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        {/* Left Goal Area */}
        <rect x="3" y="36" width="6" height="28" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        {/* Left Penalty Spot */}
        <circle cx="14" cy="50" r="0.6" fill="#34d399" fillOpacity="0.8" />
        {/* Left Penalty Arc */}
        <path d="M 19 41 A 10 10 0 0 1 19 59" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        {/* Left Goal Frame */}
        <rect x="1" y="42" width="2" height="16" fill="none" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.8" />

        {/* Right Penalty Area */}
        <rect x="81" y="21" width="16" height="58" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        {/* Right Goal Area */}
        <rect x="91" y="36" width="6" height="28" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        {/* Right Penalty Spot */}
        <circle cx="86" cy="50" r="0.6" fill="#34d399" fillOpacity="0.8" />
        {/* Right Penalty Arc */}
        <path d="M 81 41 A 10 10 0 0 0 81 59" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        {/* Right Goal Frame */}
        <rect x="97" y="42" width="2" height="16" fill="none" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.8" />

        {/* Corner arcs */}
        <path d="M 3 6 A 3 3 0 0 0 6 3" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        <path d="M 3 94 A 3 3 0 0 1 6 97" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        <path d="M 97 6 A 3 3 0 0 1 94 3" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />
        <path d="M 97 94 A 3 3 0 0 0 94 97" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.6" />

        {/* Custom Overlay Layer */}
        {children}
      </svg>
    </div>
  );
};
