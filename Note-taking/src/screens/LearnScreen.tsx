import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { COLORS, SPACING, TYPOGRAPHY } from 'src/constants/theme';
import ScreenHeader from 'src/components/ScreenHeader';

const LEARNING_TOPICS = [
  {
    title: 'Stock Market Basics',
    description: 'Learn the fundamentals of how the stock market works.',
    icon: '📈',
  },
  {
    title: 'Trading Strategies',
    description: 'Discover different approaches to trading stocks.',
    icon: '🎯',
  },
  {
    title: 'Risk Management',
    description: 'Understand how to protect your investments.',
    icon: '🛡️',
  },
  {
    title: 'Technical Analysis',
    description: 'Learn to read and interpret stock charts.',
    icon: '📊',
  },
  {
    title: 'Fundamental Analysis',
    description: 'Evaluate companies using financial metrics.',
    icon: '🔍',
  },
];

const LearnScreen = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Learn"
        subtitle="Master the art of trading"
      />
      <ScrollView style={styles.content}>
        {LEARNING_TOPICS.map((topic, index) => (
          <Card
            key={index}
            style={styles.card}
            onPress={() => {
              // TODO: Navigate to detailed topic screen
              console.log(`Navigate to ${topic.title}`);
            }}
          >
            <Card.Content style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>{topic.icon}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{topic.title}</Text>
                <Text style={styles.description}>{topic.description}</Text>
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
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight + '10',
    borderRadius: 12,
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.body2,
    color: COLORS.subtext,
  },
});

export default LearnScreen; 