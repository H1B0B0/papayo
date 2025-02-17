import {
  Pressable,
  PressableProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  responsive,
} from "@/theme/globalStyles";

interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  title?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  style,
  variant = "primary",
  size = "medium",
  title,
  children,
  disabled,
  fullWidth,
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? "light"];

  const getButtonSize = () => {
    const baseHeight = size === "small" ? 40 : size === "medium" ? 48 : 56;
    return responsive.spacing(baseHeight);
  };

  const buttonStyles = [
    styles.button,
    {
      height: getButtonSize(),
      backgroundColor:
        variant === "primary"
          ? themeColors.buttonPrimary
          : themeColors.buttonSecondary,
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? "100%" : "auto",
    },
    shadows.medium,
    style,
  ];

  const textColor =
    variant === "primary"
      ? themeColors.buttonText
      : themeColors.buttonTextSecondary;

  return (
    <Pressable
      style={({ pressed }) =>
        [buttonStyles, pressed && styles.pressed] as StyleProp<ViewStyle>
      }
      disabled={disabled}
      {...props}
    >
      {title ? (
        <ThemedText
          type="buttonText"
          style={[
            styles.buttonText,
            {
              color: textColor,
              fontSize: responsive.fontSize(16),
            },
          ]}
        >
          {title}
        </ThemedText>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    minHeight: 48, // Ajout d'une hauteur minimale
    borderRadius: borderRadius.large,
    minWidth: 120,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20, // Ajout d'une hauteur de ligne fixe
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
