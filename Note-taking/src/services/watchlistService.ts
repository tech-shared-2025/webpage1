import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from 'src/services/firebaseConfig';
import { getStockQuote } from 'src/services/stockService';
import { Stock } from 'src/types';

export const initializeWatchlist = async (userId: string): Promise<void> => {
  const watchlistRef = doc(db, 'watchlists', userId);
  await setDoc(watchlistRef, {
    symbols: [],
    lastUpdated: Date.now(),
  });
};

export const getWatchlist = async (userId: string): Promise<string[]> => {
  const watchlistRef = doc(db, 'watchlists', userId);
  const watchlistDoc = await getDoc(watchlistRef);

  if (!watchlistDoc.exists()) {
    await initializeWatchlist(userId);
    return [];
  }

  return watchlistDoc.data().symbols;
};

export const addToWatchlist = async (
  userId: string,
  symbol: string
): Promise<void> => {
  const watchlistRef = doc(db, 'watchlists', userId);
  await updateDoc(watchlistRef, {
    symbols: arrayUnion(symbol),
    lastUpdated: Date.now(),
  });
};

export const removeFromWatchlist = async (
  userId: string,
  symbol: string
): Promise<void> => {
  const watchlistRef = doc(db, 'watchlists', userId);
  await updateDoc(watchlistRef, {
    symbols: arrayRemove(symbol),
    lastUpdated: Date.now(),
  });
};

export const getWatchlistStocks = async (userId: string): Promise<Stock[]> => {
  const symbols = await getWatchlist(userId);
  const stocks = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const quote = await getStockQuote(symbol);
        return {
          symbol,
          companyName: symbol, // We'll add company names in a future update
          currentPrice: quote.c,
          change: quote.c - quote.pc,
          changePercent: ((quote.c - quote.pc) / quote.pc) * 100,
          previousClose: quote.pc,
          open: quote.o,
          high: quote.h,
          low: quote.l,
          volume: 0,
        };
      } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        return null;
      }
    })
  );

  return stocks.filter((stock): stock is Stock => stock !== null);
};

export const isInWatchlist = async (
  userId: string,
  symbol: string
): Promise<boolean> => {
  const symbols = await getWatchlist(userId);
  return symbols.includes(symbol);
}; 