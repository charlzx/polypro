import { useQuery } from "@tanstack/react-query";

// Types for market data
export interface TransformedMarket {
  id: string;
  name: string;
  description: string;
  category: string;
  yesOdds: number;
  noOdds: number;
  change24h: number;
  volume: string;
  volume24h: string;
  liquidity: string;
  endDate: string;
  active: boolean;
  image?: string;
  slug: string;
}

// Realistic mock markets based on actual Polymarket-style questions
const MOCK_MARKETS: TransformedMarket[] = [
  {
    id: "1",
    name: "Will Bitcoin reach $150,000 by end of 2026?",
    description: "This market will resolve to 'Yes' if Bitcoin (BTC) reaches or exceeds $150,000 USD at any point before December 31, 2026 11:59 PM ET.",
    category: "Crypto",
    yesOdds: 42,
    noOdds: 58,
    change24h: 3.2,
    volume: "$12.4M",
    volume24h: "$892K",
    liquidity: "$1.2M",
    endDate: "2026-12-31",
    active: true,
    slug: "bitcoin-150k-2026",
  },
  {
    id: "2",
    name: "Will the Federal Reserve cut rates in Q1 2026?",
    description: "This market will resolve to 'Yes' if the Federal Reserve announces a rate cut during Q1 2026 (January - March).",
    category: "Economics",
    yesOdds: 67,
    noOdds: 33,
    change24h: -1.5,
    volume: "$8.7M",
    volume24h: "$456K",
    liquidity: "$890K",
    endDate: "2026-03-31",
    active: true,
    slug: "fed-rate-cut-q1-2026",
  },
  {
    id: "3",
    name: "Will Ethereum flip Bitcoin market cap in 2026?",
    description: "This market resolves 'Yes' if Ethereum's market capitalization exceeds Bitcoin's at any point during 2026.",
    category: "Crypto",
    yesOdds: 18,
    noOdds: 82,
    change24h: 0.8,
    volume: "$5.2M",
    volume24h: "$234K",
    liquidity: "$567K",
    endDate: "2026-12-31",
    active: true,
    slug: "eth-flip-btc-2026",
  },
  {
    id: "4",
    name: "Will OpenAI release GPT-5 by July 2026?",
    description: "Resolves 'Yes' if OpenAI publicly releases or announces general availability of GPT-5 before July 1, 2026.",
    category: "Tech",
    yesOdds: 78,
    noOdds: 22,
    change24h: 5.4,
    volume: "$15.8M",
    volume24h: "$1.2M",
    liquidity: "$2.1M",
    endDate: "2026-07-01",
    active: true,
    slug: "openai-gpt5-july-2026",
  },
  {
    id: "5",
    name: "Will SpaceX complete Starship orbital flight by March 2026?",
    description: "This market resolves 'Yes' if SpaceX successfully completes a full orbital flight with Starship before March 31, 2026.",
    category: "Tech",
    yesOdds: 85,
    noOdds: 15,
    change24h: 2.1,
    volume: "$9.3M",
    volume24h: "$678K",
    liquidity: "$1.5M",
    endDate: "2026-03-31",
    active: true,
    slug: "spacex-starship-orbital-2026",
  },
  {
    id: "6",
    name: "Will US inflation drop below 2% in 2026?",
    description: "Resolves 'Yes' if the US CPI year-over-year inflation rate drops below 2% at any point during 2026.",
    category: "Economics",
    yesOdds: 34,
    noOdds: 66,
    change24h: -0.7,
    volume: "$4.1M",
    volume24h: "$189K",
    liquidity: "$445K",
    endDate: "2026-12-31",
    active: true,
    slug: "us-inflation-below-2-2026",
  },
  {
    id: "7",
    name: "Will Apple release AR glasses in 2026?",
    description: "This market resolves 'Yes' if Apple announces and releases consumer AR glasses (not Vision Pro) in 2026.",
    category: "Tech",
    yesOdds: 29,
    noOdds: 71,
    change24h: 1.2,
    volume: "$6.7M",
    volume24h: "$312K",
    liquidity: "$678K",
    endDate: "2026-12-31",
    active: true,
    slug: "apple-ar-glasses-2026",
  },
  {
    id: "8",
    name: "Will Solana reach $500 in 2026?",
    description: "Resolves 'Yes' if Solana (SOL) reaches or exceeds $500 USD at any point during 2026.",
    category: "Crypto",
    yesOdds: 23,
    noOdds: 77,
    change24h: 4.6,
    volume: "$7.8M",
    volume24h: "$567K",
    liquidity: "$890K",
    endDate: "2026-12-31",
    active: true,
    slug: "solana-500-2026",
  },
  {
    id: "9",
    name: "Will there be a US recession in 2026?",
    description: "This market resolves 'Yes' if the NBER declares a recession that includes any months in 2026.",
    category: "Economics",
    yesOdds: 31,
    noOdds: 69,
    change24h: -2.3,
    volume: "$11.2M",
    volume24h: "$789K",
    liquidity: "$1.3M",
    endDate: "2026-12-31",
    active: true,
    slug: "us-recession-2026",
  },
  {
    id: "10",
    name: "Will Tesla deliver 3 million vehicles in 2026?",
    description: "Resolves 'Yes' if Tesla reports total vehicle deliveries of 3 million or more for calendar year 2026.",
    category: "Tech",
    yesOdds: 52,
    noOdds: 48,
    change24h: 1.8,
    volume: "$8.9M",
    volume24h: "$445K",
    liquidity: "$923K",
    endDate: "2026-12-31",
    active: true,
    slug: "tesla-3m-deliveries-2026",
  },
  {
    id: "11",
    name: "Will Netflix stock exceed $1000 in 2026?",
    description: "This market resolves 'Yes' if Netflix (NFLX) stock price reaches or exceeds $1000 at any point during 2026.",
    category: "Entertainment",
    yesOdds: 41,
    noOdds: 59,
    change24h: 0.5,
    volume: "$3.4M",
    volume24h: "$156K",
    liquidity: "$345K",
    endDate: "2026-12-31",
    active: true,
    slug: "netflix-1000-2026",
  },
  {
    id: "12",
    name: "Will Super Bowl LX have over 120M US viewers?",
    description: "Resolves 'Yes' if Super Bowl LX (February 2026) attracts more than 120 million US viewers according to Nielsen.",
    category: "Sports",
    yesOdds: 73,
    noOdds: 27,
    change24h: 0.9,
    volume: "$2.1M",
    volume24h: "$98K",
    liquidity: "$234K",
    endDate: "2026-02-15",
    active: true,
    slug: "super-bowl-lx-viewers",
  },
  {
    id: "13",
    name: "Will China land astronauts on the Moon by 2026?",
    description: "This market resolves 'Yes' if China successfully lands astronauts on the Moon before December 31, 2026.",
    category: "Tech",
    yesOdds: 8,
    noOdds: 92,
    change24h: -0.2,
    volume: "$1.8M",
    volume24h: "$67K",
    liquidity: "$189K",
    endDate: "2026-12-31",
    active: true,
    slug: "china-moon-landing-2026",
  },
  {
    id: "14",
    name: "Will S&P 500 reach 7000 in 2026?",
    description: "Resolves 'Yes' if the S&P 500 index reaches or exceeds 7000 points at any time during 2026.",
    category: "Economics",
    yesOdds: 56,
    noOdds: 44,
    change24h: 2.7,
    volume: "$14.5M",
    volume24h: "$934K",
    liquidity: "$1.8M",
    endDate: "2026-12-31",
    active: true,
    slug: "sp500-7000-2026",
  },
  {
    id: "15",
    name: "Will Nvidia remain the largest company by market cap through 2026?",
    description: "This market resolves 'Yes' if Nvidia maintains the #1 position by market cap for the entirety of 2026.",
    category: "Tech",
    yesOdds: 38,
    noOdds: 62,
    change24h: -1.9,
    volume: "$10.2M",
    volume24h: "$723K",
    liquidity: "$1.1M",
    endDate: "2026-12-31",
    active: true,
    slug: "nvidia-largest-cap-2026",
  },
  {
    id: "16",
    name: "Will XRP reach $10 in 2026?",
    description: "Resolves 'Yes' if XRP reaches or exceeds $10 USD at any point during 2026.",
    category: "Crypto",
    yesOdds: 12,
    noOdds: 88,
    change24h: 6.2,
    volume: "$4.6M",
    volume24h: "$389K",
    liquidity: "$512K",
    endDate: "2026-12-31",
    active: true,
    slug: "xrp-10-2026",
  },
  {
    id: "17",
    name: "Will the Chiefs win Super Bowl LX?",
    description: "This market resolves 'Yes' if the Kansas City Chiefs win Super Bowl LX in February 2026.",
    category: "Sports",
    yesOdds: 22,
    noOdds: 78,
    change24h: 3.4,
    volume: "$5.8M",
    volume24h: "$423K",
    liquidity: "$678K",
    endDate: "2026-02-15",
    active: true,
    slug: "chiefs-super-bowl-lx",
  },
  {
    id: "18",
    name: "Will a major AI company face antitrust action in 2026?",
    description: "Resolves 'Yes' if the US DOJ or FTC files formal antitrust charges against a major AI company (OpenAI, Google, Microsoft, Anthropic) in 2026.",
    category: "Tech",
    yesOdds: 45,
    noOdds: 55,
    change24h: 1.1,
    volume: "$3.2M",
    volume24h: "$178K",
    liquidity: "$289K",
    endDate: "2026-12-31",
    active: true,
    slug: "ai-antitrust-2026",
  },
  {
    id: "19",
    name: "Will gold reach $3000/oz in 2026?",
    description: "This market resolves 'Yes' if gold spot price reaches or exceeds $3000 per ounce at any point during 2026.",
    category: "Economics",
    yesOdds: 61,
    noOdds: 39,
    change24h: 0.4,
    volume: "$6.1M",
    volume24h: "$298K",
    liquidity: "$567K",
    endDate: "2026-12-31",
    active: true,
    slug: "gold-3000-2026",
  },
  {
    id: "20",
    name: "Will Anthropic release Claude 4 by mid-2026?",
    description: "Resolves 'Yes' if Anthropic publicly releases Claude 4 (or successor named model) before July 1, 2026.",
    category: "Tech",
    yesOdds: 71,
    noOdds: 29,
    change24h: 2.8,
    volume: "$7.4M",
    volume24h: "$534K",
    liquidity: "$812K",
    endDate: "2026-07-01",
    active: true,
    slug: "anthropic-claude4-2026",
  },
];

// Add slight randomness to simulate real-time changes
function addVariation(market: TransformedMarket): TransformedMarket {
  const variation = (Math.random() - 0.5) * 2;
  const newYesOdds = Math.max(1, Math.min(99, market.yesOdds + Math.round(variation)));
  return {
    ...market,
    yesOdds: newYesOdds,
    noOdds: 100 - newYesOdds,
    change24h: parseFloat((market.change24h + (Math.random() - 0.5) * 0.5).toFixed(1)),
  };
}

// Simulate fetching markets
async function fetchMarkets(params?: {
  limit?: number;
  offset?: number;
  active?: boolean;
}): Promise<TransformedMarket[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));
  
  const limit = params?.limit || 20;
  const offset = params?.offset || 0;
  
  // Apply variations to simulate real-time data
  const markets = MOCK_MARKETS.slice(offset, offset + limit).map(addVariation);
  
  return markets;
}

// Fetch single market by ID
async function fetchMarketById(id: string): Promise<TransformedMarket | null> {
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 150));
  
  const market = MOCK_MARKETS.find((m) => m.id === id);
  if (!market) return null;
  
  return addVariation(market);
}

// Search markets
async function searchMarkets(query: string): Promise<TransformedMarket[]> {
  if (!query.trim()) return [];
  
  await new Promise((resolve) => setTimeout(resolve, 150 + Math.random() * 100));
  
  const lowerQuery = query.toLowerCase();
  const results = MOCK_MARKETS.filter(
    (m) =>
      m.name.toLowerCase().includes(lowerQuery) ||
      m.category.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery)
  ).map(addVariation);
  
  return results.slice(0, 20);
}

// React Query hooks
export function useMarkets(params?: {
  limit?: number;
  offset?: number;
  active?: boolean;
}) {
  return useQuery({
    queryKey: ["markets", params],
    queryFn: () => fetchMarkets(params),
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
}

export function useMarket(id: string) {
  return useQuery({
    queryKey: ["market", id],
    queryFn: () => fetchMarketById(id),
    staleTime: 15 * 1000,
    enabled: !!id,
  });
}

export function useMarketSearch(query: string) {
  return useQuery({
    queryKey: ["marketSearch", query],
    queryFn: () => searchMarkets(query),
    staleTime: 30 * 1000,
    enabled: query.length >= 2,
  });
}

// Categories list
export const MARKET_CATEGORIES = [
  "All",
  "Politics",
  "Crypto",
  "Sports",
  "Economics",
  "Tech",
  "Entertainment",
  "General",
] as const;

export type MarketCategory = (typeof MARKET_CATEGORIES)[number];
