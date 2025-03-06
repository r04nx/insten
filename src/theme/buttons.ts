import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { typography, createTextStyle } from './typography';

export const buttonStyles = StyleSheet.create({
  base: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary.main,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  tertiary: {
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
  },
  // Text styles for buttons
  primaryText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: '#FFFFFF',
  },
  secondaryText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.primary.main,
  },
  tertiaryText: {
    ...createTextStyle('body', 'primary', 'medium'),
    color: colors.primary.main,
  },
  // Disabled states
  disabledPrimary: {
    backgroundColor: colors.primary.light,
    opacity: 0.5,
  },
  disabledSecondary: {
    borderColor: colors.primary.light,
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
}); 