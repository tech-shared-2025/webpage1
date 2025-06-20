import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Stock } from '../types';
import { COLORS, TYPOGRAPHY, SHADOWS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface StockCardProps {
  stock: Stock;
  onPress?: () => void;
  showDetails?: boolean;
}

const StockCard: React.FC<StockCardProps> = ({
  stock,
  onPress,
  showDetails = true,
}) => {
  const isPositive = stock.change >= 0;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <View style={styles.mainInfo}>
            <View style={styles.symbolContainer}>
              <Text style={styles.symbol}>{stock.symbol}</Text>
              <Text style={styles.companyName} numberOfLines={1}>
                {stock.companyName}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                ${stock.currentPrice.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.change,
                  { color: isPositive ? COLORS.success : COLORS.error },
                ]}
              >
                {isPositive ? '+' : ''}
                {stock.changePercent.toFixed(2)}%
              </Text>
            </View>
          </View>

          {showDetails && (
            <View style={styles.details}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Open</Text>
                  <Text style={styles.detailValue}>
                    ${stock.open.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>High</Text>
                  <Text style={styles.detailValue}>
                    ${stock.high.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Low</Text>
                  <Text style={styles.detailValue}>
                    ${stock.low.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
    ...SHADOWS.sm,
  },
  content: {
    padding: SPACING.md,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  symbolContainer: {
    flex: 1,
  },
  symbol: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  companyName: {
    ...TYPOGRAPHY.body2,
    color: COLORS.subtext,
    marginTop: SPACING.xs,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  change: {
    ...TYPOGRAPHY.body2,
    fontWeight: '600',
    marginTop: SPACING.xs,
  },
  details: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.subtext,
    marginBottom: SPACING.xs,
  },
  detailValue: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text,
    fontWeight: '500',
  },
});

export default StockCard; 