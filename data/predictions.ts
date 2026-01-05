/**
 * Mock prediction data for ticker display
 * This data simulates real-world prediction markets until API integration
 */

export interface Prediction {
  text: string;
  probability: number;
  change: number;
}

export const mockPredictions: Prediction[] = [
  { text: "Trump wins 2028", probability: 67, change: 5 },
  { text: "Bitcoin reaches $150k", probability: 43, change: -2 },
  { text: "AI passes Turing test", probability: 89, change: 12 },
  { text: "Recession in Q2 2026", probability: 31, change: -8 },
  { text: "Apple releases AR glasses", probability: 54, change: 3 },
  { text: "Lakers win NBA Finals", probability: 28, change: 6 },
  { text: "Fed cuts rates in 2026", probability: 72, change: 15 },
  { text: "SpaceX Mars landing", probability: 19, change: -4 },
  { text: "Ethereum hits $5k", probability: 81, change: 9 },
  { text: "Tesla reaches $500", probability: 45, change: -11 },
  { text: "OpenAI IPO in 2026", probability: 37, change: 8 },
  { text: "Nuclear fusion breakthrough", probability: 24, change: 3 },
  { text: "Climate bill passes Congress", probability: 56, change: -5 },
  { text: "Apple Vision Pro V2 ships", probability: 78, change: 14 },
  { text: "US debt ceiling raised", probability: 92, change: 7 },
];
