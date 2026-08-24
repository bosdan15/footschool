/**
 * Football Analytics Computation & Math Utilities
 */

// Calculate Expected Goals Overperformance (Goals - xG)
export const calculateXgDifference = (goals, xg) => {
  const diff = goals - xg;
  return {
    value: Number(diff.toFixed(2)),
    status: diff > 0 ? 'Overperforming' : diff < 0 ? 'Underperforming' : 'On Target',
    color: diff > 0 ? '#10b981' : diff < 0 ? '#ef4444' : '#64748b'
  };
};

// Compute per 90 stats
export const per90 = (metric, minutes) => {
  if (!minutes || minutes === 0) return 0;
  return Number(((metric / minutes) * 90).toFixed(2));
};

// Calculate Shot Conversion Rate (%)
export const shotConversionRate = (goals, shots) => {
  if (!shots || shots === 0) return 0;
  return Number(((goals / shots) * 100).toFixed(1));
};

// Monte Carlo Match Simulation Engine
export const runMonteCarloSimulation = (homeTeam, awayTeam, tacticalModifiers = { homePressing: 5, awayPressing: 5, homeDirectness: 5, awayDirectness: 5 }, numSims = 1000) => {
  // Base xG calculated from team season performance
  const homeBaseXg = (homeTeam.stats.xgFor / 28) * (awayTeam.stats.xgAgainst / 28) / 1.5;
  const awayBaseXg = (awayTeam.stats.xgFor / 28) * (homeTeam.stats.xgAgainst / 28) / 1.5;

  // Apply tactical modifiers
  const homeMod = 1 + (tacticalModifiers.homeDirectness - 5) * 0.05 + (10 - tacticalModifiers.awayPressing) * 0.02;
  const awayMod = 1 + (tacticalModifiers.awayDirectness - 5) * 0.05 + (10 - tacticalModifiers.homePressing) * 0.02;

  const homeExpectedLambda = Math.max(0.3, homeBaseXg * homeMod);
  const awayExpectedLambda = Math.max(0.3, awayBaseXg * awayMod);

  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;

  const scoreFrequencies = {};
  const homeGoalsDist = { 0: 0, 1: 0, 2: 0, 3: 0, "4+": 0 };
  const awayGoalsDist = { 0: 0, 1: 0, 2: 0, 3: 0, "4+": 0 };

  // Poisson random number generator
  const poissonRandom = (lambda) => {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k++;
      p *= Math.random();
    } while (p > L);
    return k - 1;
  };

  for (let i = 0; i < numSims; i++) {
    const homeGoals = poissonRandom(homeExpectedLambda);
    const awayGoals = poissonRandom(awayExpectedLambda);

    if (homeGoals > awayGoals) homeWins++;
    else if (homeGoals === awayGoals) draws++;
    else awayWins++;

    const key = `${homeGoals}-${awayGoals}`;
    scoreFrequencies[key] = (scoreFrequencies[key] || 0) + 1;

    const hKey = homeGoals >= 4 ? "4+" : homeGoals;
    const aKey = awayGoals >= 4 ? "4+" : awayGoals;
    homeGoalsDist[hKey] = (homeGoalsDist[hKey] || 0) + 1;
    awayGoalsDist[aKey] = (awayGoalsDist[aKey] || 0) + 1;
  }

  // Find top 3 most common scorelines
  const sortedScorelines = Object.entries(scoreFrequencies)
    .map(([scoreline, count]) => ({ scoreline, count, probability: Number(((count / numSims) * 100).toFixed(1)) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return {
    homeWinProb: Number(((homeWins / numSims) * 100).toFixed(1)),
    drawProb: Number(((draws / numSims) * 100).toFixed(1)),
    awayWinProb: Number(((awayWins / numSims) * 100).toFixed(1)),
    homeExpectedGoals: Number(homeExpectedLambda.toFixed(2)),
    awayExpectedGoals: Number(awayExpectedLambda.toFixed(2)),
    topScorelines: sortedScorelines,
    homeGoalsDistribution: Object.entries(homeGoalsDist).map(([goals, count]) => ({ goals, percentage: Number(((count / numSims) * 100).toFixed(1)) })),
    awayGoalsDistribution: Object.entries(awayGoalsDist).map(([goals, count]) => ({ goals, percentage: Number(((count / numSims) * 100).toFixed(1)) })),
  };
};

// Filter shots by team, outcome, min/max xG
export const filterShots = (shots, filters) => {
  return shots.filter(shot => {
    if (filters.teamId && filters.teamId !== 'all' && shot.teamId !== filters.teamId) return false;
    if (filters.outcome && filters.outcome !== 'all' && shot.outcome !== filters.outcome) return false;
    if (filters.minXg && shot.xg < filters.minXg) return false;
    if (filters.maxXg && shot.xg > filters.maxXg) return false;
    if (filters.player && filters.player !== 'all' && shot.player !== filters.player) return false;
    return true;
  });
};
