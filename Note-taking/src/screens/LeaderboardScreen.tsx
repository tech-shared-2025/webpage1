import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';

const LEADERBOARD_DATA = [
  {
    rank: 1,
    username: 'trader_pro',
    portfolioValue: 15750.25,
    returns: 57.50,
    avatar: 'T',
  },
  {
    rank: 2,
    username: 'stockmaster',
    portfolioValue: 13200.80,
    returns: 32.01,
    avatar: 'S',
  },
  {
    rank: 3,
    username: 'investorX',
    portfolioValue: 12450.60,
    returns: 24.51,
    avatar: 'I',
  },
  {
    rank: 4,
    username: 'marketwhiz',
    portfolioValue: 11800.40,
    returns: 18.00,
    avatar: 'M',
  },
  {
    rank: 5,
    username: 'daytrader99',
    portfolioValue: 10900.75,
    returns: 9.01,
    avatar: 'D',
  },
];

const LeaderboardScreen = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Leaderboard" subtitle="Top performing traders" />
      <ScrollView style={styles.content}>
        {LEADERBOARD_DATA.map((trader) => (
          <Card key={trader.rank} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.rankContainer}>
                <Text style={styles.rank}>#{trader.rank}</Text>
              </View>
              <Avatar.Text
                size={40}
                label={trader.avatar}
                style={styles.avatar}
                labelStyle={styles.avatarLabel}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.username}>{trader.username}</Text>
                <Text style={styles.portfolioValue}>
                  ${trader.portfolioValue.toFixed(2)}
                </Text>
                <Text style={[styles.returns, styles.positive]}>
                  +{trader.returns.toFixed(2)}%
                </Text>
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rank: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  avatar: {
    backgroundColor: COLORS.primaryLight,
  },
  avatarLabel: {
    ...TYPOGRAPHY.h3,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  portfolioValue: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  returns: {
    ...TYPOGRAPHY.body2,
    marginTop: SPACING.xs,
  },
  positive: {
    color: COLORS.success,
  },
  negative: {
    color: COLORS.error,
  },
});

export default LeaderboardScreen; 