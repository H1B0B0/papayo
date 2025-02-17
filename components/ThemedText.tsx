import { Text, TextProps } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { colors, typography, responsive } from "@/theme/globalStyles";

interface ThemedTextProps extends TextProps {
  type?:
    | "title"
    | "subtitle"
    | "body"
    | "caption"
    | "buttonText"
    | "link"
    | "defaultSemiBold";
  weight?: keyof typeof typography.weights;
}

export function ThemedText({
  style,
  type = "body",
  weight = "regular",
  ...props
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? "light"];

  const getTextStyle = () => {
    const baseStyles: any = {
      color: themeColors.text,
      fontFamily: typography.fonts.regular,
      fontWeight: typography.weights[weight],
    };

    switch (type) {
      case "title":
        baseStyles.fontSize = responsive.fontSize(typography.sizes.title);
        baseStyles.lineHeight = responsive.fontSize(
          typography.sizes.title * 1.2,
        );
        break;
      case "subtitle":
        baseStyles.fontSize = responsive.fontSize(typography.sizes.xl);
        baseStyles.lineHeight = responsive.fontSize(typography.sizes.xl * 1.3);
        break;
      case "body":
        baseStyles.fontSize = responsive.fontSize(typography.sizes.medium);
        baseStyles.lineHeight = responsive.fontSize(
          typography.sizes.medium * 1.5,
        );
        break;
      case "caption":
        baseStyles.fontSize = responsive.fontSize(typography.sizes.small);
        baseStyles.color = themeColors.secondaryText;
        break;
      case "buttonText":
        baseStyles.fontSize = responsive.fontSize(typography.sizes.medium);
        baseStyles.fontWeight = typography.weights.semibold;
        break;
      case "link":
        baseStyles.fontSize = responsive.fontSize(typography.sizes.medium);
        baseStyles.color = themeColors.tint;
        break;
      case "defaultSemiBold":
        baseStyles.fontSize = responsive.fontSize(typography.sizes.medium);
        baseStyles.fontWeight = typography.weights.semibold;
        break;
    }

    return baseStyles;
  };

  return <Text style={[getTextStyle(), style]} {...props} />;
}
