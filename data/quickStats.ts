/**
 * Quick stats data for dashboard overview
 * Mock data simulating user portfolio statistics
 */

import { Wallet, TrendUpIcon, Bell, ArrowsClockwise } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

export interface QuickStat {
  label: string;
  value: string;
  icon: Icon;
  change: string | null;
  positive?: boolean;
}

export const quickStats: QuickStat[] = [
  { label: "Active Positions", value: "12", icon: Wallet, change: null },
  { label: "Total P&L", value: "+$1,247", icon: TrendUpIcon, change: "+8.3%", positive: true },
  { label: "Alerts Triggered", value: "8 today", icon: Bell, change: null },
  { label: "Arbitrage Opps", value: "3 active", icon: ArrowsClockwise, change: null },
];
