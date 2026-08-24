import React, { useState, useMemo } from 'react';
import { TEAMS } from '../data/footballData';
import { runMonteCarloSimulation } from '../utils/analytics';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Cpu, Play, Sliders, Dices, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MatchSimulator = () => {
  const [homeTeam, setHomeTeam] = useState(TEAMS[0]); // MCI
  const [awayTeam, setAwayTeam] = useState(TEAMS[1]); // ARS

  // Tactical Sliders
  const [homePressing, setHomePressing] = useState(5);
  const [awayPressing, setAwayPressing] = useState(5);
  const [homeDirectness, setHomeDirectness] = useState(5);
  const [awayDirectness, setAwayDirectness] = useState(5);

  const [simCount, setSimCount] = useState(1000);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulationResults = useMemo(() => {
    return runMonteCarloSimulation(
      homeTeam,
      awayTeam,
      { homePressing, awayPressing, homeDirectness, awayDirectness },
      simCount
    );
  }, [homeTeam, awayTeam, homePressing, awayPressing, homeDirectness, awayDirectness, simCount]);

  const triggerSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {
        // fallback
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Simulator Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
          <Cpu className="w-5 h-5" />
          <span>Predictive Monte Carlo Match Simulator</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Simulations:</span>
            <select
              value={simCount}
              onChange={(e) => setSimCount(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value={500}>500 Runs</option>
              <option value={1000}>1,000 Runs</option>
              <option value={5000}>5,000 Runs</option>
            </select>
          </div>

          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-4 h-4 fill-slate-950 ${isSimulating ? 'animate-spin' : ''}`} />
            {isSimulating ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>
      </div>

      {/* Match Setup & Tactical Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Home Team Tactical Setup */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{homeTeam.badge}</span>
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase">Home Team</span>
                <select
                  value={homeTeam.id}
                  onChange={(e) => setHomeTeam(TEAMS.find(t => t.id === e.target.value))}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-sm font-bold text-slate-100 block mt-0.5"
                >
                  {TEAMS.map(t => (
                    <option key={t.id} value={t.id} disabled={t.id === awayTeam.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Season xG/90</div>
              <div className="text-lg font-bold text-emerald-400">{(homeTeam.stats.xgFor / 28).toFixed(2)}</div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="flex items-center gap-1"><Sliders className="w-3 h-3 text-emerald-400" /> High Press Intensity</span>
                <span className="font-bold text-emerald-400">{homePressing} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={homePressing}
                onChange={(e) => setHomePressing(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="flex items-center gap-1"><Sliders className="w-3 h-3 text-emerald-400" /> Attacking Directness</span>
                <span className="font-bold text-emerald-400">{homeDirectness} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={homeDirectness}
                onChange={(e) => setHomeDirectness(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Away Team Tactical Setup */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{awayTeam.badge}</span>
              <div>
                <span className="text-xs text-slate-500 font-semibold uppercase">Away Team</span>
                <select
                  value={awayTeam.id}
                  onChange={(e) => setAwayTeam(TEAMS.find(t => t.id === e.target.value))}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-sm font-bold text-slate-100 block mt-0.5"
                >
                  {TEAMS.map(t => (
                    <option key={t.id} value={t.id} disabled={t.id === homeTeam.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Season xG/90</div>
              <div className="text-lg font-bold text-blue-400">{(awayTeam.stats.xgFor / 28).toFixed(2)}</div>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 pt-2 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="flex items-center gap-1"><Sliders className="w-3 h-3 text-blue-400" /> High Press Intensity</span>
                <span className="font-bold text-blue-400">{awayPressing} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={awayPressing}
                onChange={(e) => setAwayPressing(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="flex items-center gap-1"><Sliders className="w-3 h-3 text-blue-400" /> Attacking Directness</span>
                <span className="font-bold text-blue-400">{awayDirectness} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={awayDirectness}
                onChange={(e) => setAwayDirectness(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Win Probability Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span>Match Win Probability Distribution ({simCount.toLocaleString()} Simulations)</span>
          <span>Expected xG: <strong className="text-emerald-400">{simulationResults.homeExpectedGoals}</strong> - <strong className="text-blue-400">{simulationResults.awayExpectedGoals}</strong></span>
        </div>

        {/* Probability Bar */}
        <div className="space-y-2">
          <div className="flex h-6 w-full bg-slate-950 rounded-xl overflow-hidden font-bold text-xs">
            <div className="bg-emerald-500 text-slate-950 flex items-center justify-center transition-all duration-500" style={{ width: `${simulationResults.homeWinProb}%` }}>
              {simulationResults.homeWinProb > 12 ? `${simulationResults.homeWinProb}%` : ''}
            </div>
            <div className="bg-slate-700 text-slate-200 flex items-center justify-center transition-all duration-500" style={{ width: `${simulationResults.drawProb}%` }}>
              {simulationResults.drawProb > 12 ? `${simulationResults.drawProb}%` : ''}
            </div>
            <div className="bg-blue-500 text-slate-950 flex items-center justify-center transition-all duration-500" style={{ width: `${simulationResults.awayWinProb}%` }}>
              {simulationResults.awayWinProb > 12 ? `${simulationResults.awayWinProb}%` : ''}
            </div>
          </div>

          <div className="flex justify-between text-xs pt-1">
            <span className="text-emerald-400 font-bold">{homeTeam.name} Win ({simulationResults.homeWinProb}%)</span>
            <span className="text-slate-400 font-bold">Draw ({simulationResults.drawProb}%)</span>
            <span className="text-blue-400 font-bold">{awayTeam.name} Win ({simulationResults.awayWinProb}%)</span>
          </div>
        </div>
      </div>

      {/* Score Frequency Histogram & Top Scorelines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goal Distribution Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Dices className="w-4 h-4 text-emerald-400" />
            Expected Goal Frequency Distribution
          </h3>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={simulationResults.homeGoalsDistribution} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="goals" stroke="#64748b" tick={{ fontSize: 12 }} label={{ value: 'Goals Scored', position: 'bottom', offset: 0, fill: '#64748b', fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }} />
                <Bar dataKey="percentage" name={`${homeTeam.name} Prob %`} fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Likely Scorelines */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Most Likely Scorelines
          </h3>

          <div className="space-y-3 pt-2">
            {simulationResults.topScorelines.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold flex items-center justify-center text-xs">
                    #{idx + 1}
                  </span>
                  <span className="text-lg font-black text-slate-100">{item.scoreline}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">{item.probability}%</div>
                  <div className="text-[10px] text-slate-500">{item.count} sims</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
