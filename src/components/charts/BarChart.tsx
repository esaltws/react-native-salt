import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import { Intent } from "../../types";

type BarItem = {
  key: string;
  label: string;
  value: number;
  color?: string;
  intent?: Intent;
};

type Props = {
  items: BarItem[];
  maxValue?: number;
  showValues?: boolean;
  showLabels?: boolean;
  barHeight?: number;
  intent?: Intent;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function BarChart({
  items,
  maxValue,
  showValues = true,
  showLabels = true,
  barHeight = 24,
  intent = "primary",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const max = maxValue ?? Math.max(...items.map((i) => i.value), 1);
  const defaultColor = (colors as any)[intent] || colors.primary;

  return (
    <View testID={testID} style={[{ gap: spacing.sm }, style]}>
      {items.map((item) => {
        const percentage = Math.min((item.value / max) * 100, 100);
        const barColor = item.color
          ? item.color
          : item.intent
          ? (colors as any)[item.intent] || defaultColor
          : defaultColor;

        return (
          <View key={item.key} style={styles.row}>
            {/* Label */}
            {showLabels && (
              <Text
                style={{
                  fontSize: fontSizes.xs,
                  color: colors.muted,
                  width: 80,
                  marginRight: spacing.sm,
                }}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            )}

            {/* Bar track */}
            <View
              style={[
                styles.track,
                {
                  height: barHeight,
                  backgroundColor: `${barColor}14`,
                  borderRadius: radius.sm,
                  flex: 1,
                },
              ]}
            >
              <View
                style={{
                  width: `${percentage}%` as any,
                  height: "100%",
                  backgroundColor: barColor,
                  borderRadius: radius.sm,
                  minWidth: percentage > 0 ? 4 : 0,
                }}
              />
            </View>

            {/* Value */}
            {showValues && (
              <Text
                style={{
                  fontSize: fontSizes.xs,
                  fontWeight: "600",
                  color: colors.text,
                  width: 48,
                  textAlign: "right",
                  marginLeft: spacing.sm,
                }}
              >
                {item.value}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  track: {
    overflow: "hidden",
  },
});
