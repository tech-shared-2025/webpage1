import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import { Text, Card, Button, TextInput, Portal, Modal, IconButton } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { getStockQuote, getStockCandles, getCompanyProfile } from 'src/services/stockService';
import { executeTransaction, getPortfolio } from 'src/services/portfolioService';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from 'src/services/watchlistService';
import { APP_COLORS } from 'src/constants/config';
import { StockQuote } from 'src/types';
import {
  createPriceAlert,
  getPriceAlerts,
  deletePriceAlert,
  PriceAlert,
} from 'src/services/alertService';
import { COLORS, SPACING, TYPOGRAPHY } from 'src/constants/theme';

// Temporary user ID for demo purposes
const DEMO_USER_ID = 'demo_user';

const StockDetailScreen = ({ route }: any) => {
  const { symbol } = route.params;
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [shares, setShares] = useState('');
  const [timeframe, setTimeframe] = useState('1D');
  const [tradeModalVisible, setTradeModalVisible] = useState(false);
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [processing, setProcessing] = useState(false);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertPrice, setAlertPrice] = useState('');
  const [alertCondition, setAlertCondition] = useState<'above' | 'below'>('above');

  useEffect(() => {
    loadStockData();
    loadPortfolioData();
    checkWatchlist();
    loadAlerts();
    const interval = setInterval(() => {
      loadStockData();
      loadAlerts();
    }, 10000);
    return () => clearInterval(interval);
  }, [symbol, timeframe]);

  const loadPortfolioData = async () => {
    try {
      const portfolioData = await getPortfolio(DEMO_USER_ID);
      setPortfolio(portfolioData);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  };

  const loadStockData = async () => {
    try {
      const [quoteData, profileData] = await Promise.all([
        getStockQuote(symbol),
        getCompanyProfile(symbol),
      ]);
      setQuote(quoteData);
      setProfile(profileData);

      // Get historical data
      const now = Math.floor(Date.now() / 1000);
      let from = now - 24 * 60 * 60; // 1 day ago
      let resolution = '5';

      switch (timeframe) {
        case '1W':
          from = now - 7 * 24 * 60 * 60;
          resolution = '60';
          break;
        case '1M':
          from = now - 30 * 24 * 60 * 60;
          resolution = 'D';
          break;
        case '3M':
          from = now - 90 * 24 * 60 * 60;
          resolution = 'D';
          break;
        case '1Y':
          from = now - 365 * 24 * 60 * 60;
          resolution = 'W';
          break;
      }

      const candleData = await getStockCandles(symbol, resolution, from, now);
      if (candleData.s === 'ok') {
        setChartData({
          labels: candleData.t.map((t: number) => ''),
          datasets: [
            {
              data: candleData.c,
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error loading stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkWatchlist = async () => {
    try {
      const watchlisted = await isInWatchlist(DEMO_USER_ID, symbol);
      setInWatchlist(watchlisted);
    } catch (error) {
      console.error('Error checking watchlist:', error);
    }
  };

  const handleWatchlist = async () => {
    try {
      if (inWatchlist) {
        await removeFromWatchlist(DEMO_USER_ID, symbol);
      } else {
        await addToWatchlist(DEMO_USER_ID, symbol);
      }
      setInWatchlist(!inWatchlist);
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  };

  const handleTrade = async () => {
    if (!quote || !shares || isNaN(Number(shares)) || Number(shares) <= 0) {
      Alert.alert('Error', 'Please enter a valid number of shares');
      return;
    }

    const numShares = Number(shares);
    const total = numShares * quote.c;

    if (tradeType === 'BUY' && (!portfolio || portfolio.cash < total)) {
      Alert.alert('Error', 'Insufficient funds');
      return;
    }

    if (tradeType === 'SELL') {
      const position = portfolio?.positions.find((p: any) => p.symbol === symbol);
      if (!position || position.shares < numShares) {
        Alert.alert('Error', 'Insufficient shares');
        return;
      }
    }

    setProcessing(true);
    try {
      await executeTransaction(DEMO_USER_ID, tradeType, symbol, numShares, quote.c);
      await loadPortfolioData();
      setShares('');
      setTradeModalVisible(false);
      Alert.alert(
        'Success',
        `Successfully ${tradeType === 'BUY' ? 'bought' : 'sold'} ${numShares} shares of ${symbol}`
      );
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const loadAlerts = async () => {
    try {
      const userAlerts = await getPriceAlerts(DEMO_USER_ID, symbol);
      setAlerts(userAlerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  };

  const handleCreateAlert = async () => {
    try {
      const price = parseFloat(alertPrice);
      if (isNaN(price) || price <= 0) {
        Alert.alert('Invalid Price', 'Please enter a valid price.');
        return;
      }

      await createPriceAlert(DEMO_USER_ID, symbol, price, alertCondition);
      await loadAlerts();
      setShowAlertModal(false);
      setAlertPrice('');
      Alert.alert('Success', 'Price alert created successfully!');
    } catch (error) {
      console.error('Error creating alert:', error);
      Alert.alert('Error', 'Failed to create price alert.');
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    try {
      await deletePriceAlert(DEMO_USER_ID, alertId);
      await loadAlerts();
      Alert.alert('Success', 'Price alert deleted successfully!');
    } catch (error) {
      console.error('Error deleting alert:', error);
      Alert.alert('Error', 'Failed to delete price alert.');
    }
  };

  if (loading || !quote || !chartData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={APP_COLORS.primary} />
      </View>
    );
  }

  const timeframes = ['1D', '1W', '1M', '3M', '1Y'];

  const position = portfolio?.positions.find((p: any) => p.symbol === symbol);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.companyName}>{profile?.name}</Text>
        <Text style={styles.price}>${quote.c.toFixed(2)}</Text>
        <Text
          style={[
            styles.change,
            { color: quote.c >= quote.pc ? APP_COLORS.success : APP_COLORS.error },
          ]}
        >
          {quote.c >= quote.pc ? '+' : ''}
          {((quote.c - quote.pc) / quote.pc * 100).toFixed(2)}%
          ({(quote.c - quote.pc).toFixed(2)})
        </Text>
      </View>

      {position && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.positionTitle}>Your Position</Text>
            <View style={styles.positionDetails}>
              <View style={styles.positionItem}>
                <Text style={styles.positionLabel}>Shares</Text>
                <Text style={styles.positionValue}>{position.shares}</Text>
              </View>
              <View style={styles.positionItem}>
                <Text style={styles.positionLabel}>Market Value</Text>
                <Text style={styles.positionValue}>
                  ${position.currentValue.toFixed(2)}
                </Text>
              </View>
              <View style={styles.positionItem}>
                <Text style={styles.positionLabel}>Return</Text>
                <Text
                  style={[
                    styles.positionValue,
                    {
                      color:
                        position.totalReturn >= 0
                          ? APP_COLORS.success
                          : APP_COLORS.error,
                    },
                  ]}
                >
                  {position.totalReturn >= 0 ? '+' : ''}
                  {position.totalReturnPercent.toFixed(2)}%
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      <View style={styles.timeframeContainer}>
        {timeframes.map((tf) => (
          <Button
            key={tf}
            mode={timeframe === tf ? 'contained' : 'outlined'}
            onPress={() => setTimeframe(tf)}
            style={styles.timeframeButton}
          >
            {tf}
          </Button>
        ))}
      </View>

      {chartData && (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: APP_COLORS.background,
            backgroundGradientFrom: APP_COLORS.background,
            backgroundGradientTo: APP_COLORS.background,
            decimalPlaces: 2,
            color: (opacity = 1) => APP_COLORS.primary,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            setTradeType('BUY');
            setTradeModalVisible(true);
          }}
          style={[styles.button, { backgroundColor: APP_COLORS.success }]}
        >
          Buy
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            setTradeType('SELL');
            setTradeModalVisible(true);
          }}
          style={[styles.button, { backgroundColor: APP_COLORS.error }]}
        >
          Sell
        </Button>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Open</Text>
              <Text style={styles.statValue}>${quote.o.toFixed(2)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>High</Text>
              <Text style={styles.statValue}>${quote.h.toFixed(2)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Low</Text>
              <Text style={styles.statValue}>${quote.l.toFixed(2)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Prev Close</Text>
              <Text style={styles.statValue}>${quote.pc.toFixed(2)}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Price Alerts</Text>
            <IconButton
              icon="plus"
              size={24}
              onPress={() => setShowAlertModal(true)}
            />
          </View>
          {alerts.length === 0 ? (
            <Text style={styles.emptyText}>No active price alerts</Text>
          ) : (
            alerts.map((alert) => (
              <View key={alert.id} style={styles.alertRow}>
                <View>
                  <Text style={styles.alertText}>
                    Alert when price goes {alert.condition}{' '}
                    ${alert.targetPrice.toFixed(2)}
                  </Text>
                  <Text style={styles.alertSubtext}>
                    Created{' '}
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => handleDeleteAlert(alert.id)}
                />
              </View>
            ))
          )}
        </Card.Content>
      </Card>

      <Portal>
        <Modal
          visible={tradeModalVisible}
          onDismiss={() => setTradeModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>
            {tradeType} {symbol}
          </Text>
          <TextInput
            label="Number of shares"
            value={shares}
            onChangeText={setShares}
            keyboardType="numeric"
            style={styles.input}
          />
          {shares !== '' && !isNaN(Number(shares)) && (
            <Text style={styles.estimatedCost}>
              Estimated {tradeType === 'BUY' ? 'Cost' : 'Credit'}:{' '}
              ${(Number(shares) * quote.c).toFixed(2)}
            </Text>
          )}
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setTradeModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleTrade}
              style={[
                styles.modalButton,
                {
                  backgroundColor:
                    tradeType === 'BUY' ? APP_COLORS.success : APP_COLORS.error,
                },
              ]}
              loading={processing}
              disabled={processing}
            >
              Confirm {tradeType}
            </Button>
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={showAlertModal}
          onDismiss={() => setShowAlertModal(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Create Price Alert</Text>
          <View style={styles.alertInputContainer}>
            <Button
              mode={alertCondition === 'above' ? 'contained' : 'outlined'}
              onPress={() => setAlertCondition('above')}
              style={styles.conditionButton}
            >
              Above
            </Button>
            <Button
              mode={alertCondition === 'below' ? 'contained' : 'outlined'}
              onPress={() => setAlertCondition('below')}
              style={styles.conditionButton}
            >
              Below
            </Button>
          </View>
          <TextInput
            label="Target Price"
            value={alertPrice}
            onChangeText={setAlertPrice}
            keyboardType="decimal-pad"
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleCreateAlert}
            style={styles.button}
          >
            Create Alert
          </Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  symbol: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
  },
  companyName: {
    ...TYPOGRAPHY.body1,
    color: COLORS.subtext,
    marginBottom: SPACING.sm,
  },
  price: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  change: {
    ...TYPOGRAPHY.body1,
    color: COLORS.success,
  },
  positive: {
    color: COLORS.success,
  },
  negative: {
    color: COLORS.error,
  },
  card: {
    margin: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  positionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.text,
  },
  positionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positionItem: {
    flex: 1,
  },
  positionLabel: {
    fontSize: 14,
    color: COLORS.subtext,
  },
  positionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  timeframeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  timeframeButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '48%',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.subtext,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  modal: {
    backgroundColor: COLORS.background,
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.text,
  },
  input: {
    marginBottom: 16,
  },
  estimatedCost: {
    fontSize: 16,
    marginBottom: 16,
    color: COLORS.text,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  alertText: {
    fontSize: 16,
    color: COLORS.text,
  },
  alertSubtext: {
    fontSize: 14,
    color: COLORS.subtext,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.subtext,
    fontSize: 16,
    marginTop: 8,
  },
  modalContainer: {
    backgroundColor: COLORS.surface,
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  alertInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  conditionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  button: {
    marginTop: 8,
  },
});

export default StockDetailScreen; 