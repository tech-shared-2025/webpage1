import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { getPortfolio } from './portfolioService';

export interface LeaderboardEntry {
  userId: string;
  username: string;
  totalValue: number;
  percentageGain: number;
  rank: number;
}

export const updateUserRanking = async (userId: string): Promise<void> => {
  const portfolio = await getPortfolio(userId);
  const userDoc = await getDoc(doc(db, 'users', userId));
  const userData = userDoc.data();

  if (!userData) return;

  const percentageGain =
    ((portfolio.totalValue - 100000) / 100000) * 100; // Assuming starting balance is 100,000

  await updateDoc(doc(db, 'users', userId), {
    totalValue: portfolio.totalValue,
    percentageGain,
    lastUpdated: Date.now(),
  });
};

export const getGlobalLeaderboard = async (
  limit_count = 100
): Promise<LeaderboardEntry[]> => {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    orderBy('totalValue', 'desc'),
    limit(limit_count)
  );

  const snapshot = await getDocs(q);
  let rank = 1;

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      userId: doc.id,
      username: data.username,
      totalValue: data.totalValue,
      percentageGain: data.percentageGain,
      rank: rank++,
    };
  });
};

export const getUserRank = async (userId: string): Promise<number> => {
  const leaderboard = await getGlobalLeaderboard();
  const userRank = leaderboard.findIndex((entry) => entry.userId === userId);
  return userRank === -1 ? leaderboard.length + 1 : userRank + 1;
};

export const getNearbyUsers = async (
  userId: string,
  range = 5
): Promise<LeaderboardEntry[]> => {
  const leaderboard = await getGlobalLeaderboard();
  const userRank = await getUserRank(userId);
  
  const start = Math.max(0, userRank - range - 1);
  const end = Math.min(leaderboard.length, userRank + range);
  
  return leaderboard.slice(start, end);
}; 