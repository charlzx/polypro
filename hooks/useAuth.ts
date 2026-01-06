"use client";

import { useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: "free" | "pro" | "premium";
}

// Mock auth hook - replace with real auth later
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock: Check if user is "logged in" via localStorage
    const mockUser = localStorage.getItem("polypro-mock-user");
    if (mockUser) {
      try {
        setUser(JSON.parse(mockUser));
      } catch {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("polypro-mock-user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("polypro-mock-user");
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
}
