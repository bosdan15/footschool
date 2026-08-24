// Football Analytics Master Dataset

export const TEAMS = [
  {
    id: "mci",
    name: "Manchester City",
    shortName: "MCI",
    badge: "🩵",
    color: "#00B6E3",
    secondaryColor: "#1C2C5B",
    league: "Premier League",
    stats: {
      matches: 28,
      wins: 20,
      draws: 5,
      losses: 3,
      goalsFor: 67,
      goalsAgainst: 26,
      xgFor: 64.2,
      xgAgainst: 24.8,
      avgPossession: 65.4,
      ppda: 8.4, // Passes per Defensive Action
      fieldTilt: 68.2, // %
    }
  },
  {
    id: "ars",
    name: "Arsenal",
    shortName: "ARS",
    badge: "🔴",
    color: "#EF0107",
    secondaryColor: "#063672",
    league: "Premier League",
    stats: {
      matches: 28,
      wins: 21,
      draws: 4,
      losses: 3,
      goalsFor: 70,
      goalsAgainst: 24,
      xgFor: 66.8,
      xgAgainst: 22.1,
      avgPossession: 61.2,
      ppda: 8.9,
      fieldTilt: 64.5,
    }
  },
  {
    id: "liv",
    name: "Liverpool",
    shortName: "LIV",
    badge: "🔴",
    color: "#C8102E",
    secondaryColor: "#00B2A9",
    league: "Premier League",
    stats: {
      matches: 28,
      wins: 19,
      draws: 7,
      losses: 2,
      goalsFor: 65,
      goalsAgainst: 28,
      xgFor: 68.5,
      xgAgainst: 27.4,
      avgPossession: 62.8,
      ppda: 9.2,
      fieldTilt: 63.8,
    }
  },
  {
    id: "rma",
    name: "Real Madrid",
    shortName: "RMA",
    badge: "👑",
    color: "#FEBE10",
    secondaryColor: "#00529F",
    league: "La Liga",
    stats: {
      matches: 28,
      wins: 22,
      draws: 5,
      losses: 1,
      goalsFor: 64,
      goalsAgainst: 20,
      xgFor: 61.9,
      xgAgainst: 21.5,
      avgPossession: 59.8,
      ppda: 10.1,
      fieldTilt: 61.0,
    }
  },
  {
    id: "bar",
    name: "FC Barcelona",
    shortName: "BAR",
    badge: "🔵🔴",
    color: "#004D98",
    secondaryColor: "#A50044",
    league: "La Liga",
    stats: {
      matches: 28,
      wins: 18,
      draws: 7,
      losses: 3,
      goalsFor: 58,
      goalsAgainst: 27,
      xgFor: 59.4,
      xgAgainst: 26.2,
      avgPossession: 64.1,
      ppda: 8.1,
      fieldTilt: 66.0,
    }
  },
  {
    id: "bay",
    name: "Bayern Munich",
    shortName: "BAY",
    badge: "🔴",
    color: "#DC052D",
    secondaryColor: "#0066B2",
    league: "Bundesliga",
    stats: {
      matches: 28,
      wins: 20,
      draws: 4,
      losses: 4,
      goalsFor: 73,
      goalsAgainst: 31,
      xgFor: 71.2,
      xgAgainst: 29.8,
      avgPossession: 63.5,
      ppda: 8.7,
      fieldTilt: 65.2,
    }
  }
];

export const PLAYERS = [
  {
    id: "p1",
    name: "Erling Haaland",
    teamId: "mci",
    teamName: "Manchester City",
    position: "ST",
    age: 24,
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200",
    stats: {
      goals: 27,
      xg: 25.4,
      assists: 5,
      xa: 3.2,
      shots: 98,
      shotsOnTarget: 56,
      keyPasses: 22,
      dribblesCompleted: 18,
      minutesPlayed: 2450,
      passAccuracy: 78.5,
      progressiveCarries: 34,
      defensiveActions: 12
    },
    percentiles: {
      xgPer90: 98,
      shotsPer90: 95,
      goalsPer90: 99,
      xaPer90: 45,
      progressiveCarries: 52,
      pressures: 62
    }
  },
  {
    id: "p2",
    name: "Kevin De Bruyne",
    teamId: "mci",
    teamName: "Manchester City",
    position: "CAM",
    age: 33,
    stats: {
      goals: 7,
      xg: 5.8,
      assists: 16,
      xa: 14.8,
      shots: 52,
      shotsOnTarget: 22,
      keyPasses: 88,
      dribblesCompleted: 35,
      minutesPlayed: 1820,
      passAccuracy: 84.2,
      progressiveCarries: 78,
      defensiveActions: 38
    },
    percentiles: {
      xgPer90: 72,
      shotsPer90: 78,
      goalsPer90: 70,
      xaPer90: 99,
      progressiveCarries: 92,
      pressures: 55
    }
  },
  {
    id: "p3",
    name: "Bukayo Saka",
    teamId: "ars",
    teamName: "Arsenal",
    position: "RW",
    age: 23,
    stats: {
      goals: 16,
      xg: 14.2,
      assists: 11,
      xa: 10.5,
      shots: 72,
      shotsOnTarget: 34,
      keyPasses: 68,
      dribblesCompleted: 58,
      minutesPlayed: 2580,
      passAccuracy: 81.0,
      progressiveCarries: 112,
      defensiveActions: 46
    },
    percentiles: {
      xgPer90: 88,
      shotsPer90: 82,
      goalsPer90: 90,
      xaPer90: 92,
      progressiveCarries: 94,
      pressures: 78
    }
  },
  {
    id: "p4",
    name: "Mohamed Salah",
    teamId: "liv",
    teamName: "Liverpool",
    position: "RW",
    age: 32,
    stats: {
      goals: 21,
      xg: 20.8,
      assists: 10,
      xa: 9.8,
      shots: 92,
      shotsOnTarget: 48,
      keyPasses: 62,
      dribblesCompleted: 42,
      minutesPlayed: 2510,
      passAccuracy: 76.4,
      progressiveCarries: 86,
      defensiveActions: 24
    },
    percentiles: {
      xgPer90: 95,
      shotsPer90: 92,
      goalsPer90: 96,
      xaPer90: 89,
      progressiveCarries: 85,
      pressures: 48
    }
  },
  {
    id: "p5",
    name: "Jude Bellingham",
    teamId: "rma",
    teamName: "Real Madrid",
    position: "CAM",
    age: 21,
    stats: {
      goals: 19,
      xg: 16.5,
      assists: 8,
      xa: 7.1,
      shots: 64,
      shotsOnTarget: 31,
      keyPasses: 54,
      dribblesCompleted: 62,
      minutesPlayed: 2400,
      passAccuracy: 88.3,
      progressiveCarries: 95,
      defensiveActions: 68
    },
    percentiles: {
      xgPer90: 91,
      shotsPer90: 76,
      goalsPer90: 94,
      xaPer90: 82,
      progressiveCarries: 91,
      pressures: 88
    }
  },
  {
    id: "p6",
    name: "Kylian Mbappé",
    teamId: "rma",
    teamName: "Real Madrid",
    position: "ST",
    age: 25,
    stats: {
      goals: 29,
      xg: 27.2,
      assists: 7,
      xa: 6.5,
      shots: 112,
      shotsOnTarget: 62,
      keyPasses: 45,
      dribblesCompleted: 88,
      minutesPlayed: 2600,
      passAccuracy: 82.1,
      progressiveCarries: 135,
      defensiveActions: 18
    },
    percentiles: {
      xgPer90: 99,
      shotsPer90: 98,
      goalsPer90: 99,
      xaPer90: 78,
      progressiveCarries: 98,
      pressures: 35
    }
  },
  {
    id: "p7",
    name: "Lamine Yamal",
    teamId: "bar",
    teamName: "FC Barcelona",
    position: "RW",
    age: 17,
    stats: {
      goals: 9,
      xg: 8.4,
      assists: 12,
      xa: 11.2,
      shots: 58,
      shotsOnTarget: 25,
      keyPasses: 74,
      dribblesCompleted: 94,
      minutesPlayed: 2200,
      passAccuracy: 83.6,
      progressiveCarries: 128,
      defensiveActions: 32
    },
    percentiles: {
      xgPer90: 78,
      shotsPer90: 72,
      goalsPer90: 80,
      xaPer90: 95,
      progressiveCarries: 97,
      pressures: 65
    }
  },
  {
    id: "p8",
    name: "Harry Kane",
    teamId: "bay",
    teamName: "Bayern Munich",
    position: "ST",
    age: 31,
    stats: {
      goals: 32,
      xg: 29.8,
      assists: 9,
      xa: 8.1,
      shots: 105,
      shotsOnTarget: 58,
      keyPasses: 48,
      dribblesCompleted: 24,
      minutesPlayed: 2700,
      passAccuracy: 79.2,
      progressiveCarries: 42,
      defensiveActions: 28
    },
    percentiles: {
      xgPer90: 99,
      shotsPer90: 96,
      goalsPer90: 99,
      xaPer90: 85,
      progressiveCarries: 58,
      pressures: 52
    }
  }
];

export const MATCHES = [
  {
    id: "m1",
    date: "2025-03-02",
    competition: "UEFA Champions League Quarter-Final",
    homeTeam: TEAMS[0], // MCI
    awayTeam: TEAMS[3], // RMA
    score: { home: 3, away: 2 },
    xg: { home: 2.84, away: 1.42 },
    possession: { home: 62, away: 38 },
    shots: { home: 18, away: 9 },
    shotsOnTarget: { home: 8, away: 4 },
    passes: { home: 640, away: 390 },
    passAccuracy: { home: 89, away: 82 },
    timelineEvents: [
      { minute: 12, type: "goal", team: "mci", player: "Erling Haaland", score: "1-0", xg: 0.76 },
      { minute: 28, type: "goal", team: "rma", player: "Kylian Mbappé", score: "1-1", xg: 0.42 },
      { minute: 41, type: "goal", team: "mci", player: "Kevin De Bruyne", score: "2-1", xg: 0.18 },
      { minute: 67, type: "goal", team: "rma", player: "Jude Bellingham", score: "2-2", xg: 0.55 },
      { minute: 84, type: "goal", team: "mci", player: "Erling Haaland", score: "3-2", xg: 0.68 },
    ],
    xgFlow: [
      { minute: 0, homeXg: 0, awayXg: 0 },
      { minute: 10, homeXg: 0.12, awayXg: 0.05 },
      { minute: 12, homeXg: 0.88, awayXg: 0.05 },
      { minute: 25, homeXg: 1.05, awayXg: 0.22 },
      { minute: 28, homeXg: 1.05, awayXg: 0.64 },
      { minute: 41, homeXg: 1.23, awayXg: 0.64 },
      { minute: 45, homeXg: 1.45, awayXg: 0.70 },
      { minute: 60, homeXg: 1.82, awayXg: 0.85 },
      { minute: 67, homeXg: 1.82, awayXg: 1.40 },
      { minute: 80, homeXg: 2.16, awayXg: 1.42 },
      { minute: 84, homeXg: 2.84, awayXg: 1.42 },
      { minute: 90, homeXg: 2.84, awayXg: 1.42 }
    ]
  },
  {
    id: "m2",
    date: "2025-02-18",
    competition: "Premier League Classic",
    homeTeam: TEAMS[1], // ARS
    awayTeam: TEAMS[2], // LIV
    score: { home: 2, away: 2 },
    xg: { home: 1.95, away: 2.10 },
    possession: { home: 51, away: 49 },
    shots: { home: 14, away: 16 },
    shotsOnTarget: { home: 5, away: 6 },
    passes: { home: 480, away: 465 },
    passAccuracy: { home: 84, away: 83 },
    timelineEvents: [
      { minute: 19, type: "goal", team: "ars", player: "Bukayo Saka", score: "1-0", xg: 0.35 },
      { minute: 34, type: "goal", team: "liv", player: "Mohamed Salah", score: "1-1", xg: 0.62 },
      { minute: 58, type: "goal", team: "liv", player: "Darwin Núñez", score: "1-2", xg: 0.48 },
      { minute: 76, type: "goal", team: "ars", player: "Kai Havertz", score: "2-2", xg: 0.52 },
    ],
    xgFlow: [
      { minute: 0, homeXg: 0, awayXg: 0 },
      { minute: 19, homeXg: 0.35, awayXg: 0.10 },
      { minute: 34, homeXg: 0.55, awayXg: 0.72 },
      { minute: 45, homeXg: 0.80, awayXg: 0.95 },
      { minute: 58, homeXg: 1.10, awayXg: 1.43 },
      { minute: 76, homeXg: 1.62, awayXg: 1.85 },
      { minute: 90, homeXg: 1.95, awayXg: 2.10 }
    ]
  }
];

// Pre-generated high fidelity pitch shots (Coordinates: x: 0-100 attacking, y: 0-100 pitch width, goal at x=100, y=50)
export const SHOTS_DATA = [
  // Goals
  { id: "s1", player: "Erling Haaland", team: "Manchester City", teamId: "mci", x: 92, y: 52, xg: 0.76, outcome: "Goal", bodyPart: "Left Foot", minute: 12, situation: "Open Play" },
  { id: "s2", player: "Erling Haaland", team: "Manchester City", teamId: "mci", x: 88, y: 46, xg: 0.68, outcome: "Goal", bodyPart: "Header", minute: 84, situation: "Corner" },
  { id: "s3", player: "Kevin De Bruyne", team: "Manchester City", teamId: "mci", x: 78, y: 35, xg: 0.18, outcome: "Goal", bodyPart: "Right Foot", minute: 41, situation: "Open Play" },
  { id: "s4", player: "Kylian Mbappé", team: "Real Madrid", teamId: "rma", x: 89, y: 44, xg: 0.42, outcome: "Goal", bodyPart: "Right Foot", minute: 28, situation: "Fast Break" },
  { id: "s5", player: "Jude Bellingham", team: "Real Madrid", teamId: "rma", x: 91, y: 51, xg: 0.55, outcome: "Goal", bodyPart: "Header", minute: 67, situation: "Open Play" },
  { id: "s6", player: "Bukayo Saka", team: "Arsenal", teamId: "ars", x: 84, y: 32, xg: 0.35, outcome: "Goal", bodyPart: "Left Foot", minute: 19, situation: "Open Play" },
  { id: "s7", player: "Mohamed Salah", team: "Liverpool", teamId: "liv", x: 89, y: 40, xg: 0.62, outcome: "Goal", bodyPart: "Left Foot", minute: 34, situation: "Penalty" },
  { id: "s8", player: "Harry Kane", team: "Bayern Munich", teamId: "bay", x: 85, y: 50, xg: 0.48, outcome: "Goal", bodyPart: "Right Foot", minute: 55, situation: "Open Play" },
  { id: "s9", player: "Lamine Yamal", team: "FC Barcelona", teamId: "bar", x: 82, y: 28, xg: 0.22, outcome: "Goal", bodyPart: "Left Foot", minute: 73, situation: "Open Play" },

  // Saved Shots
  { id: "s10", player: "Erling Haaland", team: "Manchester City", teamId: "mci", x: 89, y: 54, xg: 0.52, outcome: "Saved", bodyPart: "Left Foot", minute: 22, situation: "Open Play" },
  { id: "s11", player: "Kylian Mbappé", team: "Real Madrid", teamId: "rma", x: 82, y: 62, xg: 0.21, outcome: "Saved", bodyPart: "Right Foot", minute: 39, situation: "Open Play" },
  { id: "s12", player: "Bukayo Saka", team: "Arsenal", teamId: "ars", x: 86, y: 38, xg: 0.29, outcome: "Saved", bodyPart: "Left Foot", minute: 52, situation: "Open Play" },
  { id: "s13", player: "Mohamed Salah", team: "Liverpool", teamId: "liv", x: 93, y: 48, xg: 0.71, outcome: "Saved", bodyPart: "Header", minute: 61, situation: "Corner" },
  { id: "s14", player: "Jude Bellingham", team: "Real Madrid", teamId: "rma", x: 79, y: 45, xg: 0.14, outcome: "Saved", bodyPart: "Right Foot", minute: 78, situation: "Open Play" },

  // Missed Shots
  { id: "s15", player: "Kevin De Bruyne", team: "Manchester City", teamId: "mci", x: 74, y: 68, xg: 0.08, outcome: "Missed", bodyPart: "Right Foot", minute: 15, situation: "Free Kick" },
  { id: "s16", player: "Erling Haaland", team: "Manchester City", teamId: "mci", x: 94, y: 42, xg: 0.61, outcome: "Missed", bodyPart: "Header", minute: 48, situation: "Open Play" },
  { id: "s17", player: "Harry Kane", team: "Bayern Munich", teamId: "bay", x: 77, y: 55, xg: 0.12, outcome: "Missed", bodyPart: "Right Foot", minute: 30, situation: "Open Play" },
  { id: "s18", player: "Lamine Yamal", team: "FC Barcelona", teamId: "bar", x: 80, y: 25, xg: 0.15, outcome: "Missed", bodyPart: "Left Foot", minute: 64, situation: "Open Play" },

  // Blocked Shots
  { id: "s19", player: "Bukayo Saka", team: "Arsenal", teamId: "ars", x: 83, y: 36, xg: 0.19, outcome: "Blocked", bodyPart: "Left Foot", minute: 33, situation: "Open Play" },
  { id: "s20", player: "Mohamed Salah", team: "Liverpool", teamId: "liv", x: 85, y: 42, xg: 0.24, outcome: "Blocked", bodyPart: "Left Foot", minute: 81, situation: "Open Play" },
  { id: "s21", player: "Kylian Mbappé", team: "Real Madrid", teamId: "rma", x: 88, y: 58, xg: 0.38, outcome: "Blocked", bodyPart: "Right Foot", minute: 88, situation: "Open Play" },
];

// Tactical Formations and Passing Network Data
export const PASSING_NETWORKS = {
  mci: {
    team: "Manchester City",
    formation: "4-3-3",
    nodes: [
      { id: "p1", name: "Ederson", number: 31, pos: "GK", x: 10, y: 50, passesCount: 38 },
      { id: "p2", name: "Walker", number: 2, pos: "RB", x: 35, y: 18, passesCount: 62 },
      { id: "p3", name: "Dias", number: 3, pos: "CB", x: 28, y: 38, passesCount: 84 },
      { id: "p4", name: "Akanji", number: 25, pos: "CB", x: 28, y: 62, passesCount: 78 },
      { id: "p5", name: "Gvardiol", number: 24, pos: "LB", x: 38, y: 82, passesCount: 71 },
      { id: "p6", name: "Rodri", number: 16, pos: "CDM", x: 46, y: 50, passesCount: 112 },
      { id: "p7", name: "De Bruyne", number: 17, pos: "CAM", x: 68, y: 32, passesCount: 65 },
      { id: "p8", name: "Bernardo", number: 20, pos: "CAM", x: 64, y: 68, passesCount: 74 },
      { id: "p9", name: "Foden", number: 47, pos: "RW", x: 75, y: 18, passesCount: 48 },
      { id: "p10", name: "Grealish", number: 10, pos: "LW", x: 72, y: 82, passesCount: 52 },
      { id: "p11", name: "Haaland", number: 9, pos: "ST", x: 86, y: 50, passesCount: 22 },
    ],
    links: [
      { source: "p3", target: "p6", passes: 28 },
      { source: "p4", target: "p6", passes: 25 },
      { source: "p6", target: "p7", passes: 32 },
      { source: "p6", target: "p8", passes: 29 },
      { source: "p7", target: "p9", passes: 22 },
      { source: "p7", target: "p11", passes: 18 },
      { source: "p8", target: "p10", passes: 24 },
      { source: "p5", target: "p10", passes: 26 },
      { source: "p2", target: "p9", passes: 20 },
      { source: "p3", target: "p4", passes: 35 },
    ]
  },
  rma: {
    team: "Real Madrid",
    formation: "4-3-1-2",
    nodes: [
      { id: "r1", name: "Courtois", number: 1, pos: "GK", x: 10, y: 50, passesCount: 32 },
      { id: "r2", name: "Carvajal", number: 2, pos: "RB", x: 34, y: 18, passesCount: 55 },
      { id: "r3", name: "Rüdiger", number: 22, pos: "CB", x: 26, y: 38, passesCount: 68 },
      { id: "r4", name: "Militao", number: 3, pos: "CB", x: 26, y: 62, passesCount: 64 },
      { id: "r5", name: "Mendy", number: 23, pos: "LB", x: 32, y: 82, passesCount: 48 },
      { id: "r6", name: "Tchouameni", number: 14, pos: "CDM", x: 44, y: 50, passesCount: 82 },
      { id: "r7", name: "Valverde", number: 8, pos: "CM", x: 55, y: 28, passesCount: 60 },
      { id: "r8", name: "Camavinga", number: 6, pos: "CM", x: 52, y: 72, passesCount: 58 },
      { id: "r9", name: "Bellingham", number: 5, pos: "CAM", x: 68, y: 50, passesCount: 54 },
      { id: "r10", name: "Vinicius Jr", number: 7, pos: "ST", x: 82, y: 75, passesCount: 38 },
      { id: "r11", name: "Mbappé", number: 9, pos: "ST", x: 84, y: 30, passesCount: 31 },
    ],
    links: [
      { source: "r3", target: "r6", passes: 22 },
      { source: "r6", target: "r7", passes: 26 },
      { source: "r6", target: "r8", passes: 24 },
      { source: "r7", target: "r9", passes: 28 },
      { source: "r9", target: "r11", passes: 20 },
      { source: "r9", target: "r10", passes: 22 },
      { source: "r8", target: "r10", passes: 19 },
      { source: "r2", target: "r7", passes: 25 },
      { source: "r11", target: "r10", passes: 14 },
    ]
  }
};
