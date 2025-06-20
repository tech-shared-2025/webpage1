import axios from 'axios';
import { FINNHUB_API_KEY } from '../config/env';
import { Stock, StockQuote } from '../types';

const BASE_URL = 'https://finnhub.io/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    token: FINNHUB_API_KEY,
  },
});

export const searchStocks = async (query: string): Promise<Stock[]> => {
  try {
    const response = await api.get('/search', {
      params: {
        q: query,
      },
    });
    return response.data.result.map((item: any) => ({
      symbol: item.symbol,
      companyName: item.description,
      currentPrice: 0,
      change: 0,
      changePercent: 0,
      previousClose: 0,
      open: 0,
      high: 0,
      low: 0,
      volume: 0,
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
};

export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  try {
    const response = await fetch(
      `${BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch stock quote');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

export const getCompanyProfile = async (symbol: string): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch company profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching company profile:', error);
    throw error;
  }
};

export const getStockCandles = async (
  symbol: string,
  resolution: string,
  from: number,
  to: number
): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch stock candles');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock candles:', error);
    throw error;
  }
}; 