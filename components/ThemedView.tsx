import {
  View,
  ViewProps,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { colors, responsive } from "@/theme/globalStyles";

interface ThemedViewProps extends ViewProps {
  useSafeArea?: boolean;
  withPadding?: boolean;
}

export function ThemedView({
  style,
  useSafeArea,
  withPadding,
  ...props
}: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? "light"];

  const containerStyle = [
    { backgroundColor: themeColors.background },
    useSafeArea && styles.safeArea,
    withPadding && {
      padding: responsive.spacing(16),
    },
    style,
  ];

  return <View style={containerStyle} {...props} />;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
  },
});
