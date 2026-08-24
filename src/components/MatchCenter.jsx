import React, { useState } from 'react';
import { MATCHES } from '../data/footballData';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Trophy, Activity, Calendar, Award, Zap } from 'lucide-react';

export const MatchCenter = () => {
  const [selectedMatch, setSelectedMatch] = useState(MATCHES[0]);

  return (
    <div className="space-y-6">
      {/* Match Selector Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {MATCHES.map((match) => (
          <button
            key={match.id}
            onClick={() => setSelectedMatch(match)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all whitespace-nowrap min-w-[280px] ${
              selectedMatch.id === match.id
                ? 'bg-slate-900 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:border-slate-700'
            }`}
          >
            <div className="flex flex-col flex-1">
              <span className="text-xs text-slate-500">{match.competition}</span>
              <span className="text-sm font-bold text-slate-100 mt-0.5">
                {match.homeTeam.shortName} {match.score.home} - {match.score.away} {match.awayTeam.shortName}
              </span>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-800 rounded text-emerald-400">
              xG {match.xg.home} : {match.xg.away}
            </span>
          </button>
        ))}
      </div>

      {/* Match Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Home Team */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <span className="text-4xl">{selectedMatch.homeTeam.badge}</span>
            <div>
              <h2 className="text-2xl font-black text-slate-100">{selectedMatch.homeTeam.name}</h2>
              <div className="text-sm text-slate-400">Home • {selectedMatch.homeTeam.league}</div>
            </div>
          </div>

          {/* Score & xG Center Piece */}
          <div className="flex flex-col items-center">
            <div className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              {selectedMatch.date}
            </div>
            <div className="flex items-center gap-4 bg-slate-950/80 px-6 py-2.5 rounded-2xl border border-slate-800 shadow-inner">
              <span className="text-3xl font-black text-emerald-400">{selectedMatch.score.home}</span>
              <span className="text-slate-600 font-bold text-xl">:</span>
              <span className="text-3xl font-black text-blue-400">{selectedMatch.score.away}</span>
            </div>
            <div className="mt-2 text-xs font-medium text-slate-400">
              Expected Goals (xG): <span className="text-emerald-400 font-semibold">{selectedMatch.xg.home}</span> vs <span className="text-blue-400 font-semibold">{selectedMatch.xg.away}</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-4 text-center md:text-right flex-row-reverse">
            <span className="text-4xl">{selectedMatch.awayTeam.badge}</span>
            <div>
              <h2 className="text-2xl font-black text-slate-100">{selectedMatch.awayTeam.name}</h2>
              <div className="text-sm text-slate-400">Away • {selectedMatch.awayTeam.league}</div>
            </div>
          </div>
        </div>
      </div>

      {/* xG Flow Cumulative Progression Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Cumulative Expected Goals (xG Flow)
            </h3>
            <p className="text-xs text-slate-400">Live momentum and chance creation timeline across 90 minutes</p>
          </div>
          <div className="flex gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span> {selectedMatch.homeTeam.name}
            </span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-3 h-0.5 bg-blue-400 inline-block"></span> {selectedMatch.awayTeam.name}
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={selectedMatch.xgFlow} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="minute" stroke="#64748b" tick={{ fontSize: 12 }} unit="'" />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} domain={[0, 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }}
                formatter={(value, name) => [value, name === 'homeXg' ? selectedMatch.homeTeam.name : selectedMatch.awayTeam.name]}
                labelFormatter={(label) => `Minute ${label}'`}
              />
              <Line
                type="stepAfter"
                dataKey="homeXg"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 3, fill: '#10b981' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="stepAfter"
                dataKey="awayXg"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 3, fill: '#3b82f6' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Match Statistics Comparison & Key Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match Key Stats */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            Head-to-Head Performance Breakdown
          </h3>

          <div className="space-y-4 text-sm pt-2">
            {[
              { label: "Possession %", home: selectedMatch.possession.home, away: selectedMatch.possession.away, unit: "%" },
              { label: "Total Shots", home: selectedMatch.shots.home, away: selectedMatch.shots.away },
              { label: "Shots on Target", home: selectedMatch.shotsOnTarget.home, away: selectedMatch.shotsOnTarget.away },
              { label: "Passes Completed", home: selectedMatch.passes.home, away: selectedMatch.passes.away },
              { label: "Pass Accuracy", home: selectedMatch.passAccuracy.home, away: selectedMatch.passAccuracy.away, unit: "%" },
            ].map((stat, idx) => {
              const total = stat.home + stat.away;
              const homePct = (stat.home / total) * 100;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-400">{stat.home}{stat.unit || ''}</span>
                    <span className="text-slate-400">{stat.label}</span>
                    <span className="text-blue-400">{stat.away}{stat.unit || ''}</span>
                  </div>
                  <div className="flex h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${homePct}%` }}></div>
                    <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${100 - homePct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Events */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Key Match Events
          </h3>

          <div className="space-y-3 pt-1">
            {selectedMatch.timelineEvents.map((event, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                    {event.minute}'
                  </span>
                  <div>
                    <div className="font-bold text-slate-200">⚽ Goal: {event.player}</div>
                    <div className="text-[10px] text-slate-500">xG Value: {event.xg}</div>
                  </div>
                </div>
                <div className="font-black text-emerald-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  {event.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
