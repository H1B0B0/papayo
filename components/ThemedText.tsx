import { Text, TextProps, StyleSheet, TextStyle, useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ThemedTextProps extends TextProps {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "link"
    | "title"
    | "default"
    | "defaultSemiBold"
    | "subtitle"
    | "buttonText";
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...props
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const defaultColor = Colors[colorScheme ?? "light"].text;

  const getTypeStyle = (): TextStyle => {
    const colors = Colors[colorScheme ?? 'light'];
    
    switch (type) {
      case "title":
        return { fontSize: 24, fontWeight: "700", color: defaultColor };
      case "subtitle":
        return { fontSize: 18, fontWeight: "600", color: defaultColor };
      case "defaultSemiBold":
        return { fontWeight: "600", color: defaultColor };
      case "link":
        return { color: colors.tint };
      case "buttonText":
        return { fontSize: 16, fontWeight: "600" };
      default:
        return { color: defaultColor };
    }
  };

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <Text
      style={[
        getTypeStyle(),
        style,
        lightColor || darkColor ? { color: textColor } : null,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
