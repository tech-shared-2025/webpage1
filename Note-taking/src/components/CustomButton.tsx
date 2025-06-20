import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS, TYPOGRAPHY, SHADOWS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface CustomButtonProps {
  mode?: 'contained' | 'outlined' | 'text';
  onPress: () => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  mode = 'contained',
  onPress,
  label,
  loading = false,
  disabled = false,
  color,
  style,
  labelStyle,
  icon,
}) => {
  const getButtonStyle = () => {
    switch (mode) {
      case 'contained':
        return [
          styles.button,
          styles.containedButton,
          disabled && styles.disabledButton,
          style,
        ];
      case 'outlined':
        return [
          styles.button,
          styles.outlinedButton,
          disabled && styles.disabledOutlinedButton,
          style,
        ];
      default:
        return [styles.button, style];
    }
  };

  const getLabelStyle = () => {
    switch (mode) {
      case 'contained':
        return [
          styles.label,
          styles.containedLabel,
          disabled && styles.disabledLabel,
          labelStyle,
        ];
      case 'outlined':
        return [
          styles.label,
          styles.outlinedLabel,
          disabled && styles.disabledLabel,
          labelStyle,
        ];
      default:
        return [styles.label, styles.textLabel, labelStyle];
    }
  };

  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      icon={icon}
      color={color || COLORS.primary}
      style={getButtonStyle()}
      labelStyle={getLabelStyle()}
      uppercase={false}
    >
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.full,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  containedButton: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.sm,
  },
  outlinedButton: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  disabledButton: {
    backgroundColor: COLORS.disabled,
  },
  disabledOutlinedButton: {
    borderColor: COLORS.disabled,
  },
  label: {
    ...TYPOGRAPHY.button,
  },
  containedLabel: {
    color: COLORS.surface,
  },
  outlinedLabel: {
    color: COLORS.primary,
  },
  textLabel: {
    color: COLORS.primary,
  },
  disabledLabel: {
    color: COLORS.subtext,
  },
});

export default CustomButton; 