import { View, StyleSheet, Platform, Pressable } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { colors, typography, shadows } from "@/theme/globalStyles";
import { ThemedText } from "@/components/ThemedText";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimum: number;
  maximum: number;
  step?: number;
}

export function Slider({
  value,
  onValueChange,
  minimum,
  maximum,
  step = 1,
}: SliderProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? "light"];

  // Ajouter des boutons + et - pour un contrôle plus précis
  const increment = () => {
    if (value < maximum) {
      onValueChange(value + step);
    }
  };

  const decrement = () => {
    if (value > minimum) {
      onValueChange(value - step);
    }
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <AnimatedPressable
          onPress={decrement}
          style={[
            styles.button,
            { backgroundColor: themeColors.buttonSecondary },
          ]}
        >
          <ThemedText style={styles.buttonText}>−</ThemedText>
        </AnimatedPressable>
        <View
          style={[styles.valueContainer, { backgroundColor: themeColors.card }]}
        >
          <ThemedText style={styles.value}>{value}</ThemedText>
        </View>
        <AnimatedPressable
          onPress={increment}
          style={[
            styles.button,
            { backgroundColor: themeColors.buttonSecondary },
          ]}
        >
          <ThemedText style={styles.buttonText}>+</ThemedText>
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: "center",
    marginVertical: 12,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.medium,
    ...Platform.select({
      ios: {
        shadowColor: colors.light.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.medium,
    marginTop: Platform.OS === "ios" ? -2 : 0,
    opacity: 0.8,
  },
  valueContainer: {
    minWidth: 80,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.small,
    ...Platform.select({
      ios: {
        shadowColor: colors.light.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  value: {
    fontSize: typography.sizes.large,
    fontWeight: typography.weights.semibold,
    textAlign: "center",
  },
});
