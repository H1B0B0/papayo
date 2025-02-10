import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DESIGN_WIDTH = 375; // Base width (iPhone SE/iPhone 8)

export const responsive = {
  scale: (size: number) => {
    return (SCREEN_WIDTH / DESIGN_WIDTH) * size;
  },

  fontSize: (size: number) => {
    // Limite la taille minimale et maximale pour la lisibilité
    const scaledSize = (SCREEN_WIDTH / DESIGN_WIDTH) * size;
    return Math.min(Math.max(scaledSize, size * 0.8), size * 1.3);
  },

  spacing: (space: number) => {
    // Permet aux espacements d'être plus flexibles que les polices
    const scaledSpace = (SCREEN_WIDTH / DESIGN_WIDTH) * space;
    return Math.min(Math.max(scaledSpace, space * 0.7), space * 1.5);
  },
};

export const colors = {
  light: {
    // Main colors
    background: "#FFFFFF",
    card: "#F8F9FA",
    text: "#1A1A1A",
    secondaryText: "#666666",
    border: "#E5E5E5",
    tint: "#0A84FF",
    shadow: "rgba(0, 0, 0, 0.1)",

    // Component specific
    buttonPrimary: "#0A84FF",
    buttonSecondary: "#F1F5F9",
    buttonText: "#FFFFFF",
    buttonTextSecondary: "#0A84FF",
    inputBackground: "#F0F2F5", // Updated color
    inputBorder: "#E4E7EB",
    cardShadow: "rgba(0, 0, 0, 0.05)",
    progressBar: "rgba(0, 0, 0, 0.05)",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    // Main colors
    background: "#121214",
    card: "#18181B",
    text: "#FFFFFF",
    secondaryText: "#A1A1AA",
    border: "#27272A",
    tint: "#60A5FA",
    shadow: "rgba(0, 0, 0, 0.3)",

    // Component specific
    buttonPrimary: "#60A5FA",
    buttonSecondary: "#27272A",
    buttonText: "#FFFFFF",
    buttonTextSecondary: "#60A5FA",
    inputBackground: "#2D2D2D", // Updated color
    inputBorder: "#3D3D3D",
    cardShadow: "rgba(0, 0, 0, 0.2)",
    progressBar: "rgba(255, 255, 255, 0.1)",
    overlay: "rgba(0, 0, 0, 0.75)",
  },
};

export const spacing = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 24,
  round: 9999,
};

export const typography = {
  fonts: {
    regular: "System",
    mono: "SpaceMono",
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  } as const,
  sizes: {
    tiny: 12,
    small: 14,
    medium: 16,
    large: 18,
    xl: 20,
    title: 32,
  },
};

export const shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
