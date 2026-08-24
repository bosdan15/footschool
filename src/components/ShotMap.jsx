import React, { useState, useMemo } from 'react';
import { Pitch } from './Pitch';
import { SHOTS_DATA, TEAMS } from '../data/footballData';
import { filterShots } from '../utils/analytics';
import { Target, Filter, Info, ShieldAlert, Award } from 'lucide-react';

export const ShotMap = () => {
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedOutcome, setSelectedOutcome] = useState('all');
  const [minXg, setMinXg] = useState(0);
  const [hoveredShot, setHoveredShot] = useState(null);

  const filteredShots = useMemo(() => {
    return filterShots(SHOTS_DATA, {
      teamId: selectedTeam,
      outcome: selectedOutcome,
      minXg: parseFloat(minXg)
    });
  }, [selectedTeam, selectedOutcome, minXg]);

  const stats = useMemo(() => {
    const totalShots = filteredShots.length;
    const totalXg = filteredShots.reduce((acc, s) => acc + s.xg, 0);
    const goals = filteredShots.filter(s => s.outcome === 'Goal').length;
    const avgXg = totalShots > 0 ? totalXg / totalShots : 0;
    return {
      totalShots,
      totalXg: totalXg.toFixed(2),
      goals,
      avgXg: avgXg.toFixed(2)
    };
  }, [filteredShots]);

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'Goal': return '#10b981'; // Green
      case 'Saved': return '#3b82f6'; // Blue
      case 'Blocked': return '#f59e0b'; // Amber
      case 'Missed': return '#ef4444'; // Red
      default: return '#94a3b8';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
          <Target className="w-5 h-5" />
          <span>Interactive xG Shot Map</span>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Team Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Team:</span>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Teams</option>
              {TEAMS.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>

          {/* Outcome Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Outcome:</span>
            <select
              value={selectedOutcome}
              onChange={(e) => setSelectedOutcome(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Outcomes</option>
              <option value="Goal">Goal ⚽</option>
              <option value="Saved">Saved 🧤</option>
              <option value="Blocked">Blocked 🛡️</option>
              <option value="Missed">Missed ❌</option>
            </select>
          </div>

          {/* Min xG Slider */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Min xG ({minXg}):</span>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={minXg}
              onChange={(e) => setMinXg(e.target.value)}
              className="w-24 accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main Pitch & Key Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Pitch Area */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl relative">
          <Pitch>
            {filteredShots.map((shot) => {
              // Map xG value to radius size (range 1.5 - 4.5)
              const radius = 1.8 + shot.xg * 3.2;
              const color = getOutcomeColor(shot.outcome);

              return (
                <g key={shot.id} className="cursor-pointer transition-transform duration-200 hover:scale-125">
                  <circle
                    cx={shot.x}
                    cy={shot.y}
                    r={radius}
                    fill={color}
                    fillOpacity={0.8}
                    stroke="#ffffff"
                    strokeWidth="0.4"
                    onMouseEnter={() => setHoveredShot(shot)}
                    onMouseLeave={() => setHoveredShot(null)}
                  />
                  {shot.outcome === 'Goal' && (
                    <circle
                      cx={shot.x}
                      cy={shot.y}
                      r={radius * 1.5}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="0.4"
                      strokeDasharray="1 1"
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}
          </Pitch>

          {/* Hover Tooltip Overlay */}
          {hoveredShot && (
            <div
              className="absolute bg-slate-950/95 border border-slate-700 rounded-xl p-3 shadow-2xl pointer-events-none z-20 backdrop-blur-md text-xs space-y-1 w-56"
              style={{
                left: `${Math.min(hoveredShot.x, 70)}%`,
                top: `${Math.min(hoveredShot.y, 70)}%`,
              }}
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="font-bold text-slate-100">{hoveredShot.player}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase" style={{ backgroundColor: `${getOutcomeColor(hoveredShot.outcome)}33`, color: getOutcomeColor(hoveredShot.outcome) }}>
                  {hoveredShot.outcome}
                </span>
              </div>
              <div className="text-slate-400">Team: <span className="text-slate-200">{hoveredShot.team}</span></div>
              <div className="text-slate-400">xG Value: <span className="text-emerald-400 font-bold">{hoveredShot.xg}</span></div>
              <div className="text-slate-400">Body Part: <span className="text-slate-200">{hoveredShot.bodyPart}</span></div>
              <div className="text-slate-400">Situation: <span className="text-slate-200">{hoveredShot.situation}</span></div>
              <div className="text-slate-500 text-[10px]">Minute: {hoveredShot.minute}'</div>
            </div>
          )}

          {/* Pitch Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-3 text-xs text-slate-400 px-2">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-slate-300">Outcome Legend:</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Goal</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Saved</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Blocked</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> Missed</span>
            </div>
            <div className="text-slate-500">
              * Dot radius reflects Expected Goal (xG) value
            </div>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Filtered Shot Summary</div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                <div className="text-2xl font-bold text-slate-100">{stats.totalShots}</div>
                <div className="text-xs text-slate-400">Total Shots</div>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                <div className="text-2xl font-bold text-emerald-400">{stats.totalXg}</div>
                <div className="text-xs text-slate-400">Accumulated xG</div>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                <div className="text-2xl font-bold text-amber-400">{stats.goals}</div>
                <div className="text-xs text-slate-400">Goals Scored</div>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800">
                <div className="text-2xl font-bold text-cyan-400">{stats.avgXg}</div>
                <div className="text-xs text-slate-400">Avg xG / Shot</div>
              </div>
            </div>
          </div>

          {/* Shot Quality Distribution */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">xG Quality Tiers</div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>High Quality (xG &gt; 0.3)</span>
                  <span className="text-emerald-400 font-semibold">{filteredShots.filter(s => s.xg > 0.3).length}</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${stats.totalShots ? (filteredShots.filter(s => s.xg > 0.3).length / stats.totalShots) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Medium Quality (0.1 - 0.3)</span>
                  <span className="text-blue-400 font-semibold">{filteredShots.filter(s => s.xg >= 0.1 && s.xg <= 0.3).length}</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${stats.totalShots ? (filteredShots.filter(s => s.xg >= 0.1 && s.xg <= 0.3).length / stats.totalShots) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Low Quality (xG &lt; 0.1)</span>
                  <span className="text-slate-400 font-semibold">{filteredShots.filter(s => s.xg < 0.1).length}</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-slate-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${stats.totalShots ? (filteredShots.filter(s => s.xg < 0.1).length / stats.totalShots) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
