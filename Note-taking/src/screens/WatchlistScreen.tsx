import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';

const WATCHLIST_STOCKS = [
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 218.89,
    change: 5.23,
    changePercent: 2.45,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 547.10,
    change: 15.80,
    changePercent: 2.98,
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 394.78,
    change: -2.34,
    changePercent: -0.59,
  },
];

const WatchlistScreen = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Watchlist" subtitle="Track your favorite stocks" />
      <ScrollView style={styles.content}>
        {WATCHLIST_STOCKS.map((stock) => (
          <Card key={stock.symbol} style={styles.card}>
            <Card.Content>
              <View style={styles.stockHeader}>
                <View>
                  <Text style={styles.symbol}>{stock.symbol}</Text>
                  <Text style={styles.name}>{stock.name}</Text>
                </View>
                <IconButton
                  icon="star"
                  iconColor={COLORS.warning}
                  size={24}
                  onPress={() => console.log(`Remove ${stock.symbol} from watchlist`)}
                />
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
                <Text
                  style={[
                    styles.change,
                    stock.change >= 0 ? styles.positive : styles.negative,
                  ]}
                >
                  {stock.change >= 0 ? '+' : ''}${Math.abs(stock.change).toFixed(2)} (
                  {stock.change >= 0 ? '+' : ''}
                  {stock.changePercent.toFixed(2)}%)
                </Text>
              </View>
            </Card.Content>
          </Card>
        ))}

        {WATCHLIST_STOCKS.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Your watchlist is empty. Add stocks from the search screen.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  card: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  symbol: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  name: {
    ...TYPOGRAPHY.body2,
    color: COLORS.subtext,
    marginBottom: SPACING.sm,
  },
  priceContainer: {
    marginTop: SPACING.xs,
  },
  price: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  change: {
    ...TYPOGRAPHY.body1,
  },
  positive: {
    color: COLORS.success,
  },
  negative: {
    color: COLORS.error,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.subtext,
    textAlign: 'center',
  },
});

export default WatchlistScreen; 