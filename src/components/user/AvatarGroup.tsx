import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Avatar from "./Avatar";
import Text from "../typography/Text";
import { Size, Dimension } from "../../types";

const AVATAR_DIM: Record<Size, Dimension> = { sm: "sm", md: "md", lg: "xl" };
const OVERFLOW_DIM: Record<Size, Dimension> = { sm: "xs", md: "sm", lg: "lg" };

type AvatarItem = {
  key: string;
  name: string;
  source?: { uri: string };
};

type Props = {
  items: AvatarItem[];
  max?: number;
  size?: Size;
  overlap?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function AvatarGroup({
  items,
  max = 4,
  size = "md",
  overlap,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, fontSizes, dimensions } = theme;
  const effectiveOverlap = overlap ?? spacing.md;

  const avatarDim = dimensions[AVATAR_DIM[size]];
  const overflowDim = dimensions[OVERFLOW_DIM[size]];
  const visible = items.slice(0, max);
  const overflow = items.length - max;

  return (
    <View testID={testID} style={[styles.container, style]}>
      {visible.map((item, index) => (
        <View
          key={item.key}
          style={{
            marginLeft: index === 0 ? 0 : -effectiveOverlap,
            zIndex: visible.length - index,
            borderWidth: 2,
            borderColor: colors.background,
            borderRadius: avatarDim / 2,
          }}
        >
          <Avatar
            name={item.name}
            uri={item.source?.uri}
            size={size}
          />
        </View>
      ))}

      {overflow > 0 && (
        <View
          style={[
            styles.overflowBadge,
            {
              width: overflowDim,
              height: overflowDim,
              borderRadius: overflowDim / 2,
              backgroundColor: colors.surface,
              borderWidth: 2,
              borderColor: colors.background,
              marginLeft: -effectiveOverlap,
              zIndex: 0,
            },
          ]}
        >
          <Text
            style={{
              fontSize: fontSizes.xs,
              fontWeight: "700",
              color: colors.muted,
            }}
          >
            +{overflow}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  overflowBadge: {
    alignItems: "center",
    justifyContent: "center",
  },
});
