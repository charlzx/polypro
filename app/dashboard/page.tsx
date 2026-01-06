"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { AppHeader } from "@/components/AppHeader";
import {
  ArrowRight,
  ArrowsCounterClockwise,
  Broadcast,
  CaretDown,
  TrendUp,
  TrendDown,
  Wallet,
  ChartLine,
  BellRinging,
  Lightning,
} from "@phosphor-icons/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { quickStats } from "@/data/quickStats";
import { recentAlerts } from "@/data/alerts";

// Mock hooks - replace with your actual implementation
const useUser = () => {
  return {
    name: "Alex Chen",
    tier: "pro",
  };
};

const useMarkets = ({ limit, active }: { limit?: number; active?: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData([
        {
          id: "1",
          question: "Will Bitcoin reach $100k in 2025?",
          category: "Crypto",
          yesOdds: 67,
          noOdds: 33,
          volume: 2500000,
          change: 5.2,
        },
        {
          id: "2",
          question: "Will AI replace 25% of jobs by 2030?",
          category: "Technology",
          yesOdds: 45,
          noOdds: 55,
          volume: 1800000,
          change: -2.3,
        },
        {
          id: "3",
          question: "Will Tesla stock hit $500 in 2025?",
          category: "Finance",
          yesOdds: 52,
          noOdds: 48,
          volume: 3200000,
          change: 8.1,
        },
        {
          id: "4",
          question: "Will there be a recession in 2025?",
          category: "Economics",
          yesOdds: 38,
          noOdds: 62,
          volume: 2100000,
          change: -4.5,
        },
        {
          id: "5",
          question: "Will SpaceX land on Mars by 2030?",
          category: "Space",
          yesOdds: 41,
          noOdds: 59,
          volume: 1500000,
          change: 3.7,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return {
    data: limit ? data.slice(0, limit) : data,
    isLoading,
    error: null,
    refetch: () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    },
  };
};

const useMarketWebSocket = (marketIds: string[]) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection
    setIsConnected(true);
    return () => setIsConnected(false);
  }, [marketIds]);

  return { isConnected };
};

// Helper function
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Market Skeleton Component
const MarketSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <div className="flex gap-2">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
    </div>
  </div>
);

// CollapsibleCard Component
interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

const CollapsibleCard = ({
  title,
  children,
  defaultOpen = false,
  badge,
  actions,
}: CollapsibleCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isMobile = useIsMobile();

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className={`flex flex-row items-center justify-between p-4 md:p-5 pb-3 ${
          isMobile ? "cursor-pointer" : ""
        }`}
        onClick={() => isMobile && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <CardTitle className="text-subtitle">{title}</CardTitle>
          {badge}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {isMobile && (
            <motion.div
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <CaretDown weight="bold" className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          )}
        </div>
      </CardHeader>
      {(!isMobile || isOpen) && (
        <motion.div
          initial={false}
          animate={{
            height: isOpen || !isMobile ? "auto" : 0,
            opacity: isOpen || !isMobile ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <CardContent className="p-4 md:p-5 pt-0">{children}</CardContent>
        </motion.div>
      )}
    </Card>
  );
};

// SwipeableMarketCard Component
interface SwipeableMarketCardProps {
  market: {
    id: string;
    question: string;
    category: string;
    yesOdds: number;
    noOdds: number;
    volume: number;
    change: number;
  };
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}

const SwipeableMarketCard = ({
  market,
  onSwipeRight,
  onSwipeLeft,
}: SwipeableMarketCardProps) => {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ["oklch(58% 0.22 25)", "oklch(0% 0 0 / 0)", "oklch(45% 0.15 145)"]
  );
  const rightOpacity = useTransform(x, [0, 100], [0, 1]);
  const leftOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, { offset }: any) => {
    if (offset.x > 100) {
      onSwipeRight();
      x.set(0);
    } else if (offset.x < -100) {
      onSwipeLeft();
      x.set(0);
    }
  };

  return (
    <div className="relative">
      {/* Background indicators */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{ background }}
      >
        <motion.div
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-medium text-small"
          style={{ opacity: leftOpacity }}
        >
          Dismiss
        </motion.div>
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-medium text-small"
          style={{ opacity: rightOpacity }}
        >
          Add to Watchlist
        </motion.div>
      </motion.div>

      {/* Market card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative bg-card"
      >
        <Link href={`/markets/${market.id}`}>
          <Card className="hover:bg-secondary/50 transition-base cursor-pointer border-0 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium leading-tight line-clamp-2 mb-2">
                    {market.question}
                  </p>
                  <Badge variant="secondary" className="text-caption">
                    {market.category}
                  </Badge>
                </div>
                <div
                  className={`text-small font-medium shrink-0 ${
                    market.change >= 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  {market.change >= 0 ? "+" : ""}
                  {market.change}%
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 text-center p-2 rounded bg-success/10">
                  <div className="text-small text-muted-foreground mb-0.5">YES</div>
                  <div className="text-body font-bold text-success">{market.yesOdds}¢</div>
                </div>
                <div className="flex-1 text-center p-2 rounded bg-destructive/10">
                  <div className="text-small text-muted-foreground mb-0.5">NO</div>
                  <div className="text-body font-bold text-destructive">{market.noOdds}¢</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-small text-muted-foreground">
                <span>Volume</span>
                <span className="font-medium">
                  ${(market.volume / 1000000).toFixed(1)}M
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </div>
  );
};

// Main Dashboard Component
export default function DashboardPage() {
  const user = useUser();
  const { data: markets, isLoading, error, refetch } = useMarkets({ limit: 5, active: true });
  
  const marketIds = useMemo(() => markets?.map((m) => m.id) || [], [markets]);
  const { isConnected } = useMarketWebSocket(marketIds);

  // Use markets data directly since we don't have real WebSocket updates yet
  const liveMarkets = useMemo(() => markets || [], [markets]);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="pt-[120px] md:pt-[88px] pb-20 md:pb-0 min-h-screen">
        <div className="container max-w-screen-2xl py-6 md:py-8 space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-title md:text-display font-bold">
            {getGreeting()}, {user?.name?.split(" ")[0] || "Trader"}
          </h1>
          <Badge variant="secondary" className="capitalize text-caption w-fit">
            {user?.tier || "Free"}
          </Badge>
        </div>
        <p className="text-small text-muted-foreground">
          Here&apos;s what&apos;s happening in your markets today.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <Icon weight="duotone" className="h-5 w-5 text-muted-foreground shrink-0" />
                    {stat.change && (
                      <span
                        className={`text-small font-medium truncate ${
                          stat.positive ? "text-success" : "text-destructive"
                        }`}
                      >
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <div className="text-title md:text-display font-bold truncate">{stat.value}</div>
                  <div className="text-small text-muted-foreground mt-1 truncate">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid gap-6 lg:gap-8 lg:grid-cols-3"
      >
        {/* Trending Markets */}
        <div className="lg:col-span-2 min-w-0 overflow-hidden">
          <CollapsibleCard
            title="Trending Markets"
            badge={
              isConnected && (
                <Badge variant="secondary" className="text-caption gap-1 px-2 py-0.5">
                  <Broadcast weight="fill" className="h-2.5 w-2.5 text-success animate-pulse" />
                  Live
                </Badge>
              )
            }
            actions={
              !isLoading && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    refetch();
                  }}
                >
                  <ArrowsCounterClockwise weight="bold" className="h-3.5 w-3.5" />
                </Button>
              )
            }
          >
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {isLoading ? (
                [...Array(5)].map((_, i) => <MarketSkeleton key={i} />)
              ) : error ? (
                <div className="p-6 text-center">
                  <p className="text-small text-muted-foreground mb-3">
                    Failed to load markets
                  </p>
                  <Button variant="outline" size="sm" onClick={() => refetch()}>
                    Retry
                  </Button>
                </div>
              ) : liveMarkets && liveMarkets.length > 0 ? (
                liveMarkets.map((market) => (
                  <div key={market.id} className="min-w-0">
                    <SwipeableMarketCard
                      market={market}
                      onSwipeRight={() => console.log("Added to watchlist:", market.id)}
                      onSwipeLeft={() => console.log("Dismissed:", market.id)}
                    />
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground text-small">
                  No markets available
                </div>
              )}
            </div>

            <Button variant="ghost" size="sm" asChild className="w-full mt-4">
              <Link href="/markets" className="text-primary">
                View All Markets <ArrowRight weight="bold" className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CollapsibleCard>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <CollapsibleCard
            title="Recent Alerts"
            defaultOpen={true}
            actions={
              <Button variant="ghost" size="sm" asChild className="h-8 px-3 hidden md:flex">
                <Link href="/alerts" className="text-primary text-small">
                  View All
                </Link>
              </Button>
            }
          >
            <div className="space-y-3 max-h-[280px] overflow-y-auto">
              {recentAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-3 md:p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-base cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant="secondary" className="text-caption px-2 py-0.5">
                      {alert.type}
                    </Badge>
                    <span className="text-small text-muted-foreground">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-body font-medium truncate">{alert.market}</p>
                  <p className="text-small text-muted-foreground line-clamp-2 mt-1">
                    {alert.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <Button variant="ghost" size="sm" asChild className="w-full mt-4 md:hidden">
              <Link href="/alerts" className="text-primary">
                View All Alerts
              </Link>
            </Button>
          </CollapsibleCard>

          {/* Arbitrage Opportunities Preview */}
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-5 pb-3">
              <CardTitle className="text-subtitle">Arbitrage Opps</CardTitle>
              <Badge className="text-caption">Pro</Badge>
            </CardHeader>
            <CardContent className="p-4 md:p-5 pt-0">
              <div className="space-y-3 filter blur-sm">
                <div className="p-3 md:p-4 rounded-lg bg-secondary/50">
                  <p className="text-body font-medium">Bitcoin &gt;$100k</p>
                  <p className="text-small text-success">8.3% profit potential</p>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-secondary/50">
                  <p className="text-body font-medium">ETH &gt;$4,000</p>
                  <p className="text-small text-success">5.2% profit potential</p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-[2px]">
                <div className="text-center p-6">
                  <p className="text-body font-medium mb-3">
                    Upgrade to Pro to unlock
                  </p>
                  <Button size="sm" asChild>
                    <Link href="/pricing">View Plans</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
      </main>
    </div>
  );
}
