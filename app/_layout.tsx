import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { View, Platform } from "react-native";
import "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { colors as globalColors, spacing, fonts } from "@/theme/globalStyles";
import { useColorScheme } from "@/hooks/useColorScheme";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }

  const appColors = globalColors[colorScheme ?? "light"];

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          headerStyle: {
            backgroundColor: appColors.background,
          },
          headerTitleStyle: {
            fontFamily: fonts.medium,
            fontSize: 20,
            fontWeight: "600",
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: appColors.background,
            paddingHorizontal: spacing.medium,
            paddingBottom: Platform.OS === "ios" ? 50 : 30,
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="game/[id]"
          options={{
            headerShown: true,
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="new-game/deck-select"
          options={{
            headerShown: true,
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="new-game/players"
          options={{
            headerShown: true,
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

// Error boundary
export function ErrorBoundary(props: { error: Error; retry: () => void }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemedText>{props.error.message}</ThemedText>
      <Button onPress={props.retry} title="Try again" />
    </View>
  );
}
