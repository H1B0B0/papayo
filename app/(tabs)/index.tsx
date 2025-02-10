import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Platform } from "react-native";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Game, getGames, deleteGame } from "@/utils/storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { colors as globalColors, spacing } from "@/theme/globalStyles";

export default function HomeScreen() {
  const [games, setGames] = useState<Game[]>([]);
  const colorScheme = useColorScheme();
  const appColors = globalColors[colorScheme ?? "light"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? "12%" : "8%",
      backgroundColor: appColors.background,
    },
    newGameButton: {
      margin: spacing.medium,
      paddingVertical: 16,
      borderRadius: 16,
      backgroundColor: appColors.tint,
      shadowColor: appColors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
    list: {
      flex: 1,
      paddingHorizontal: spacing.medium,
    },
    gameItem: {
      padding: spacing.medium,
      marginBottom: spacing.small,
      marginHorizontal: spacing.small,
      borderRadius: 20,
      backgroundColor: appColors.card,
      borderWidth: Platform.OS === "ios" ? 1 : 0,
      borderColor: appColors.border,
      shadowColor: appColors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    gameInfo: {
      gap: 10,
      marginBottom: "4%",
      paddingBottom: "4%",
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0,0,0,0.05)",
    },
    gameActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 12,
      marginTop: "2%",
    },
  });

  const gameItemStyle = {
    ...styles.gameItem,
    backgroundColor: appColors.card,
    borderColor: appColors.border,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      },
      default: {
        shadowColor: appColors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 5,
      },
    }),
  };

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    const savedGames = await getGames();
    if (!savedGames) return;

    setGames(
      savedGames.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  const handleDeleteGame = async (id: number) => {
    await deleteGame(id);
    await loadGames();
  };

  const renderGameItem = ({ item }: { item: Game }) => (
    <ThemedView style={gameItemStyle}>
      <ThemedView style={[styles.gameInfo, { backgroundColor: "transparent" }]}>
        <ThemedText type="subtitle">{item.name}</ThemedText>
        <ThemedText>{new Date(item.date).toLocaleDateString()}</ThemedText>
        <ThemedText>{item.playerCount} players</ThemedText>
        <ThemedText>{item.deckCount} decks</ThemedText>
      </ThemedView>
      <ThemedView
        style={[styles.gameActions, { backgroundColor: "transparent" }]}
      >
        <Button
          title="Continue"
          onPress={() => router.push(`/game/${item.id}`)}
        />
        <Button
          variant="secondary"
          title="Delete"
          onPress={() => handleDeleteGame(item.id)}
        />
      </ThemedView>
    </ThemedView>
  );

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: appColors.background }]}
    >
      <Button
        style={styles.newGameButton}
        title="New Game"
        onPress={() => router.push("/new-game/deck-select")}
      />
      <FlatList
        data={games}
        renderItem={renderGameItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </ThemedView>
  );
}
