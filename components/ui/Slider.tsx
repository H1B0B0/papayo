import { View, StyleSheet, Platform, Pressable } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

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
  const tintColor = Colors[colorScheme ?? "light"].tint;

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

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Pressable onPress={decrement} style={styles.button}>
          <ThemedText style={styles.buttonText}>−</ThemedText>
        </Pressable>
        <View style={styles.valueContainer}>
          <ThemedText style={styles.value}>{value}</ThemedText>
        </View>
        <Pressable onPress={increment} style={styles.button}>
          <ThemedText style={styles.buttonText}>+</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    marginVertical: 16,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Platform.select({ ios: "#E5E5EA", android: "#DEDEDE" }),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "400",
    marginTop: -2, // Ajustement pour le centrage visuel
  },
  valueContainer: {
    minWidth: 60,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
