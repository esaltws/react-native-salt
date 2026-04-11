import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Caption from "../typography/Caption";
import Icon from "../theme-settings/Icon";
import { Size, IconSize } from "../../types";

const STAR_MAP: Record<Size, IconSize> = { sm: "xs", md: "sm", lg: "md" };

type Props = {
  rating: number;
  total?: number;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function RatingStars({
  rating,
  total,
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, iconSizes } = theme;

  const starSize = iconSizes[STAR_MAP[size]];
  const clampedRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(clampedRating);
  const hasHalf = clampedRating - fullStars >= 0.25 && clampedRating - fullStars < 0.75;
  const roundedUp = clampedRating - fullStars >= 0.75;
  const filledStars = roundedUp ? fullStars + 1 : fullStars;
  const emptyStars = 5 - filledStars - (hasHalf ? 1 : 0);

  return (
    <View testID={testID} style={[styles.container, { gap: spacing.xs }, style]}>
      <View style={[styles.stars, { gap: 2 }]}>
        {Array.from({ length: filledStars }).map((_, i) => (
          <Icon key={`full-${i}`} name="star" size={starSize} color={colors.warning} />
        ))}
        {hasHalf ? (
          <Icon key="half" name="star-half" size={starSize} color={colors.warning} />
        ) : null}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Icon key={`empty-${i}`} name="star-outline" size={starSize} color={colors.border} />
        ))}
      </View>
      {total !== undefined ? (
        <Caption>({total})</Caption>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
  },
});
