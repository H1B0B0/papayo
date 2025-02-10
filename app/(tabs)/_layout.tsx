import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: true,
        headerTitleStyle: {
          fontFamily: "SpaceMono",
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              backgroundColor: "transparent",
              position: "absolute",
              height: 84,
              paddingBottom: 24,
            },
            default: {
              height: 64,
              paddingBottom: 12,
            },
          }),
        },
        tabBarItemStyle: {
          padding: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Games",
          headerTitle: "Games",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="play.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Rules",
          headerTitle: "Game Rules",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
