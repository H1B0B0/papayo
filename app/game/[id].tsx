import React, {
  useCallback,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { useLocalSearchParams, router, useNavigation } from "expo-router";
import {
  StyleSheet,
  Alert,
  View,
  FlatList,
  useColorScheme,
  type TextStyle,
  ScrollView,
} from "react-native";
import { FadeIn, FadeInDown, SlideInUp } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { ProgressBar } from "@/components/ui/ProgressBar";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Player, Game, getGame, updateGame } from "@/utils/storage";
import { colors as globalColors, spacing } from "@/theme/globalStyles";
import { typography, borderRadius, shadows } from "@/theme/globalStyles";

interface SelectedCard {
  value: number;
  isPapayo: boolean;
}

interface GameWithDice extends Game {
  currentDiceValue?: number;
}

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [game, setGame] = useState<GameWithDice | null>(null);
  const [selectedCards, setSelectedCards] = useState<{
    [playerId: number]: SelectedCard[];
  }>({});
  const [showCardSelector, setShowCardSelector] = useState<number | null>(null);

  // Supprimer le bouton home et son handler car on utilise déjà le back button natif
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: game?.name || "Game",
    });
  }, [navigation, game?.name]);

  const loadGame = useCallback(async () => {
    const gameData = await getGame(Number(id));
    setGame(gameData);
    setSelectedCards({});
  }, [id]);

  useEffect(() => {
    loadGame();
  }, [id, loadGame]);

  // Modifier le style du cardSelector pour utiliser le colorScheme correctement
  const colorScheme = useColorScheme();
  const appColors = globalColors[colorScheme ?? "light"];

  // Moved styles block inside the component function so that appColors is in scope.
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: spacing.medium,
      paddingHorizontal: spacing.medium,
    },
    header: {
      paddingHorizontal: spacing.medium,
      paddingBottom: spacing.large,
      marginBottom: spacing.large,
      borderBottomWidth: 0.5,
      borderBottomColor: appColors.border, // updated here
    },
    scoresHeader: {
      marginBottom: spacing.medium,
    },
    playerScores: {
      flexDirection: "row",
      marginVertical: spacing.small,
    },
    scoreRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing.medium,
      padding: spacing.medium,
      marginHorizontal: spacing.medium,
      borderRadius: 20,
      borderWidth: 1.5,
      backgroundColor: "rgba(0, 0, 0, 0.03)",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    playerInfo: {
      flex: 1,
    },
    endRoundButton: {
      marginTop: spacing.medium,
      paddingVertical: spacing.medium,
      paddingHorizontal: spacing.large,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardSelector: {
      position: "absolute",
      left: spacing.medium,
      right: spacing.medium,
      top: spacing.medium,
      bottom: spacing.medium,
      borderRadius: borderRadius.xl,
      overflow: "hidden",
      zIndex: 1000,
      backgroundColor: appColors.card,
      ...shadows.large,
    },
    elevation: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    normalCards: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: spacing.small,
      marginBottom: spacing.large,
      paddingHorizontal: spacing.small,
    },
    cardButton: {
      width: "18%",
      aspectRatio: 1,
      borderRadius: borderRadius.large,
      padding: spacing.small,
      backgroundColor: appColors.buttonSecondary,
      ...shadows.medium,
    },
    papayoSection: {
      flexDirection: "row",
      gap: spacing.small,
    },
    papayoButton: {
      padding: spacing.medium,
      marginVertical: spacing.small,
      borderRadius: borderRadius.large,
      backgroundColor: appColors.buttonSecondary,
      ...shadows.medium,
    },
    doneButtonContainer: {
      padding: spacing.medium,
      borderTopWidth: 1,
      borderTopColor: appColors.border,
      backgroundColor: appColors.card,
    },
    doneButton: {
      width: "100%",
      paddingVertical: spacing.medium,
      borderRadius: 8,
    },
    disabledCard: {
      opacity: 0.5,
    },
    selectedCardsPreview: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.small,
      marginBottom: spacing.medium,
      padding: spacing.medium,
      borderRadius: borderRadius.large,
      backgroundColor: appColors.card,
      minHeight: 60,
      ...shadows.small,
    },
    selectedCard: {
      padding: spacing.medium,
      backgroundColor: appColors.buttonSecondary,
      borderRadius: borderRadius.medium,
      fontSize: typography.sizes.medium,
      color: appColors.text,
      ...shadows.small,
    } as TextStyle,
    controlSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: spacing.medium,
      paddingTop: spacing.medium,
      borderTopWidth: 1,
      borderTopColor: appColors.border,
      backgroundColor: appColors.card,
      borderRadius: borderRadius.large,
      padding: spacing.medium,
      ...shadows.small,
    },
    zeroButton: {
      width: "18%",
      aspectRatio: 1,
      borderRadius: borderRadius.large,
      padding: spacing.small,
      backgroundColor: appColors.buttonSecondary,
      ...shadows.medium,
    },
    headerSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.medium,
      paddingBottom: spacing.medium,
      borderBottomWidth: 1,
      borderBottomColor: appColors.border,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center", // Assure l'alignement horizontal
      marginBottom: spacing.small,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingVertical: spacing.small,
      marginBottom: spacing.medium,
    },
    homeButton: {
      width: 44,
      height: 44,
      padding: 0,
      borderRadius: 22,
    },
    pointsText: {
      marginTop: spacing.small,
      opacity: 0.8,
    },
    scoreContainer: {
      marginTop: spacing.small,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.small,
      paddingRight: spacing.small,
    },
    progressContainer: {
      flex: 1,
      marginRight: spacing.medium,
    },
    currentScoreContainer: {
      backgroundColor: appColors.tint, // updated here
      paddingHorizontal: spacing.medium,
      paddingVertical: spacing.small,
      borderRadius: borderRadius.large,
      minWidth: 60,
      alignItems: "center",
    },
    currentScore: {
      color: "white",
      fontWeight: "600",
      fontSize: typography.sizes.medium,
    },
    scoreText: {
      fontSize: typography.sizes.small,
      opacity: 0.8,
    },
  });

  // Modifier le calcul des points pour respecter les règles
  const calculatePlayerScore = (cards: SelectedCard[]) => {
    return cards.reduce((sum, card) => {
      if (card.isPapayo) {
        return sum + 40; // Toujours 40 points pour un Papayo
      }
      return sum + card.value;
    }, 0);
  };

  const handleCardSelection = (playerId: number) => {
    // Initialiser les cartes du joueur si nécessaire
    if (!selectedCards[playerId]) {
      setSelectedCards((prev) => ({
        ...prev,
        [playerId]: [],
      }));
    }
    setShowCardSelector(playerId);
  };

  const handleSelectCard = (
    playerId: number,
    value: number,
    isPapayo: boolean,
  ) => {
    setSelectedCards((prev) => ({
      ...prev,
      [playerId]: [...(prev[playerId] || []), { value, isPapayo }],
    }));
  };

  const getTotalDeckPoints = (game: GameWithDice): number => {
    if (!game?.availableCards) return 0;
    return game.availableCards.reduce((total, card) => {
      if (card.isPapayo) {
        return total + 40;
      }
      return total + card.value;
    }, 0);
  };

  const calculateRemainingPoints = (): number => {
    if (!game) return 0;
    const totalDeckPoints = getTotalDeckPoints(game);
    const usedPoints = Object.values(selectedCards).reduce(
      (sum: number, cards: SelectedCard[]) => sum + calculatePlayerScore(cards),
      0,
    );
    return totalDeckPoints - usedPoints;
  };

  const isCardAvailable = (value: number, isPapayo: boolean) => {
    if (!game?.availableCards) return false;

    const allSelectedCards = Object.values(selectedCards).flat();

    // Vérifier d'abord si la carte est disponible dans le jeu
    const availableCardsOfValue = game.availableCards.filter((card) =>
      isPapayo ? card.isPapayo : !card.isPapayo && card.value === value,
    );

    if (availableCardsOfValue.length === 0) return false;

    // Ensuite vérifier combien de ces cartes sont déjà sélectionnées
    const selectedCount = allSelectedCards.filter((card) =>
      isPapayo ? card.isPapayo : !card.isPapayo && card.value === value,
    ).length;

    return selectedCount < availableCardsOfValue.length;
  };

  const getPapayoInfo = () => {
    if (!game?.availableCards) return { selected: 0, total: 0 };

    const totalPapayos = game.availableCards.filter(
      (card) => card.isPapayo,
    ).length;
    const selectedPapayos = Object.values(selectedCards)
      .flat()
      .filter((card) => card.isPapayo).length;

    return { selected: selectedPapayos, total: totalPapayos };
  };

  const renderCardSelectorContent = (playerId: number) => {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: appColors.background,
        }}
        contentContainerStyle={{
          padding: spacing.medium,
          paddingBottom: spacing.xxl,
          gap: spacing.medium,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.headerSection}>
          <ThemedText type="subtitle" style={{ color: appColors.text }}>
            Select Cards
          </ThemedText>
          <ThemedText style={{ color: appColors.text }}>
            Total: {calculatePlayerScore(selectedCards[playerId] || [])}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.selectedCardsPreview}>
          {selectedCards[playerId]?.map((card: SelectedCard, index: number) => (
            <ThemedText
              key={index}
              style={[styles.selectedCard, { color: appColors.text }]}
            >
              {card.isPapayo ? "🃏 Papayo (40)" : card.value}
            </ThemedText>
          ))}
        </ThemedView>

        <ThemedView style={styles.normalCards}>
          {/* Ajout du bouton 0 */}
          <Button
            key="zero"
            title="0"
            onPress={() => handleSelectCard(playerId, 0, false)}
            variant="primary"
            style={[styles.zeroButton]}
          />

          {Array.from({ length: 20 }, (_, i) => i + 1).map((value) => {
            const isAvailable = isCardAvailable(value, false);
            return (
              <Button
                key={value}
                title={value.toString()}
                onPress={() => handleSelectCard(playerId, value, false)}
                disabled={!isAvailable}
                variant={isAvailable ? "primary" : "secondary"}
                style={[styles.cardButton, !isAvailable && styles.disabledCard]}
              />
            );
          })}
        </ThemedView>

        <ThemedView style={styles.papayoSection}>
          <Button
            title={`🃏 Papayo (40) ${
              game
                ? `[${getPapayoInfo().selected}/${getPapayoInfo().total}]`
                : ""
            }`}
            onPress={() => handleSelectCard(playerId, 7, true)}
            disabled={!isCardAvailable(7, true)}
            variant={isCardAvailable(7, true) ? "primary" : "secondary"}
            style={styles.papayoButton}
          />
        </ThemedView>

        <ThemedView style={styles.controlSection}>
          <ThemedView>
            <ThemedText style={{ color: appColors.text }}>
              Selected: {calculatePlayerScore(selectedCards[playerId] || [])}
            </ThemedText>
            <ThemedText style={{ color: appColors.text }}>
              Total deck points: {game ? getTotalDeckPoints(game) : 0}
            </ThemedText>
            <ThemedText style={{ color: appColors.text }}>
              Remaining: {calculateRemainingPoints()}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    );
  };

  // Calcul du total attendu par manche en fonction du nombre de decks
  const calculateExpectedRoundTotal = (game: GameWithDice): number => {
    // Chaque deck = 250 points officiels
    return (game.deckCount || 1) * 250;
  };

  // La somme totale des points par manche doit être 250
  const validateRoundScore = () => {
    if (!game) return false;
    const expectedTotal = getTotalDeckPoints(game);
    const totalRoundScore = Object.values(selectedCards).reduce(
      (sum: number, cards: SelectedCard[]) => sum + calculatePlayerScore(cards),
      0,
    );
    return totalRoundScore === expectedTotal;
  };

  // Modifier endRound pour valider les scores
  const endRound = async () => {
    if (!game) return;

    // Vérifier que selectedCards existe avant de vérifier sa longueur
    if (!selectedCards || Object.keys(selectedCards).length === 0) {
      Alert.alert("Error", "No scores selected");
      return;
    }

    if (!validateRoundScore()) {
      const expectedTotal = calculateExpectedRoundTotal(game);
      Alert.alert(
        "Invalid Score",
        `The total round score must equal ${expectedTotal} points.`,
        [{ text: "OK" }],
      );
      return;
    }

    const newGame = { ...game };
    newGame.players.forEach((player, index) => {
      const score = calculatePlayerScore(selectedCards[index] || []);
      player.scores.push(score);
      player.total += score;
    });
    newGame.currentRound += 1;

    await updateGame(newGame);

    const gameOver = newGame.players.some((p) => p.total >= game.pointLimit);

    if (gameOver) {
      // Sort players by total score
      const sortedPlayers = [...newGame.players].sort(
        (a, b) => a.total - b.total,
      );

      // Create ranking string
      let ranking = "Game Over!\n\nRanking:\n";
      sortedPlayers.forEach((player, index) => {
        ranking += `${index + 1}. ${player.name}: ${player.total} points\n`;
      });

      Alert.alert(
        "Game Over",
        ranking,
        [
          {
            text: "New Game",
            onPress: () => router.replace("/new-game/deck-select"),
          },
          { text: "Home", onPress: () => router.replace("/") },
        ],
        { cancelable: false },
      );
    } else {
      setGame(newGame);
      setSelectedCards({});
    }
  };

  const renderItem = ({ item, index }: { item: Player; index: number }) => {
    const progress = item.total / (game?.pointLimit || 1);
    const currentScore = calculatePlayerScore(selectedCards[index] || []);

    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100)}
        style={[styles.scoreRow, { borderColor: appColors.border }]}
      >
        <ThemedView style={styles.playerInfo}>
          <ThemedText type="subtitle">{item.name}</ThemedText>
          <View style={styles.scoreContainer}>
            <View style={styles.progressContainer}>
              <ProgressBar progress={progress} />
              <ThemedText style={styles.scoreText}>
                {item.total} / {game?.pointLimit}
              </ThemedText>
            </View>
            {currentScore > 0 && (
              <Animated.View
                entering={FadeIn}
                style={styles.currentScoreContainer}
              >
                <ThemedText style={styles.currentScore}>
                  +{currentScore}
                </ThemedText>
              </Animated.View>
            )}
          </View>
        </ThemedView>
        <Button
          title="Select Cards"
          onPress={() => handleCardSelection(index)}
          variant="secondary"
        />
      </Animated.View>
    );
  };

  if (!game) return <ThemedText>Loading...</ThemedText>;

  return (
    <ThemedView style={styles.container} pointerEvents="box-none">
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerTop}>
          <ThemedText type="subtitle">{game.name}</ThemedText>
        </ThemedView>
        <ThemedText type="title">Round {game.currentRound}</ThemedText>
        <ThemedText style={styles.pointsText}>
          Points remaining: {calculateRemainingPoints()} /{" "}
          {getTotalDeckPoints(game)}
        </ThemedText>
      </ThemedView>

      <FlatList<Player>
        data={game.players}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <ThemedView style={styles.scoresHeader}>
            <ThemedText type="subtitle">Previous rounds:</ThemedText>
            {game.players.map((player: Player, i: number) => (
              <ThemedView key={i} style={styles.playerScores}>
                <ThemedText>{player.name}: </ThemedText>
                <ThemedText>{player.scores.join(" → ")}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        }
      />

      <Button
        title="End Round"
        onPress={endRound}
        disabled={Object.keys(selectedCards).length === 0}
        style={styles.endRoundButton}
      />

      {showCardSelector !== null && (
        <>
          <Animated.View
            entering={FadeIn}
            style={styles.overlay}
            pointerEvents="auto"
          />
          <Animated.View
            entering={SlideInUp}
            style={[
              styles.cardSelector,
              styles.elevation,
              {
                backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF",
              },
            ]}
            pointerEvents="auto"
          >
            <View style={{ flex: 1 }}>
              {renderCardSelectorContent(showCardSelector)}
            </View>
            <ThemedView style={styles.doneButtonContainer}>
              <Button
                title="Done"
                onPress={() => setShowCardSelector(null)}
                style={styles.doneButton}
                variant="primary"
              />
            </ThemedView>
          </Animated.View>
        </>
      )}
    </ThemedView>
  );
}
