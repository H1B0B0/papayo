import { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function DeckSelectScreen() {
  const [deckCount, setDeckCount] = useState(1);
  const colorScheme = useColorScheme();
  const styleVariables = {
    backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#F5F5F5",
    cardBackground: colorScheme === "dark" ? "#2A2A2A" : "#FFFFFF",
  };

  const handleNext = () => {
    router.push({
      pathname: "/new-game/players",
      params: { deckCount },
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: "6%",
      paddingTop: Platform.OS === "ios" ? "12%" : "8%",
      backgroundColor: styleVariables.backgroundColor,
    },
    setting: {
      marginTop: "8%",
      padding: "6%",
      backgroundColor: styleVariables.cardBackground,
      borderRadius: 20,
      borderWidth: Platform.OS === "ios" ? 1 : 0,
      borderColor: colorScheme === "dark" ? "#3A3A3A" : "#E5E5E5",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colorScheme === "dark" ? 0.4 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    button: {
      position: "absolute",
      bottom: Platform.OS === "ios" ? 40 : 20,
      left: "6%",
      right: "6%",
      paddingVertical: 16,
      borderRadius: 16,
      backgroundColor: Colors.light.tint,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Select Number of Decks</ThemedText>

      <ThemedView style={styles.setting}>
        <ThemedText type="subtitle">Decks: {deckCount}</ThemedText>
        <Slider
          value={deckCount}
          onValueChange={setDeckCount}
          minimum={1}
          maximum={4}
          step={1}
        />
      </ThemedView>

      <Button onPress={handleNext} style={styles.button}>
        <ThemedText type="buttonText">Next</ThemedText>
      </Button>
    </ThemedView>
  );
}
