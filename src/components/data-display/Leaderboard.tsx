import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Avatar from "../user/Avatar";
import Icon from "../theme-settings/Icon";

type LeaderboardItem = {
  key: string;
  name: string;
  score: string | number;
  avatar?: string;
  subtitle?: string;
};

type Props = {
  items: LeaderboardItem[];
  showMedals?: boolean;
  highlightKey?: string;
  startRank?: number;
  scoreLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const MEDAL_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"]; // gold, silver, bronze

export default function Leaderboard({
  items,
  showMedals = true,
  highlightKey,
  startRank = 1,
  scoreLabel,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;

  return (
    <View
      testID={testID}
      style={[
        {
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: "hidden",
        },
        style,
      ]}
    >
      {/* Score label header */}
      {scoreLabel && (
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.surface,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
            },
          ]}
        >
          <Text
            style={{
              fontSize: fontSizes.xs,
              color: colors.muted,
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {scoreLabel}
          </Text>
        </View>
      )}

      {items.map((item, index) => {
        const rank = startRank + index;
        const isMedal = showMedals && rank <= 3;
        const isHighlighted = highlightKey === item.key;

        return (
          <View
            key={item.key}
            style={[
              styles.row,
              {
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.md,
                backgroundColor: isHighlighted
                  ? `${colors.primary}12`
                  : "transparent",
                borderBottomWidth: index < items.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              },
            ]}
          >
            {/* Rank */}
            <View style={[styles.rankBox, { width: 32 }]}>
              {isMedal ? (
                <Icon
                  name="trophy"
                  size={20}
                  color={MEDAL_COLORS[rank - 1]}
                />
              ) : (
                <Text
                  style={{
                    fontSize: fontSizes.sm,
                    fontWeight: "600",
                    color: colors.muted,
                  }}
                >
                  {rank}
                </Text>
              )}
            </View>

            {/* Avatar */}
            <Avatar
              name={item.name}
              uri={item.avatar}
              size="sm"
            />

            {/* Name + subtitle */}
            <View style={[styles.info, { marginLeft: spacing.sm }]}>
              <Text
                style={{
                  fontSize: fontSizes.sm,
                  fontWeight: isHighlighted ? "700" : "600",
                  color: colors.text,
                }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              {item.subtitle && (
                <Text
                  style={{
                    fontSize: fontSizes.xs,
                    color: colors.muted,
                    marginTop: 1,
                  }}
                  numberOfLines={1}
                >
                  {item.subtitle}
                </Text>
              )}
            </View>

            {/* Score */}
            <Text
              style={{
                fontSize: fontSizes.md,
                fontWeight: "700",
                color: isMedal ? MEDAL_COLORS[rank - 1] : colors.text,
              }}
            >
              {item.score}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
});
