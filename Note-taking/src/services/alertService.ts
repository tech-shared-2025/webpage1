import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from 'src/services/firebaseConfig';

export interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  createdAt: number;
  triggered: boolean;
}

export const createPriceAlert = async (
  userId: string,
  symbol: string,
  targetPrice: number,
  condition: 'above' | 'below'
): Promise<void> => {
  const alertsRef = collection(db, 'users', userId, 'alerts');
  const alertDoc = doc(alertsRef);

  await setDoc(alertDoc, {
    id: alertDoc.id,
    symbol,
    targetPrice,
    condition,
    createdAt: Date.now(),
    triggered: false,
  });
};

export const getPriceAlerts = async (
  userId: string,
  symbol?: string
): Promise<PriceAlert[]> => {
  const alertsRef = collection(db, 'users', userId, 'alerts');
  let q = query(alertsRef, where('triggered', '==', false));

  if (symbol) {
    q = query(q, where('symbol', '==', symbol));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as PriceAlert);
};

export const deletePriceAlert = async (
  userId: string,
  alertId: string
): Promise<void> => {
  const alertRef = doc(db, 'users', userId, 'alerts', alertId);
  await deleteDoc(alertRef);
};

export const markAlertAsTriggered = async (
  userId: string,
  alertId: string
): Promise<void> => {
  const alertRef = doc(db, 'users', userId, 'alerts', alertId);
  await updateDoc(alertRef, {
    triggered: true,
  });
};

export const checkPriceAlerts = async (
  userId: string,
  symbol: string,
  currentPrice: number
): Promise<PriceAlert[]> => {
  const alerts = await getPriceAlerts(userId, symbol);
  const triggeredAlerts: PriceAlert[] = [];

  for (const alert of alerts) {
    if (
      (alert.condition === 'above' && currentPrice >= alert.targetPrice) ||
      (alert.condition === 'below' && currentPrice <= alert.targetPrice)
    ) {
      await markAlertAsTriggered(userId, alert.id);
      triggeredAlerts.push(alert);
    }
  }

  return triggeredAlerts;
}; 