"use client";

import { Moon, Sun, Monitor } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  variant?: "compact" | "full";
  className?: string;
}

export function ThemeToggle({ variant = "compact", className = "" }: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-lg ${className}`} aria-hidden="true" />
    );
  }

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    if (theme === "light") setTheme("system");
    else if (theme === "system") setTheme("dark");
    else setTheme("light");
  };

  const getIcon = () => {
    if (theme === "system") {
      return <Monitor weight="regular" className="h-[1.2rem] w-[1.2rem] text-foreground" />;
    }
    return resolvedTheme === "light" 
      ? <Sun weight="regular" className="h-[1.2rem] w-[1.2rem] text-foreground" />
      : <Moon weight="fill" className="h-[1.2rem] w-[1.2rem] text-foreground" />;
  };

  const getLabel = () => {
    if (theme === "system") return "System";
    if (theme === "light") return "Light";
    return "Dark";
  };

  if (variant === "full") {
    const getPosition = () => {
      if (theme === "light") return 2;
      if (theme === "system") return 22;
      return 42;
    };

    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleTheme();
        }}
        className={`group relative flex items-center gap-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300 ${className}`}
        aria-label={`Current theme: ${getLabel()}. Click to switch.`}
        type="button"
      >
        {/* Track with 3-position indicator */}
        <div className="relative w-16 h-6 rounded-full bg-muted overflow-hidden">
          {/* Thumb */}
          <motion.div
            className="absolute top-0.5 w-5 h-5 rounded-full bg-foreground shadow-sm flex items-center justify-center"
            initial={false}
            animate={{ x: getPosition() }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            layout={false}
          >
            {theme === "light" ? (
              <Sun weight="fill" className="h-3 w-3 text-background" />
            ) : theme === "system" ? (
              <Monitor weight="fill" className="h-3 w-3 text-background" />
            ) : (
              <Moon weight="fill" className="h-3 w-3 text-background" />
            )}
          </motion.div>
        </div>
        <span className="text-small text-muted-foreground group-hover:text-foreground transition-colors min-w-[50px]">
          {getLabel()}
        </span>
      </button>
    );
  }

  // Compact toggle for header
  return (
    <button
      onClick={toggleTheme}
      className={`relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors overflow-hidden ${className}`}
      aria-label={`Current theme: ${getLabel()}. Click to switch.`}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {getIcon()}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
