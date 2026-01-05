/**
 * Feature cards data for landing page
 * Describes core platform capabilities
 */

import { ChartBar, Shield, Bell, Stack } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

export interface Feature {
  icon: Icon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: ChartBar,
    title: "Real-time Analytics",
    description: "Track market odds and volume across multiple platforms with live updates.",
  },
  {
    icon: Shield,
    title: "Arbitrage Detection",
    description: "Automatically find pricing inefficiencies and profit opportunities.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified when markets move or hit your target prices.",
  },
  {
    icon: Stack,
    title: "Multi-platform",
    description: "Aggregate data from Polymarket, Kalshi, and more in one view.",
  },
];
