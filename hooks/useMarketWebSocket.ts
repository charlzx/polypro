import { useState, useEffect, useCallback, useRef } from 'react';
import { TransformedMarket } from '@/services/polymarket';

interface MarketUpdate {
  marketId: string;
  yesOdds: number;
  noOdds: number;
  volume24h: number;
  timestamp: number;
  volatility: 'low' | 'medium' | 'high';
  momentum: 'bullish' | 'bearish' | 'neutral';
  priceChange: number;
}

interface UseMarketWebSocketOptions {
  marketIds?: string[];
  enabled?: boolean;
}

interface MarketState {
  yesOdds: number;
  volume24h: number;
  momentum: number; // -1 to 1, persists for smoother trends
  volatilityLevel: number; // 0.3-2.0
  lastChanges: number[]; // Track last N changes for volatility calc
}

// Simulated real-time updates with realistic market behavior
export function useMarketWebSocket(options: UseMarketWebSocketOptions = {}) {
  const { marketIds = [], enabled = true } = options;
  const [updates, setUpdates] = useState<Map<string, MarketUpdate>>(new Map());
  const [isConnected, setIsConnected] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const marketDataRef = useRef<Map<string, MarketState>>(new Map());

  // Initialize market with state for realistic simulation
  const initializeMarket = useCallback((marketId: string, initialOdds: number, initialVolume: string | number) => {
    if (!marketDataRef.current.has(marketId)) {
      const vol = typeof initialVolume === 'string' 
        ? parseFloat(initialVolume.replace(/[^0-9.]/g, '')) * 1000 
        : initialVolume;
      
      marketDataRef.current.set(marketId, {
        yesOdds: initialOdds,
        volume24h: vol || 100000,
        momentum: (Math.random() - 0.5) * 0.5, // Initial random momentum
        volatilityLevel: 0.5 + Math.random() * 0.5, // Base volatility
        lastChanges: [],
      });
    }
  }, []);

  // Generate realistic price movement using Ornstein-Uhlenbeck process
  const generateUpdate = useCallback((marketId: string): MarketUpdate => {
    const state = marketDataRef.current.get(marketId) || {
      yesOdds: 50,
      volume24h: 100000,
      momentum: 0,
      volatilityLevel: 0.5,
      lastChanges: [],
    };

    // Ornstein-Uhlenbeck-inspired mean reversion
    const meanReversionStrength = 0.1;
    const equilibrium = 50; // Odds tend toward 50%
    const meanReversionForce = (equilibrium - state.yesOdds) * meanReversionStrength * 0.01;

    // Update momentum with decay and random shocks
    const momentumDecay = 0.85;
    const randomShock = (Math.random() - 0.5) * 0.4;
    const newMomentum = state.momentum * momentumDecay + randomShock;

    // Calculate volatility from recent changes
    const recentVolatility = state.lastChanges.length > 0
      ? Math.sqrt(state.lastChanges.reduce((sum, c) => sum + c * c, 0) / state.lastChanges.length)
      : 0.5;
    
    // Volatility clustering - high vol tends to follow high vol
    const volatilityPersistence = 0.7;
    const baseVol = 0.3 + Math.random() * 0.3;
    const adjustedVolatility = state.volatilityLevel * volatilityPersistence + baseVol * (1 - volatilityPersistence);

    // Price change combines momentum, mean reversion, and random noise
    const noise = (Math.random() - 0.5) * adjustedVolatility * 2;
    const priceChange = newMomentum + meanReversionForce + noise;

    // Apply bounds with soft barriers
    let newOdds = state.yesOdds + priceChange;
    if (newOdds > 92) newOdds = 92 - (newOdds - 92) * 0.5;
    if (newOdds < 8) newOdds = 8 + (8 - newOdds) * 0.5;
    newOdds = Math.round(newOdds * 10) / 10;

    // Volume increases with volatility and trading activity
    const volumeMultiplier = 1 + Math.abs(priceChange) * 0.1 + Math.random() * 0.02;
    const volumeIncrease = state.volume24h * (volumeMultiplier - 1) * 0.1;
    const newVolume = state.volume24h + Math.max(100, volumeIncrease);

    // Track changes for volatility calculation
    const updatedChanges = [...state.lastChanges.slice(-9), priceChange];

    // Determine volatility label
    const volatilityLabel: 'low' | 'medium' | 'high' = 
      recentVolatility < 0.5 ? 'low' : recentVolatility < 1.2 ? 'medium' : 'high';

    // Determine momentum label
    const avgMomentum = updatedChanges.reduce((a, b) => a + b, 0) / updatedChanges.length;
    const momentumLabel: 'bullish' | 'bearish' | 'neutral' = 
      avgMomentum > 0.15 ? 'bullish' : avgMomentum < -0.15 ? 'bearish' : 'neutral';

    // Update state
    marketDataRef.current.set(marketId, {
      yesOdds: newOdds,
      volume24h: newVolume,
      momentum: newMomentum,
      volatilityLevel: adjustedVolatility,
      lastChanges: updatedChanges,
    });

    return {
      marketId,
      yesOdds: newOdds,
      noOdds: Math.round((100 - newOdds) * 10) / 10,
      volume24h: newVolume,
      timestamp: Date.now(),
      volatility: volatilityLabel,
      momentum: momentumLabel,
      priceChange: Math.round(priceChange * 100) / 100,
    };
  }, []);

  // Start simulated WebSocket connection
  useEffect(() => {
    if (!enabled || marketIds.length === 0) {
      setIsConnected(false);
      return;
    }

    let isMounted = true;
    const connectTimeout = setTimeout(() => {
      if (!isMounted) return;
      setIsConnected(true);

      // Variable update intervals for more realistic behavior
      const tick = () => {
        if (!isMounted) return;
        
        // Pick random subset of markets to update (simulates uneven activity)
        const activityLevel = 0.3 + Math.random() * 0.4; // 30-70% of markets update
        const numUpdates = Math.max(1, Math.floor(marketIds.length * activityLevel));
        const shuffled = [...marketIds].sort(() => Math.random() - 0.5);
        const toUpdate = shuffled.slice(0, numUpdates);

        setUpdates((prev) => {
          const next = new Map(prev);
          toUpdate.forEach((id) => {
            const update = generateUpdate(id);
            next.set(id, update);
          });
          return next;
        });

        // Variable timing: 1.5-4 seconds between updates
        const nextInterval = 1500 + Math.random() * 2500;
        if (isMounted) {
          intervalRef.current = setTimeout(tick, nextInterval);
        }
      };

      tick();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(connectTimeout);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
      setIsConnected(false);
    };
  }, [enabled, marketIds.join(','), generateUpdate]);

  // Get latest update for a specific market
  const getMarketUpdate = useCallback((marketId: string): MarketUpdate | undefined => {
    return updates.get(marketId);
  }, [updates]);

  // Apply updates to market data
  const applyUpdatesToMarkets = useCallback((markets: TransformedMarket[]): TransformedMarket[] => {
    return markets.map((market) => {
      const update = updates.get(market.id);
      if (update) {
        return {
          ...market,
          yesOdds: update.yesOdds,
          noOdds: update.noOdds,
        };
      }
      return market;
    });
  }, [updates]);

  // Get volatility info for a market
  const getMarketVolatility = useCallback((marketId: string) => {
    const update = updates.get(marketId);
    return update ? {
      level: update.volatility,
      momentum: update.momentum,
      lastChange: update.priceChange,
    } : null;
  }, [updates]);

  return {
    isConnected,
    updates,
    getMarketUpdate,
    applyUpdatesToMarkets,
    initializeMarket,
    getMarketVolatility,
  };
}

// Hook for single market real-time updates with enhanced realism
export function useSingleMarketWebSocket(marketId: string | undefined, initialOdds?: number) {
  const [currentOdds, setCurrentOdds] = useState<{ yes: number; no: number } | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [volatility, setVolatility] = useState<'low' | 'medium' | 'high'>('medium');
  const [momentum, setMomentum] = useState<'bullish' | 'bearish' | 'neutral'>('neutral');
  const [recentChanges, setRecentChanges] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef({
    odds: initialOdds || 50,
    momentum: 0,
    volatilityLevel: 0.5,
  });

  useEffect(() => {
    if (!marketId) return;

    if (initialOdds !== undefined) {
      stateRef.current.odds = initialOdds;
      setCurrentOdds({ yes: initialOdds, no: 100 - initialOdds });
    }

    let isMounted = true;

    const tick = () => {
      if (!isMounted) return;
      
      const state = stateRef.current;

      // Ornstein-Uhlenbeck process
      const meanReversion = (50 - state.odds) * 0.005;
      const momentumDecay = 0.8;
      const shock = (Math.random() - 0.5) * 0.6;
      const newMomentum = state.momentum * momentumDecay + shock;

      // Calculate price change
      const noise = (Math.random() - 0.5) * state.volatilityLevel;
      const priceChange = newMomentum * 0.5 + meanReversion + noise;

      // Update odds with bounds
      let newOdds = state.odds + priceChange;
      if (newOdds > 95) newOdds = 95 - Math.random() * 2;
      if (newOdds < 5) newOdds = 5 + Math.random() * 2;
      newOdds = Math.round(newOdds * 10) / 10;

      // Update volatility with persistence
      const newVolLevel = state.volatilityLevel * 0.7 + (0.3 + Math.random() * 0.4) * 0.3;

      stateRef.current = {
        odds: newOdds,
        momentum: newMomentum,
        volatilityLevel: newVolLevel,
      };

      setCurrentOdds({
        yes: newOdds,
        no: Math.round((100 - newOdds) * 10) / 10,
      });
      setLastUpdate(Date.now());

      // Track recent changes
      setRecentChanges(prev => {
        const updated = [...prev.slice(-14), priceChange];
        
        // Calculate volatility from changes
        const avgChange = Math.sqrt(updated.reduce((s, c) => s + c * c, 0) / updated.length);
        setVolatility(avgChange < 0.3 ? 'low' : avgChange < 0.8 ? 'medium' : 'high');

        // Calculate momentum
        const avgDirection = updated.reduce((s, c) => s + c, 0) / updated.length;
        setMomentum(avgDirection > 0.1 ? 'bullish' : avgDirection < -0.1 ? 'bearish' : 'neutral');

        return updated;
      });

      // Variable interval
      const nextInterval = 2000 + Math.random() * 3000;
      if (isMounted) {
        intervalRef.current = setTimeout(tick, nextInterval);
      }
    };

    // Start after brief delay
    intervalRef.current = setTimeout(tick, 1000);

    return () => {
      isMounted = false;
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [marketId, initialOdds]);

  return { 
    currentOdds, 
    lastUpdate,
    volatility,
    momentum,
    recentChanges,
  };
}
