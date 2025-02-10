import { StyleSheet, TextInput, TextInputProps, Platform, View } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/theme/globalStyles';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ThemedInputProps extends TextInputProps {
  variant?: 'default' | 'filled';
}

export function ThemedInput({ style, variant = 'default', ...props }: ThemedInputProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];

  const styles = StyleSheet.create({
    input: {
      height: 50,
      fontSize: typography.sizes.medium,
      fontFamily: typography.fonts.regular,
      color: themeColors.text,
      padding: spacing.medium,
      borderRadius: borderRadius.large,
      backgroundColor: variant === 'filled' ? themeColors.inputBackground : 'transparent',
      borderWidth: variant === 'default' ? 1 : 0,
      borderColor: themeColors.border,
      ...Platform.select({
        ios: {
          shadowColor: themeColors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
  });

  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={themeColors.secondaryText}
      selectionColor={themeColors.tint}
      {...props}
    />
  );
}
