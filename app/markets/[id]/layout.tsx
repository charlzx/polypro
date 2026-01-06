import type { Metadata } from "next";

// Mock markets data - same as in polymarket.ts service
const MOCK_MARKETS = [
  {
    id: "1",
    name: "Will Bitcoin reach $150,000 by end of 2026?",
    yesOdds: 42,
  },
  {
    id: "2",
    name: "Will the Federal Reserve cut rates in Q1 2026?",
    yesOdds: 67,
  },
  {
    id: "3",
    name: "Will Ethereum flip Bitcoin market cap in 2026?",
    yesOdds: 18,
  },
  {
    id: "4",
    name: "Will OpenAI release GPT-5 by July 2026?",
    yesOdds: 78,
  },
  {
    id: "5",
    name: "Will SpaceX complete Starship orbital flight by March 2026?",
    yesOdds: 85,
  },
  {
    id: "6",
    name: "Will US inflation drop below 2% in 2026?",
    yesOdds: 34,
  },
  {
    id: "7",
    name: "Will Apple release Vision Pro 2 in 2026?",
    yesOdds: 56,
  },
  {
    id: "8",
    name: "Will Tesla Cybertruck sales exceed 100k units in 2026?",
    yesOdds: 63,
  },
  {
    id: "9",
    name: "Will any country ban TikTok nationwide in 2026?",
    yesOdds: 41,
  },
  {
    id: "10",
    name: "Will NVIDIA stock reach $2000 by end of 2026?",
    yesOdds: 29,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const market = MOCK_MARKETS.find((m) => m.id === id);

  if (market) {
    return {
      title: market.name,
      description: `Market odds: ${market.yesOdds}% Yes / ${100 - market.yesOdds}% No. View detailed market data, predictions, and analysis.`,
    };
  }

  return {
    title: "Market Details",
  };
}

export default function MarketDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
