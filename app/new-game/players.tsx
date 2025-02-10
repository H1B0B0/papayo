import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { saveGame } from "@/utils/storage";
import { ThemedInput } from "@/components/ui/ThemedInput";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  responsive,
  typography,
} from "@/theme/globalStyles";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function PlayersScreen() {
  const { deckCount } = useLocalSearchParams();
  const numDecks = Number(deckCount);
  const [playerCount, setPlayerCount] = useState(3);
  const [players, setPlayers] = useState<string[]>(Array(3).fill(""));
  const [pointLimit, setPointLimit] = useState("500");
  const [gameName, setGameName] = useState("");

  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? "light"];
  const screenWidth = Dimensions.get("window").width;

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
      papayoCount: numDecks,
      maxPointsPerRound: 250 * numDecks,
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
      backgroundColor: themeColors.background,
      padding: responsive.spacing(spacing.large),
    },
    setting: {
      marginVertical: spacing.medium,
      padding: spacing.large,
      backgroundColor: themeColors.card,
      borderRadius: borderRadius.xl,
      borderWidth: Platform.OS === "ios" ? 1 : 0,
      borderColor: themeColors.border,
      ...shadows.medium,
    },
    settingContent: {
      marginTop: spacing.medium,
    },
    playerInput: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: spacing.small,
      padding: spacing.medium,
      borderRadius: borderRadius.xl,
      backgroundColor: themeColors.card,
      ...shadows.small,
    },
    input: {
      flex: 1,
      marginLeft: spacing.medium,
      height: 50,
      backgroundColor: themeColors.inputBackground,
      borderRadius: borderRadius.large,
      paddingHorizontal: spacing.medium,
      fontSize: typography.sizes.medium,
      color: themeColors.text,
      ...Platform.select({
        ios: {
          shadowColor: themeColors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    button: {
      marginTop: spacing.xl,
      marginBottom: Platform.OS === "ios" ? spacing.xxl : spacing.xl,
      paddingVertical: spacing.medium,
      marginHorizontal: spacing.medium,
      borderRadius: borderRadius.large,
      alignSelf: "center",
      width: "90%",
    },
    list: {
      width: "100%",
      paddingHorizontal: spacing.small,
    },
    playerNumber: {
      minWidth: 80,
      opacity: 0.8,
    },
    buttonContainer: {
      marginTop: spacing.xl,
      marginBottom: Platform.OS === "ios" ? spacing.xxl : spacing.xl,
      paddingVertical: spacing.medium,
      marginHorizontal: spacing.medium,
      borderRadius: borderRadius.large,
      alignSelf: "center",
      width: "90%",
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 20}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: themeColors.background }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS === "ios" ? spacing.xxl : spacing.xl,
        }}
      >
        <ThemedView style={[styles.container, { flex: 1 }]}>
          <ThemedText type="title">Game Setup</ThemedText>

          <ThemedView style={styles.setting}>
            <ThemedText type="subtitle">Game Name</ThemedText>
            <ThemedInput
              placeholder="Enter game name (optional)"
              value={gameName}
              onChangeText={setGameName}
              variant="filled"
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </ThemedView>

          <ThemedView style={styles.setting}>
            <ThemedText type="subtitle">Point Limit</ThemedText>
            <ThemedInput
              keyboardType="number-pad"
              value={pointLimit}
              onChangeText={setPointLimit}
              placeholder="Enter point limit"
              variant="filled"
              style={styles.input}
              returnKeyType="done"
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
              step={1}
            />
          </ThemedView>

          <FlatList
            scrollEnabled={false}
            data={players}
            renderItem={({ item, index }) => (
              <ThemedView style={styles.playerInput}>
                <ThemedText style={styles.playerNumber} type="body">
                  Player {index + 1}
                </ThemedText>
                <ThemedInput
                  style={styles.input}
                  variant="filled"
                  value={item}
                  onChangeText={(text) => handlePlayerNameChange(index, text)}
                  placeholder={`Player ${index + 1}`}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </ThemedView>
            )}
            keyExtractor={(_, index) => index.toString()}
            style={styles.list}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Start Game"
              onPress={startGame}
              disabled={players.some((name) => !name.trim()) || !pointLimit}
              style={styles.button}
              fullWidth
            />
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
