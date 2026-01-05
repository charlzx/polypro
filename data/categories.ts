/**
 * Market categories for filtering
 * Used across the platform for organizing prediction markets
 */

export const categories = [
  "All",
  "Trending",
  "Crypto",
  "Tech",
  "Economics",
  "Sports",
  "Entertainment",
] as const;

export type Category = typeof categories[number];
