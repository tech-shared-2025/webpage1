export interface Stock {
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  previousClose: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export interface StockQuote {
  c: number;  // Current price
  h: number;  // High price
  l: number;  // Low price
  o: number;  // Open price
  pc: number; // Previous close price
  t: number;  // Timestamp
}

export interface Portfolio {
  userId: string;
  cash: number;
  totalValue: number;
  positions: Position[];
  transactions: Transaction[];
}

export interface Position {
  symbol: string;
  shares: number;
  averageCost: number;
  currentValue: number;
  totalReturn: number;
  percentReturn: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  total: number;
  timestamp: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  portfolio: Portfolio;
  watchlist: string[];
  rank: number;
  joinedAt: number;
}

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  StockDetail: { symbol: string };
  Portfolio: undefined;
  Watchlist: undefined;
  Leaderboard: undefined;
  Learn: undefined;
}; 