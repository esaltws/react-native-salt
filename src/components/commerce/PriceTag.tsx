import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import { SizeToken } from "../../types";

type Props = {
  amount: number;
  currency?: string;
  original?: number;
  size?: SizeToken;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function PriceTag({
  amount,
  currency = "$",
  original,
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, fontSizes, spacing } = theme;

  const sizeStyles: Record<SizeToken, { fontSize: number; originalFontSize: number }> = {
    sm: { fontSize: fontSizes.sm, originalFontSize: fontSizes.xs },
    md: { fontSize: fontSizes.xxl, originalFontSize: fontSizes.sm },
    lg: { fontSize: fontSizes.xxl, originalFontSize: fontSizes.md },
  };

  const { fontSize, originalFontSize } = sizeStyles[size];
  const formattedAmount = `${currency}${amount.toFixed(2)}`;
  const hasDiscount = original !== undefined && original > amount;

  return (
    <View testID={testID} style={[styles.container, { gap: spacing.xs }, style]}>
      <Text style={{ fontSize, fontWeight: "700", color: colors.text }}>
        {formattedAmount}
      </Text>
      {hasDiscount ? (
        <Text
          style={{
            fontSize: originalFontSize,
            color: colors.muted,
            textDecorationLine: "line-through",
          }}
        >
          {currency}{original!.toFixed(2)}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});
