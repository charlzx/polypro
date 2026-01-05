/**
 * Arbitrage opportunities data
 * Mock data simulating cross-platform arbitrage detection
 */

export interface ArbitrageOpportunity {
  id: number;
  market: string;
  platform1: string;
  platform2: string;
  odds1: number;
  odds2: number;
  profit: number;
  capital: number;
  expectedReturn: number;
  timeDetected: string;
  status: "active" | "fading" | "expired";
}

export const opportunities: ArbitrageOpportunity[] = [
  {
    id: 1,
    market: "Bitcoin to reach $150k by March 2027",
    platform1: "Polymarket",
    platform2: "Kalshi",
    odds1: 68,
    odds2: 62,
    profit: 8.3,
    capital: 1000,
    expectedReturn: 1083,
    timeDetected: "3 min ago",
    status: "active",
  },
  {
    id: 2,
    market: "Fed Rate Cut in Q1 2026",
    platform1: "Polymarket",
    platform2: "PredictIt",
    odds1: 44,
    odds2: 51,
    profit: 6.2,
    capital: 1500,
    expectedReturn: 1593,
    timeDetected: "12 min ago",
    status: "active",
  },
  {
    id: 3,
    market: "GPT-5 Release by June 2026",
    platform1: "Polymarket",
    platform2: "Kalshi",
    odds1: 71,
    odds2: 65,
    profit: 5.8,
    capital: 800,
    expectedReturn: 846,
    timeDetected: "28 min ago",
    status: "active",
  },
  {
    id: 4,
    market: "Tesla Stock >$500 EOY 2026",
    platform1: "Kalshi",
    platform2: "PredictIt",
    odds1: 42,
    odds2: 38,
    profit: 4.2,
    capital: 2000,
    expectedReturn: 2084,
    timeDetected: "45 min ago",
    status: "fading",
  },
  {
    id: 5,
    market: "Apple AR Glasses Launch 2026",
    platform1: "Polymarket",
    platform2: "Kalshi",
    odds1: 54,
    odds2: 48,
    profit: 7.1,
    capital: 1200,
    expectedReturn: 1285,
    timeDetected: "1 hour ago",
    status: "active",
  },
  {
    id: 6,
    market: "SpaceX Mars Landing 2026",
    platform1: "Kalshi",
    platform2: "PredictIt",
    odds1: 19,
    odds2: 15,
    profit: 9.4,
    capital: 500,
    expectedReturn: 547,
    timeDetected: "1 hour 20 min ago",
    status: "fading",
  },
];

export interface ArbitrageStat {
  label: string;
  value: string;
}

export const stats: ArbitrageStat[] = [
  { label: "Today's Opportunities", value: "24" },
  { label: "Average Profit", value: "6.8%" },
  { label: "Total Value Detected", value: "$124k" },
];
