import React, { useState } from 'react';
import { Pitch } from './Pitch';
import { PASSING_NETWORKS } from '../data/footballData';
import { GitCommit, Layers, Eye, Move } from 'lucide-react';

export const PassingNetwork = () => {
  const [selectedTeamKey, setSelectedTeamKey] = useState('mci');
  const [hoveredNode, setHoveredNode] = useState(null);

  const activeNetwork = PASSING_NETWORKS[selectedTeamKey];

  return (
    <div className="space-y-6">
      {/* Network Selector Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
          <GitCommit className="w-5 h-5" />
          <span>Tactical Passing Network & Formation Density</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Select Tactical Setup:</span>
          <div className="flex gap-2">
            {Object.keys(PASSING_NETWORKS).map((key) => {
              const net = PASSING_NETWORKS[key];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTeamKey(key)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    selectedTeamKey === key
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {net.team} ({net.formation})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Pitch Visualizer & Tactical Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Pitch Area */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl relative">
          <Pitch>
            {/* Render Pass Connection Links */}
            {activeNetwork.links.map((link, idx) => {
              const sourceNode = activeNetwork.nodes.find(n => n.id === link.source);
              const targetNode = activeNetwork.nodes.find(n => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              // Line thickness and opacity based on pass volume
              const strokeWidth = 0.4 + (link.passes / 35) * 1.6;
              const opacity = 0.3 + (link.passes / 35) * 0.6;

              const isHighlighted = hoveredNode && (hoveredNode.id === link.source || hoveredNode.id === link.target);

              return (
                <line
                  key={idx}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlighted ? '#10b981' : '#38bdf8'}
                  strokeWidth={isHighlighted ? strokeWidth * 1.5 : strokeWidth}
                  strokeOpacity={isHighlighted ? 1 : opacity}
                  strokeDasharray={isHighlighted ? 'none' : 'none'}
                />
              );
            })}

            {/* Render Player Nodes */}
            {activeNetwork.nodes.map((node) => {
              const radius = 2.5 + (node.passesCount / 112) * 2.5;
              const isHovered = hoveredNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-transform duration-200"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill={isHovered ? '#10b981' : '#020617'}
                    stroke={isHovered ? '#6ee7b7' : '#38bdf8'}
                    strokeWidth="0.8"
                  />
                  <text
                    x={node.x}
                    y={node.y + 0.4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isHovered ? '#020617' : '#f8fafc'}
                    fontSize="2.2"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {node.number}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + radius + 2.2}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="1.8"
                    fontWeight="500"
                    className="pointer-events-none"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </Pitch>

          {/* Hover Node Tooltip Overlay */}
          {hoveredNode && (
            <div
              className="absolute bg-slate-950/95 border border-slate-700 rounded-xl p-3 shadow-2xl pointer-events-none z-20 backdrop-blur-md text-xs space-y-1 w-52"
              style={{
                left: `${Math.min(hoveredNode.x, 70)}%`,
                top: `${Math.min(hoveredNode.y, 70)}%`,
              }}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="font-bold text-slate-100">#{hoveredNode.number} {hoveredNode.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-emerald-500/20 text-emerald-400">
                  {hoveredNode.pos}
                </span>
              </div>
              <div className="text-slate-400">Total Passes Completed: <span className="text-emerald-400 font-bold">{hoveredNode.passesCount}</span></div>
              <div className="text-slate-400">Pitch Coordinates: <span className="text-slate-300">({hoveredNode.x}, {hoveredNode.y})</span></div>
            </div>
          )}

          {/* Legend Footnote */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-2 border-t border-slate-800 pt-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border border-sky-400 bg-slate-950 inline-block"></span> Player Node (Size = Pass Volume)</span>
              <span className="flex items-center gap-1.5"><span className="w-6 h-0.5 bg-sky-400 inline-block"></span> Connection (Thickness = Pass Frequency)</span>
            </div>
          </div>
        </div>

        {/* Tactical Info Panel */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Formation Summary</div>
            <div className="text-2xl font-black text-slate-100">{activeNetwork.team}</div>
            <div className="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              Base Formation: {activeNetwork.formation}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              The network depicts average player positioning during open-play build-up. Inter-player connection thickness represents passing combination volume.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Top Passing Hubs</div>
            <div className="space-y-2.5 pt-1">
              {[...activeNetwork.nodes]
                .sort((a, b) => b.passesCount - a.passesCount)
                .slice(0, 4)
                .map((p, idx) => (
                  <div key={p.id} className="flex items-center justify-between text-xs p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-emerald-400 text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-200">{p.name} ({p.pos})</span>
                    </div>
                    <span className="font-bold text-slate-100">{p.passesCount} passes</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
