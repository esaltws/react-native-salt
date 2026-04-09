import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Intent } from "../../types";

type Trend = "up" | "down" | "neutral";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: Trend;
  trendValue?: string;
  icon?: string;
  intent?: Intent;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const TREND_CONFIG: Record<Trend, { icon: string; color: string }> = {
  up: { icon: "trending-up-outline", color: "success" },
  down: { icon: "trending-down-outline", color: "danger" },
  neutral: { icon: "remove-outline", color: "muted" },
};

export default function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  intent = "primary",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  const accentColor = (colors as any)[intent] || colors.primary;
  const trendConfig = trend ? TREND_CONFIG[trend] : null;
  const trendColor = trendConfig
    ? (colors as any)[trendConfig.color] || colors.muted
    : colors.muted;

  return (
    <View
      testID={testID}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          padding: spacing.lg,
          borderLeftWidth: 3,
          borderLeftColor: accentColor,
        },
        style,
      ]}
    >
      {/* Header row */}
      <View style={styles.header}>
        <Text
          style={{
            fontSize: fontSizes.sm,
            color: colors.muted,
            flex: 1,
          }}
        >
          {title}
        </Text>
        {icon && (
          <Icon name={icon} size={18} color={accentColor} />
        )}
      </View>

      {/* Value */}
      <Text
        style={{
          fontSize: fontSizes.xxl,
          fontWeight: "700",
          color: colors.text,
          marginTop: spacing.xs,
        }}
      >
        {value}
      </Text>

      {/* Footer: subtitle + trend */}
      {(subtitle || trend) && (
        <View style={[styles.footer, { marginTop: spacing.sm }]}>
          {subtitle && (
            <Text
              style={{
                fontSize: fontSizes.xs,
                color: colors.muted,
                flex: 1,
              }}
            >
              {subtitle}
            </Text>
          )}
          {trend && trendConfig && (
            <View style={styles.trendRow}>
              <Icon
                name={trendConfig.icon}
                size={14}
                color={trendColor}
              />
              {trendValue && (
                <Text
                  style={{
                    fontSize: fontSizes.xs,
                    color: trendColor,
                    fontWeight: "600",
                    marginLeft: 4,
                  }}
                >
                  {trendValue}
                </Text>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
