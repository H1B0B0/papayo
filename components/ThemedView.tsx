import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export function ThemedView(props: View["props"]) {
  const { style, ...otherProps } = props;

  return (
    <View style={[{ backgroundColor: "transparent" }, style]} {...otherProps} />
  );
}
