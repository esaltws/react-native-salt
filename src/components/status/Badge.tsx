import React from "react";
import { View, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { resolveIntentColor } from "../../theme/intent";
import { Intent, Size } from "../../types";

type Props = {
  label: string;
  intent?: Intent;
  variant?: "solid" | "outline";
  size?: Size;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Badge({
  label,
  intent = "primary",
  variant = "solid",
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const sizeStyles: Record<Size, { paddingVertical: number; paddingHorizontal: number; fontSize: number }> = {
    sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, fontSize: fontSizes.xs },
    md: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, fontSize: fontSizes.sm },
    lg: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, fontSize: fontSizes.md },
  };

  const intentColor = resolveIntentColor(colors, intent);
  const { paddingVertical, paddingHorizontal, fontSize } = sizeStyles[size];

  const containerStyle: StyleProp<ViewStyle> = [
    styles.base,
    { borderRadius: radius.pill, paddingVertical, paddingHorizontal },
    variant === "solid" && { backgroundColor: intentColor },
    variant === "outline" && { backgroundColor: "transparent", borderWidth: 1, borderColor: intentColor },
    style,
  ];

  const textColor = variant === "solid" ? colors.surface : intentColor;

  return (
    <View testID={testID} style={containerStyle}>
      <Text style={[styles.label, { fontSize, color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "600",
  },
});
