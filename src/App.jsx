import React, { useState } from 'react';
import { ShotMap } from './components/ShotMap';
import { MatchCenter } from './components/MatchCenter';
import { PlayerRadar } from './components/PlayerRadar';
import { PassingNetwork } from './components/PassingNetwork';
import { MatchSimulator } from './components/MatchSimulator';
import { Activity, Target, Users, GitCommit, Cpu, Sparkles, Filter, Database, Shield } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('match-center');
  const [season, setSeason] = useState('2024-2025');
  const [league, setLeague] = useState('All Leagues');

  const navTabs = [
    { id: 'match-center', label: 'Match Center & xG Flow', icon: Activity },
    { id: 'shot-map', label: 'xG Shot Map', icon: Target },
    { id: 'player-radar', label: 'Player Analytics & Radar', icon: Users },
    { id: 'passing-network', label: 'Passing Networks', icon: GitCommit },
    { id: 'match-simulator', label: 'Monte Carlo Simulator', icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-slate-100 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                  Footschool Analytics
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  PRO v2.5
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Advanced Football Intelligence Platform</p>
            </div>
          </div>

          {/* Season & League Dropdowns */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Season:</span>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="bg-transparent font-semibold text-slate-100 focus:outline-none"
              >
                <option value="2024-2025" className="bg-slate-900 text-slate-100">2024-2025</option>
                <option value="2023-2024" className="bg-slate-900 text-slate-100">2023-2024</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scope:</span>
              <select
                value={league}
                onChange={(e) => setLeague(e.target.value)}
                className="bg-transparent font-semibold text-slate-100 focus:outline-none"
              >
                <option value="All Leagues" className="bg-slate-900 text-slate-100">All Leagues & UCL</option>
                <option value="Premier League" className="bg-slate-900 text-slate-100">Premier League</option>
                <option value="La Liga" className="bg-slate-900 text-slate-100">La Liga</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto border-t border-slate-800/60 scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'match-center' && <MatchCenter />}
        {activeTab === 'shot-map' && <ShotMap />}
        {activeTab === 'player-radar' && <PlayerRadar />}
        {activeTab === 'passing-network' && <PassingNetwork />}
        {activeTab === 'match-simulator' && <MatchSimulator />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <div>Footschool Analytics • Powered by Expected Goals (xG) & Spatial Pitch Coordinates</div>
          <div className="flex items-center gap-4">
            <span>Opta/StatsBomb Standard Compliant</span>
            <span>•</span>
            <span>Real-time Monte Carlo Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
