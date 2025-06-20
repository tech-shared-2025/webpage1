import { DefaultTheme } from 'react-native-paper';

export const COLORS = {
  primary: '#2563EB', // Modern blue
  primaryLight: '#60A5FA',
  primaryDark: '#1E40AF',
  secondary: '#10B981', // Fresh green
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  background: '#F8FAFC', // Light gray background
  surface: '#FFFFFF',
  error: '#EF4444', // Modern red
  warning: '#F59E0B', // Warm orange
  success: '#10B981', // Fresh green
  info: '#3B82F6', // Light blue
  text: '#1E293B', // Dark slate
  subtext: '#64748B', // Medium slate
  border: '#E2E8F0', // Light slate
  card: '#FFFFFF',
  disabled: '#CBD5E1',
  placeholder: '#94A3B8',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
    background: COLORS.background,
    surface: COLORS.surface,
    error: COLORS.error,
    text: COLORS.text,
    disabled: COLORS.disabled,
    placeholder: COLORS.placeholder,
    backdrop: COLORS.backdrop,
  },
  roundness: BORDER_RADIUS.md,
};

export const chartConfig = {
  backgroundColor: COLORS.surface,
  backgroundGradientFrom: COLORS.surface,
  backgroundGradientTo: COLORS.surface,
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
  style: {
    borderRadius: BORDER_RADIUS.lg,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: COLORS.primary,
  },
}; 