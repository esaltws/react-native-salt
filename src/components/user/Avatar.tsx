import React from "react";
import { View, Image, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { SizeToken } from "../../types";
import Text from "../typography/Text";
import StatusDot from "../status/StatusDot";

type StatusType = "online" | "offline" | "idle";

type Props = {
  uri?: string | null;
  name?: string;
  size?: SizeToken;
  status?: StatusType;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hashColor(name: string): string {
  const hues = [0, 30, 60, 120, 180, 210, 240, 270, 300, 330];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hues[Math.abs(hash) % hues.length];
  return `hsl(${hue}, 50%, 45%)`;
}

export default function Avatar({
  uri,
  name,
  size = "md",
  status,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, fontSizes } = theme;

  const sizeValues: Record<SizeToken, number> = {
    sm: 32,
    md: 40,
    lg: 56,
  };

  const fontSizeMap: Record<SizeToken, number> = {
    sm: fontSizes.xs,
    md: fontSizes.sm,
    lg: fontSizes.xxl,
  };

  const dimension = sizeValues[size];
  const fontSize = fontSizeMap[size];
  const initials = getInitials(name);
  const bgColor = name ? hashColor(name) : colors.muted;

  return (
    <View testID={testID} style={[{ width: dimension, height: dimension }, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
            backgroundColor: colors.border,
          }}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: dimension,
              height: dimension,
              borderRadius: dimension / 2,
              backgroundColor: bgColor,
            },
          ]}
        >
          <Text
            style={{ color: colors.surface, fontSize, fontWeight: "600" }}
          >
            {initials}
          </Text>
        </View>
      )}

      {status && (
        <View style={styles.statusWrapper}>
          <StatusDot status={status} size="sm" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
