import React from "react";
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import { Size } from "../../types";

type Props = {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function QuantitySelector({
  value,
  onValueChange,
  min = 1,
  max = 99,
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, radius, spacing, fontSizes, sizeMap } = theme;

  const btnSize = sizeMap[size];
  const fontSize = fontSizes[size];
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View testID={testID} style={[styles.container, { gap: spacing.sm }, style]}>
      <Pressable
        onPress={() => canDecrement && onValueChange(value - 1)}
        style={[
          styles.button,
          {
            width: btnSize,
            height: btnSize,
            borderRadius: radius.sm,
            backgroundColor: canDecrement ? colors.primary : colors.border,
          },
        ]}
        disabled={!canDecrement}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        accessibilityState={{ disabled: !canDecrement }}
      >
        <Text
          style={{
            color: canDecrement ? colors.surface : colors.muted,
            fontSize,
            fontWeight: "700",
          }}
        >
          −
        </Text>
      </Pressable>

      <View style={[styles.valueContainer, { minWidth: btnSize }]}>
        <Text style={{ fontSize, fontWeight: "600" }}>{value}</Text>
      </View>

      <Pressable
        onPress={() => canIncrement && onValueChange(value + 1)}
        style={[
          styles.button,
          {
            width: btnSize,
            height: btnSize,
            borderRadius: radius.sm,
            backgroundColor: canIncrement ? colors.primary : colors.border,
          },
        ]}
        disabled={!canIncrement}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        accessibilityState={{ disabled: !canIncrement }}
      >
        <Text
          style={{
            color: canIncrement ? colors.surface : colors.muted,
            fontSize,
            fontWeight: "700",
          }}
        >
          +
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  valueContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
