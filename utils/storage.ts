import AsyncStorage from "@react-native-async-storage/async-storage";

const GAMES_KEY = "papayo_games";

export interface Game {
  id: number;
  name: string; // Add this new field
  deckCount: number;
  playerCount: number;
  pointLimit: number;
  diceCount: number;
  papayoCount: number;
  maxPointsPerRound: number;
  scores: number[][];
  date: Date;
  players: Player[];
  currentRound: number;
  decks: Deck[];
  availableCards: Card[]; // Cartes disponibles pour la partie
}

export interface Player {
  name: string;
  scores: number[];
  total: number;
}

export interface Card {
  id: string;
  value: number;
  isPapayo: boolean;
  suit?: "hearts" | "diamonds" | "clubs" | "spades";
}

export interface Deck {
  id: string;
  cards: Card[];
}

// Fonction utilitaire pour créer un deck
export function createDeck(deckIndex: number, totalDecks: number): Deck {
  const cards: Card[] = [];

  // Ajouter les cartes normales (1-20)
  for (let value = 1; value <= 20; value++) {
    cards.push({
      id: `deck${deckIndex}-normal-${value}`,
      value,
      isPapayo: false,
    });
  }

  // Calculer le nombre total de Papayos pour ce deck
  // Le nombre total de Papayos est réparti équitablement entre les decks
  const totalPapayos = totalDecks * totalDecks; // Ex: 2 decks = 4 papayos, 3 decks = 9 papayos
  const papayosPerDeck = totalPapayos / totalDecks;

  // Ajouter les Papayos
  for (let i = 0; i < papayosPerDeck; i++) {
    cards.push({
      id: `deck${deckIndex}-papayo-${i}`,
      value: 7,
      isPapayo: true,
      suit: "papayo" as Card["suit"],
    });
  }

  return {
    id: `deck-${deckIndex}`,
    cards,
  };
}

// Modifier la fonction saveGame pour passer le nombre total de decks
export async function saveGame(
  gameConfig: Omit<Game, "decks" | "availableCards">
): Promise<void> {
  try {
    const decks: Deck[] = [];
    const availableCards: Card[] = [];

    // Créer les decks et leurs cartes
    for (let i = 0; i < gameConfig.deckCount; i++) {
      const deck = createDeck(i, gameConfig.deckCount);
      decks.push(deck);
      availableCards.push(...deck.cards);
    }

    const fullGame: Game = {
      ...gameConfig,
      decks,
      availableCards,
    };

    const gamesJson = await AsyncStorage.getItem(GAMES_KEY);
    const games = gamesJson ? JSON.parse(gamesJson) : [];
    games.push(fullGame);
    await AsyncStorage.setItem(GAMES_KEY, JSON.stringify(games));
  } catch (e) {
    console.error("Error saving game:", e);
  }
}

export async function getGames(): Promise<Game[]> {
  try {
    const gamesJson = await AsyncStorage.getItem(GAMES_KEY);
    return gamesJson ? JSON.parse(gamesJson) : [];
  } catch (e) {
    console.error("Error loading games:", e);
    return [];
  }
}

export async function getGame(id: number): Promise<Game | null> {
  try {
    const games = await getGames();
    return games.find((game) => game.id === id) || null;
  } catch (e) {
    console.error("Error loading game:", e);
    return null;
  }
}

export async function deleteGame(id: number): Promise<void> {
  try {
    const games = await getGames();
    const filteredGames = games.filter((game) => game.id !== id);
    await AsyncStorage.setItem(GAMES_KEY, JSON.stringify(filteredGames));
  } catch (e) {
    console.error("Error deleting game:", e);
  }
}

export async function updateGame(game: Game): Promise<void> {
  try {
    const games = await getGames();
    const index = games.findIndex((g) => g.id === game.id);
    if (index !== -1) {
      games[index] = game;
      await AsyncStorage.setItem(GAMES_KEY, JSON.stringify(games));
    }
  } catch (e) {
    console.error("Error updating game:", e);
  }
}
