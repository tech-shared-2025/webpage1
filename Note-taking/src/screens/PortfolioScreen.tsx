import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { COLORS, SPACING, TYPOGRAPHY } from 'src/constants/theme';
import ScreenHeader from 'src/components/ScreenHeader';

const PORTFOLIO_POSITIONS = [
  {
    symbol: 'AAPL',
    shares: 10,
    avgPrice: 175.50,
    currentPrice: 182.63,
    value: 1826.30,
    gain: 71.30,
    gainPercent: 4.06,
  },
  {
    symbol: 'GOOGL',
    shares: 5,
    avgPrice: 138.20,
    currentPrice: 142.65,
    value: 713.25,
    gain: 22.25,
    gainPercent: 3.22,
  },
];

const PortfolioScreen = () => {
  const totalValue = PORTFOLIO_POSITIONS.reduce((sum, pos) => sum + pos.value, 0);
  const totalGain = PORTFOLIO_POSITIONS.reduce((sum, pos) => sum + pos.gain, 0);
  const totalGainPercent = (totalGain / (totalValue - totalGain)) * 100;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Portfolio" subtitle="Track your investments" />
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Portfolio Value</Text>
            <Text style={styles.value}>${totalValue.toFixed(2)}</Text>
            <Text style={[styles.change, totalGain >= 0 ? styles.positive : styles.negative]}>
              ${totalGain.toFixed(2)} ({totalGainPercent.toFixed(2)}%)
            </Text>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Your Positions</Text>
        {PORTFOLIO_POSITIONS.map((position) => (
          <Card key={position.symbol} style={styles.card}>
            <Card.Content>
              <View style={styles.positionHeader}>
                <View>
                  <Text style={styles.symbol}>{position.symbol}</Text>
                  <Text style={styles.shares}>{position.shares} shares</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.positionValue}>${position.value.toFixed(2)}</Text>
                  <Text
                    style={[
                      styles.positionChange,
                      position.gain >= 0 ? styles.positive : styles.negative,
                    ]}
                  >
                    ${position.gain.toFixed(2)} ({position.gainPercent.toFixed(2)}%)
                  </Text>
                </View>
              </View>
              <View style={styles.priceInfo}>
                <View style={styles.priceItem}>
                  <Text style={styles.label}>Avg Price</Text>
                  <Text style={styles.price}>${position.avgPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.priceItem}>
                  <Text style={styles.label}>Current</Text>
                  <Text style={styles.price}>${position.currentPrice.toFixed(2)}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
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
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  value: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  change: {
    ...TYPOGRAPHY.body1,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  positionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  symbol: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  shares: {
    ...TYPOGRAPHY.body2,
    color: COLORS.subtext,
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  positionValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  positionChange: {
    ...TYPOGRAPHY.body2,
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  priceItem: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    ...TYPOGRAPHY.caption,
    color: COLORS.subtext,
    marginBottom: SPACING.xs,
  },
  price: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text,
  },
  positive: {
    color: COLORS.success,
  },
  negative: {
    color: COLORS.error,
  },
});

export default PortfolioScreen; 