import {
  Pressable,
  PressableProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary";
  title?: string;
  disabled?: boolean;
}

export function Button({
  style,
  variant = "primary",
  title,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: variant === "primary" ? colors.tint : "transparent",
      borderColor: colors.tint,
      borderWidth: variant === "secondary" ? 1.5 : 0,
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  const textColor = variant === "primary" ? colors.buttonText : colors.tint;

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
          style={[{ color: textColor }, styles.buttonText]}
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
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      },
      default: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      },
    }),
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
