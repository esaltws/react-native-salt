import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Avatar from "./Avatar";
import Text from "../typography/Text";
import { Size } from "../../types";

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
  overlap = 10,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, fontSizes } = theme;

  const visible = items.slice(0, max);
  const overflow = items.length - max;

  return (
    <View testID={testID} style={[styles.container, style]}>
      {visible.map((item, index) => (
        <View
          key={item.key}
          style={{
            marginLeft: index === 0 ? 0 : -overlap,
            zIndex: visible.length - index,
            borderWidth: 2,
            borderColor: colors.background,
            borderRadius: size === "sm" ? 12 : size === "md" ? 18 : 24,
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
              width: size === "sm" ? 24 : size === "md" ? 36 : 48,
              height: size === "sm" ? 24 : size === "md" ? 36 : 48,
              borderRadius: size === "sm" ? 12 : size === "md" ? 18 : 24,
              backgroundColor: colors.surface,
              borderWidth: 2,
              borderColor: colors.background,
              marginLeft: -overlap,
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
