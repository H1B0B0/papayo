/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#000",
    background: "#f9f9f9",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    border: "#e0e0e0",
    cardBackground: "#fff",
    shadow: "#000",
    buttonText: "#fff",
  },
  dark: {
    text: "#fff",
    background: "#121212",
    tint: tintColorDark,
    tabIconDefault: "#888",
    tabIconSelected: tintColorDark,
    border: "#222",
    cardBackground: "#1e1e1e",
    shadow: "#000",
    buttonText: "#000",
  },
};
