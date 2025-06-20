import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, TYPOGRAPHY } from 'src/constants/theme';
import ScreenHeader from 'src/components/ScreenHeader';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader
        title="Stock Simulator"
        subtitle="Welcome to your trading dashboard"
      />
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Portfolio Value</Text>
            <Text style={styles.value}>$10,000.00</Text>
            <Text style={styles.change}>+$500.00 (5.00%)</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Today's Market</Text>
            <View style={styles.marketItem}>
              <Text style={styles.symbol}>S&P 500</Text>
              <Text style={styles.price}>4,783.83</Text>
              <Text style={[styles.change, styles.positive]}>+1.2%</Text>
            </View>
            <View style={styles.marketItem}>
              <Text style={styles.symbol}>NASDAQ</Text>
              <Text style={styles.price}>15,055.65</Text>
              <Text style={[styles.change, styles.positive]}>+1.7%</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            <Text style={styles.emptyText}>No recent transactions</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
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
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  value: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  change: {
    ...TYPOGRAPHY.body2,
    color: COLORS.success,
  },
  marketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  symbol: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
    flex: 1,
  },
  price: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
    flex: 1,
    textAlign: 'center',
  },
  positive: {
    color: COLORS.success,
  },
  negative: {
    color: COLORS.error,
  },
  emptyText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.subtext,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HomeScreen; 