import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface ThemedInputProps extends TextInputProps {
  variant?: "default" | "card";
  lightColor?: string;
  darkColor?: string;
}

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  variant = "default",
  ...otherProps
}: ThemedInputProps) {
  const colorScheme = useColorScheme() ?? "light";
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const textColor = Colors[colorScheme].text;

  const variantStyle = variant === "card" ? styles.card : styles.default;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        style={[styles.input, variantStyle, { color: "dark" }, style]}
        placeholderTextColor={Colors[colorScheme].tint}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  default: {
    borderWidth: 1.5,
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.03)",
    textAlign: "center",
    borderWidth: 0,
  },
});
