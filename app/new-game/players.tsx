import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  useColorScheme,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider"; // Updated import
import { saveGame } from "@/utils/storage";
import { ThemedInput } from "@/components/ui/ThemedInput";

export default function PlayersScreen() {
  const { deckCount } = useLocalSearchParams();
  const numDecks = Number(deckCount);
  const [playerCount, setPlayerCount] = useState(3);
  const [players, setPlayers] = useState<string[]>(Array(3).fill(""));
  const [pointLimit, setPointLimit] = useState("500");
  const [gameName, setGameName] = useState("");

  const colorScheme = useColorScheme();
  const styleVariables = {
    backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#F5F5F5",
    cardBackground: colorScheme === "dark" ? "#2A2A2A" : "#FFFFFF",
    inputBackground: colorScheme === "dark" ? "#333333" : "#F8F8F8",
    borderColor: colorScheme === "dark" ? "#3A3A3A" : "#E5E5E5",
  };

  const handlePlayerNameChange = (index: number, text: string) => {
    const newPlayers = [...players];
    newPlayers[index] = text;
    setPlayers(newPlayers);
  };

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setPlayers((prev) => {
      const newPlayers = [...prev];
      if (count > prev.length) {
        return [...newPlayers, ...Array(count - prev.length).fill("")];
      }
      return newPlayers.slice(0, count);
    });
  };

  const startGame = async () => {
    if (!players) return;

    const gameConfig = {
      id: Date.now(),
      name: gameName.trim() || `Game ${new Date().toLocaleDateString()}`,
      deckCount: numDecks,
      playerCount,
      pointLimit: Number(pointLimit),
      diceCount: numDecks,
      papayoCount: numDecks, // Un seul Papayoo par deck
      maxPointsPerRound: 250 * numDecks, // 250 points par deck
      date: new Date(),
      currentRound: 1,
      players: players.map((name) => ({
        name: name.trim() || `Player ${players.indexOf(name) + 1}`,
        scores: [],
        total: 0,
      })),
      scores: [],
    };

    await saveGame(gameConfig);
    router.push(`/game/${gameConfig.id}`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: Platform.OS === "ios" ? "6%" : "5%",
      backgroundColor: styleVariables.backgroundColor,
    },
    setting: {
      marginVertical: "4%",
      padding: "5%",
      backgroundColor: styleVariables.cardBackground,
      borderRadius: 20,
      borderWidth: Platform.OS === "ios" ? 1 : 0,
      borderColor: styleVariables.borderColor,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colorScheme === "dark" ? 0.4 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    playerInput: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 6,
      padding: "4%",
      borderRadius: 16,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    input: {
      flex: 0.7,
      marginLeft: 12,
      padding: 12,
      borderRadius: 12,
      backgroundColor: styleVariables.inputBackground,
      borderWidth: 1,
      borderColor: styleVariables.borderColor,
    },
    button: {
      marginTop: "auto",
      marginBottom: Platform.OS === "ios" ? 20 : 10,
      paddingVertical: 16,
      marginHorizontal: "4%",
      borderRadius: 16,
    },
    pointInput: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: "3%", // updated
      fontSize: 16,
      marginTop: "2%", // updated
    },
    list: {
      width: "100%",
      paddingHorizontal: 10,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 20}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? 180 : 120,
          flexGrow: 1,
        }}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title">Game Setup</ThemedText>

          <ThemedView style={styles.setting}>
            <ThemedText type="subtitle">Game Name (optional)</ThemedText>
            <ThemedInput
              placeholder="Enter game name"
              value={gameName}
              onChangeText={setGameName}
              style={styles.input}
            />
          </ThemedView>

          <ThemedView style={styles.setting}>
            <ThemedText type="subtitle">Point Limit:</ThemedText>
            <ThemedInput
              style={styles.input}
              keyboardType="number-pad"
              value={pointLimit}
              onChangeText={setPointLimit}
              placeholder="Enter point limit"
            />
          </ThemedView>

          <ThemedView style={styles.setting}>
            <ThemedText type="subtitle">
              Number of Players: {playerCount}
            </ThemedText>
            <Slider
              value={playerCount}
              onValueChange={handlePlayerCountChange}
              minimum={3}
              maximum={8 * numDecks}
              step={1} // ensure it moves one unit at a time
            />
          </ThemedView>

          <FlatList
            data={players}
            renderItem={({ item, index }) => (
              <ThemedView style={styles.playerInput}>
                <ThemedText>Player {index + 1}</ThemedText>
                <ThemedInput
                  style={[
                    styles.input,
                    { borderWidth: 1, borderColor: "#ccc" },
                  ]} // refined style
                  value={item}
                  onChangeText={(text) => handlePlayerNameChange(index, text)}
                  placeholder={`Player ${index + 1}`}
                />
              </ThemedView>
            )}
            keyExtractor={(_, index) => index.toString()}
            style={styles.list}
          />

          <Button
            title="Start Game"
            onPress={startGame}
            disabled={players.some((name) => !name.trim()) || !pointLimit}
            style={styles.button}
          />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
