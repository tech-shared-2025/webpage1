import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { db } from 'src/services/firebaseConfig';
import { Portfolio, Position, Transaction, Stock } from 'src/types';
import { INITIAL_BALANCE } from 'src/constants/config';
import { getStockQuote } from 'src/services/stockService';

export const initializePortfolio = async (userId: string): Promise<void> => {
  const portfolioRef = doc(db, 'portfolios', userId);
  const portfolio: Portfolio = {
    cash: INITIAL_BALANCE,
    totalValue: INITIAL_BALANCE,
    positions: [],
    transactions: [],
  };
  await setDoc(portfolioRef, portfolio);
};

export const getPortfolio = async (userId: string): Promise<Portfolio> => {
  const portfolioRef = doc(db, 'portfolios', userId);
  const portfolioDoc = await getDoc(portfolioRef);
  
  if (!portfolioDoc.exists()) {
    await initializePortfolio(userId);
    return {
      cash: INITIAL_BALANCE,
      totalValue: INITIAL_BALANCE,
      positions: [],
      transactions: [],
    };
  }

  return portfolioDoc.data() as Portfolio;
};

export const executeTransaction = async (
  userId: string,
  type: 'BUY' | 'SELL',
  symbol: string,
  shares: number,
  price: number
): Promise<boolean> => {
  const portfolioRef = doc(db, 'portfolios', userId);
  const portfolio = await getPortfolio(userId);
  const total = shares * price;

  if (type === 'BUY' && portfolio.cash < total) {
    throw new Error('Insufficient funds');
  }

  const position = portfolio.positions.find((p) => p.symbol === symbol);
  let updatedPositions = [...portfolio.positions];

  if (type === 'BUY') {
    if (position) {
      // Update existing position
      const newShares = position.shares + shares;
      const newCost = (position.averageCost * position.shares + total) / newShares;
      const index = updatedPositions.findIndex((p) => p.symbol === symbol);
      updatedPositions[index] = {
        ...position,
        shares: newShares,
        averageCost: newCost,
        currentValue: newShares * price,
        totalReturn: (price - newCost) * newShares,
        totalReturnPercent: ((price - newCost) / newCost) * 100,
      };
    } else {
      // Create new position
      updatedPositions.push({
        symbol,
        shares,
        averageCost: price,
        currentValue: total,
        totalReturn: 0,
        totalReturnPercent: 0,
      });
    }
  } else {
    if (!position || position.shares < shares) {
      throw new Error('Insufficient shares');
    }

    const newShares = position.shares - shares;
    if (newShares === 0) {
      // Remove position if no shares left
      updatedPositions = updatedPositions.filter((p) => p.symbol !== symbol);
    } else {
      // Update existing position
      const index = updatedPositions.findIndex((p) => p.symbol === symbol);
      updatedPositions[index] = {
        ...position,
        shares: newShares,
        currentValue: newShares * price,
        totalReturn: (price - position.averageCost) * newShares,
        totalReturnPercent: ((price - position.averageCost) / position.averageCost) * 100,
      };
    }
  }

  const transaction: Transaction = {
    id: Date.now().toString(),
    symbol,
    type,
    shares,
    price,
    total,
    timestamp: Date.now(),
  };

  const newCash = type === 'BUY' ? portfolio.cash - total : portfolio.cash + total;
  const newTotalValue = newCash + updatedPositions.reduce((sum, pos) => sum + pos.currentValue, 0);

  await updateDoc(portfolioRef, {
    cash: newCash,
    totalValue: newTotalValue,
    positions: updatedPositions,
    transactions: [...portfolio.transactions, transaction],
  });

  return true;
};

export const updatePortfolioValues = async (userId: string): Promise<void> => {
  const portfolio = await getPortfolio(userId);
  const updatedPositions = await Promise.all(
    portfolio.positions.map(async (position) => {
      const quote = await getStockQuote(position.symbol);
      const currentPrice = quote.c;
      return {
        ...position,
        currentValue: position.shares * currentPrice,
        totalReturn: (currentPrice - position.averageCost) * position.shares,
        totalReturnPercent: ((currentPrice - position.averageCost) / position.averageCost) * 100,
      };
    })
  );

  const totalValue =
    portfolio.cash + updatedPositions.reduce((sum, pos) => sum + pos.currentValue, 0);

  await updateDoc(doc(db, 'portfolios', userId), {
    positions: updatedPositions,
    totalValue,
  });
};

export const getTransactionHistory = async (
  userId: string,
  limit = 50
): Promise<Transaction[]> => {
  const portfolio = await getPortfolio(userId);
  return portfolio.transactions
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}; 