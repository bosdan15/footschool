import React, { useState } from 'react';
import { PLAYERS, TEAMS } from '../data/footballData';
import { calculateXgDifference, per90, shotConversionRate } from '../utils/analytics';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from 'recharts';
import { UserCheck, TrendingUp } from 'lucide-react';

export const PlayerRadar = () => {
  const [player1, setPlayer1] = useState(PLAYERS[0]); // Haaland
  const [player2, setPlayer2] = useState(PLAYERS[1]); // De Bruyne

  const radarData = [
    { metric: 'xG / 90', P1: player1.percentiles.xgPer90, P2: player2.percentiles.xgPer90 },
    { metric: 'xA / 90', P1: player1.percentiles.xaPer90, P2: player2.percentiles.xaPer90 },
    { metric: 'Goals / 90', P1: player1.percentiles.goalsPer90, P2: player2.percentiles.goalsPer90 },
    { metric: 'Shots / 90', P1: player1.percentiles.shotsPer90, P2: player2.percentiles.shotsPer90 },
    { metric: 'Prog Carries', P1: player1.percentiles.progressiveCarries, P2: player2.percentiles.progressiveCarries },
    { metric: 'Pressures', P1: player1.percentiles.pressures, P2: player2.percentiles.pressures },
  ];

  const scatterData = PLAYERS.map(p => ({
    name: p.name,
    xg: p.stats.xg,
    goals: p.stats.goals,
    team: p.teamName,
    conversion: shotConversionRate(p.stats.goals, p.stats.shots)
  }));

  const p1XgDiff = calculateXgDifference(player1.stats.goals, player1.stats.xg);
  const p2XgDiff = calculateXgDifference(player2.stats.goals, player2.stats.xg);

  return (
    <div className="space-y-6">
      {/* Player Selection Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap gap-6 items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
          <UserCheck className="w-5 h-5" />
          <span>Player Percentile & Metric Comparison</span>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          {/* Player 1 Select */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
            <span className="text-xs text-slate-400 font-medium">Player 1:</span>
            <select
              value={player1.id}
              onChange={(e) => setPlayer1(PLAYERS.find(p => p.id === e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {PLAYERS.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.teamName})</option>
              ))}
            </select>
          </div>

          {/* Player 2 Select */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-400 inline-block"></span>
            <span className="text-xs text-slate-400 font-medium">Player 2:</span>
            <select
              value={player2.id}
              onChange={(e) => setPlayer2(PLAYERS.find(p => p.id === e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PLAYERS.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.teamName})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Radar & Profile Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player 1 Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
          <div className="flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {player1.position}
              </span>
              <h3 className="text-xl font-black text-slate-100 mt-1">{player1.name}</h3>
              <div className="text-xs text-slate-400">{player1.teamName} • Age {player1.age}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400">Goals / xG</div>
              <div className="text-lg font-bold text-slate-100">{player1.stats.goals} <span className="text-xs text-slate-500">/ {player1.stats.xg}</span></div>
              <div className="text-[10px] font-medium mt-1" style={{ color: p1XgDiff.color }}>
                {p1XgDiff.status} ({p1XgDiff.value > 0 ? '+' : ''}{p1XgDiff.value})
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400">Assists / xA</div>
              <div className="text-lg font-bold text-slate-100">{player1.stats.assists} <span className="text-xs text-slate-500">/ {player1.stats.xa}</span></div>
              <div className="text-[10px] text-slate-500 mt-1">
                {per90(player1.stats.keyPasses, player1.stats.minutesPlayed)} key passes/90
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400">Shot Conversion</div>
              <div className="text-lg font-bold text-emerald-400">{shotConversionRate(player1.stats.goals, player1.stats.shots)}%</div>
              <div className="text-[10px] text-slate-500 mt-1">{player1.stats.shotsOnTarget} on target</div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400">Pass Accuracy</div>
              <div className="text-lg font-bold text-cyan-400">{player1.stats.passAccuracy}%</div>
              <div className="text-[10px] text-slate-500 mt-1">{player1.stats.progressiveCarries} prog. carries</div>
            </div>
          </div>
        </div>

        {/* Center Radar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center">
          <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2">Percentile Rank Comparison</div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 10 }} />
                <Radar name={player1.name} dataKey="P1" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Radar name={player2.name} dataKey="P2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }} />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Player 2 Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
          <div className="flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {player2.position}
              </span>
              <h3 className="text-xl font-black text-slate-100 mt-1">{player2.name}</h3>
              <div className="text-xs text-slate-400">{player2.teamName} • Age {player2.age}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400">Goals / xG</div>
              <div className="text-lg font-bold text-slate-100">{player2.stats.goals} <span className="text-xs text-slate-500">/ {player2.stats.xg}</span></div>
              <div className="text-[10px] font-medium mt-1" style={{ color: p2XgDiff.color }}>
                {p2XgDiff.status} ({p2XgDiff.value > 0 ? '+' : ''}{p2XgDiff.value})
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400">Assists / xA</div>
              <div className="text-lg font-bold text-slate-100">{player2.stats.assists} <span className="text-xs text-slate-500">/ {player2.stats.xa}</span></div>
              <div className="text-[10px] text-slate-500 mt-1">
                {per90(player2.stats.keyPasses, player2.stats.minutesPlayed)} key passes/90
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400">Shot Conversion</div>
              <div className="text-lg font-bold text-blue-400">{shotConversionRate(player2.stats.goals, player2.stats.shots)}%</div>
              <div className="text-[10px] text-slate-500 mt-1">{player2.stats.shotsOnTarget} on target</div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400">Pass Accuracy</div>
              <div className="text-lg font-bold text-cyan-400">{player2.stats.passAccuracy}%</div>
              <div className="text-[10px] text-slate-500 mt-1">{player2.stats.progressiveCarries} prog. carries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Finishing Efficiency Scatter Plot */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Finishing Efficiency Matrix (Actual Goals vs Expected Goals xG)
            </h3>
            <p className="text-xs text-slate-400">Players above the diagonal line are outperforming their expected goal quality</p>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" dataKey="xg" name="Expected Goals (xG)" stroke="#64748b" tick={{ fontSize: 12 }} label={{ value: 'Expected Goals (xG)', position: 'bottom', offset: 0, fill: '#64748b', fontSize: 12 }} />
              <YAxis type="number" dataKey="goals" name="Actual Goals" stroke="#64748b" tick={{ fontSize: 12 }} label={{ value: 'Actual Goals', angle: -90, position: 'left', offset: 0, fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs space-y-1 shadow-xl">
                        <div className="font-bold text-emerald-400">{data.name}</div>
                        <div className="text-slate-400">Team: <span className="text-slate-200">{data.team}</span></div>
                        <div className="text-slate-400">Goals: <span className="text-slate-100 font-bold">{data.goals}</span></div>
                        <div className="text-slate-400">xG: <span className="text-slate-100 font-bold">{data.xg}</span></div>
                        <div className="text-slate-400">Conversion Rate: <span className="text-amber-400 font-bold">{data.conversion}%</span></div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Players" data={scatterData} fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
