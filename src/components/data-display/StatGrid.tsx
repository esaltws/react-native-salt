import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type StatItem = {
  key: string;
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
};

type Props = {
  items: StatItem[];
  columns?: 2 | 3 | 4;
  compact?: boolean;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function StatGrid({
  items,
  columns = 2,
  compact = false,
  bordered = true,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const py = compact ? spacing.sm : spacing.md;
  const gap = spacing.sm;

  // Build rows of `columns` items each
  const rows: StatItem[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  return (
    <View testID={testID} style={[{ gap }, style]}>
      {rows.map((row, ri) => (
        <View key={ri} style={[styles.grid, { gap }]}>
          {row.map((item) => (
            <View
              key={item.key}
              style={[
                styles.cell,
                {
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderRadius: radius.md,
                  padding: py,
                  borderWidth: bordered ? 1 : 0,
                  borderColor: colors.border,
                },
              ]}
            >
          {item.icon && (
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: `${item.color || colors.primary}14`,
                  borderRadius: radius.sm,
                  padding: spacing.xs,
                  marginBottom: spacing.xs,
                },
              ]}
            >
              <Icon
                name={item.icon}
                size={compact ? 16 : 20}
                color={item.color || colors.primary}
              />
            </View>
          )}
          <Text
            style={{
              fontSize: compact ? fontSizes.xxl : fontSizes.xxl,
              fontWeight: "700",
              color: colors.text,
            }}
            numberOfLines={1}
          >
            {item.value}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.xs,
              color: colors.muted,
              marginTop: 2,
            }}
            numberOfLines={1}
          >
            {item.label}
          </Text>
          </View>
          ))}
          {/* Fill remaining slots so last row cells stay same width */}
          {row.length < columns &&
            Array.from({ length: columns - row.length }, (_, i) => (
              <View key={`spacer-${i}`} style={{ flex: 1 }} />
            ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
  },
  cell: {
    alignItems: "center",
  },
  iconBox: {
    alignSelf: "center",
  },
});
