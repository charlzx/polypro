"use client";

import { useState } from "react";
import {
  TrendUp,
  TrendDown,
  Wallet,
  Coins,
  Percent,
  ChartPie,
  ArrowUpRight,
  Plus,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

// Mock portfolio data
const portfolioStats = [
  { label: "Total Value", value: "8,247", icon: Coins, change: "+847", positive: true },
  {
    label: "Unrealized P&L",
    value: "+1,247",
    icon: TrendUp,
    change: "+17.8%",
    positive: true,
  },
  { label: "Realized P&L", value: "+892", icon: Coins, change: "This month", positive: true },
  { label: "Win Rate", value: "68%", icon: Percent, change: "23 trades", positive: true },
];

// Mock positions data
const positions = [
  {
    id: 1,
    market: "2024 Presidential Election - Democratic Victory",
    platform: "Polymarket",
    side: "YES",
    entryPrice: 0.45,
    currentPrice: 0.52,
    quantity: 200,
    pnl: 14.0,
    pnlPercent: 15.6,
  },
  {
    id: 2,
    market: "Bitcoin >$100k by March 2026",
    platform: "Polymarket",
    side: "YES",
    entryPrice: 0.62,
    currentPrice: 0.68,
    quantity: 150,
    pnl: 9.0,
    pnlPercent: 9.7,
  },
  {
    id: 3,
    market: "Fed Rate Cut Q1 2026",
    platform: "Polymarket",
    side: "NO",
    entryPrice: 0.58,
    currentPrice: 0.56,
    quantity: 100,
    pnl: -2.0,
    pnlPercent: -3.4,
  },
  {
    id: 4,
    market: "GPT-5 Release by June 2026",
    platform: "Polymarket",
    side: "YES",
    entryPrice: 0.65,
    currentPrice: 0.71,
    quantity: 80,
    pnl: 4.8,
    pnlPercent: 9.2,
  },
  {
    id: 5,
    market: "Tesla Stock >$300 EOY",
    platform: "Kalshi",
    side: "YES",
    entryPrice: 0.38,
    currentPrice: 0.42,
    quantity: 250,
    pnl: 10.0,
    pnlPercent: 10.5,
  },
];

// Generate performance chart data
const performanceData = [...Array(30)].map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: 7000 + Math.random() * 2000 + i * 40,
  };
});

// Category breakdown data
const categoryData = [
  { name: "Politics", value: 45, color: "oklch(45% 0.15 145)" },
  { name: "Crypto", value: 30, color: "oklch(58% 0.22 25)" },
  { name: "Sports", value: 15, color: "oklch(65% 0.15 250)" },
  { name: "Tech", value: 10, color: "oklch(55% 0.15 80)" },
];

export default function PortfolioPage() {
  const [timeframe, setTimeframe] = useState("30D");

  return (
    <div className="container max-w-screen-2xl py-6 md:py-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-title md:text-display font-bold">Portfolio</h1>
          <p className="text-small text-muted-foreground mt-1">
            Track your positions and performance
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {portfolioStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between mb-1 md:mb-2">
                  <Icon className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                  <span
                    className={`text-caption font-medium ${
                      stat.positive ? "text-success" : "text-destructive"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="text-subtitle md:text-title font-bold">{stat.value}</div>
                <div className="text-caption text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="positions" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* Positions Tab */}
        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader className="p-3 md:p-4 pb-2">
              <CardTitle className="text-body md:text-subtitle">
                Active Positions ({positions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <div className="overflow-x-auto">
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none lg:hidden z-10" />
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-caption font-medium text-muted-foreground text-left p-3">
                          Market
                        </th>
                        <th className="text-caption font-medium text-muted-foreground text-left p-3">
                          Side
                        </th>
                        <th className="text-caption font-medium text-muted-foreground text-right p-3">
                          Entry
                        </th>
                        <th className="text-caption font-medium text-muted-foreground text-right p-3">
                          Current
                        </th>
                        <th className="text-caption font-medium text-muted-foreground text-right p-3">
                          Qty
                        </th>
                        <th className="text-caption font-medium text-muted-foreground text-right p-3">
                          P&L
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((position) => (
                        <tr
                          key={position.id}
                          className="border-b border-border/50 hover:bg-secondary/50 transition-base"
                        >
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-small font-medium truncate max-w-[200px]">
                                {position.market}
                              </span>
                            </div>
                            <span className="text-caption text-muted-foreground">
                              {position.platform}
                            </span>
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={position.side === "YES" ? "default" : "secondary"}
                              className="text-caption"
                            >
                              {position.side}
                            </Badge>
                          </td>
                          <td className="text-small p-3 text-right font-mono">
                            ${position.entryPrice.toFixed(2)}
                          </td>
                          <td className="text-small p-3 text-right font-mono">
                            ${position.currentPrice.toFixed(2)}
                          </td>
                          <td className="text-small p-3 text-right font-mono">
                            {position.quantity}
                          </td>
                          <td
                            className={`text-small p-3 text-right font-mono font-medium ${
                              position.pnl >= 0 ? "text-success" : "text-destructive"
                            }`}
                          >
                            <div>
                              {position.pnl >= 0 ? "+" : ""}${position.pnl.toFixed(2)}
                            </div>
                            <div className="text-caption">
                              {position.pnl >= 0 ? "+" : ""}
                              {position.pnlPercent.toFixed(1)}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between p-3 md:p-4 pb-2">
                <CardTitle className="text-body md:text-subtitle">Portfolio Value</CardTitle>
                <div className="flex gap-1">
                  {["7D", "30D", "90D", "1Y"].map((tf) => (
                    <Button
                      key={tf}
                      variant={timeframe === tf ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setTimeframe(tf)}
                      className="h-7 px-2 text-caption"
                    >
                      {tf}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-3 md:p-4 pt-0">
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(45% 0.15 145)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(45% 0.15 145)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        fill="currentColor"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        fill="currentColor"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload?.length) return null;
                          return (
                            <div className="bg-popover border border-border rounded-md p-3 shadow-lg">
                              <div className="text-small font-medium">{label}</div>
                              <div className="text-caption text-primary">
                                ${(payload[0]?.value as number).toLocaleString()}
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="oklch(45% 0.15 145)"
                        strokeWidth={2}
                        fill="url(#valueGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader className="p-3 md:p-4 pb-2">
                <CardTitle className="text-body md:text-subtitle">By Category</CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-4 pt-0">
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-small">{cat.name}</span>
                      </div>
                      <span className="text-small font-medium">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardContent className="p-6 md:p-8 text-center">
              <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-subtitle font-semibold mb-2">Connect a Wallet</h3>
              <p className="text-small text-muted-foreground mb-4 max-w-md mx-auto">
                Connect your wallet to automatically track transactions and sync your portfolio
                across platforms.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
