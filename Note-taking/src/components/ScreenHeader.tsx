import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  subtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.subtext,
    marginTop: SPACING.xs,
  },
});

export default ScreenHeader; 