import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
}

export function ProgressBar({ progress, color }: ProgressBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withSpring(progress, {
      mass: 1,
      damping: 15,
      stiffness: 100,
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progress,
          animatedStyle,
          { backgroundColor: color ?? colors.tint },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
  },
});
