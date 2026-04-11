import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { Size } from "../../types";

type StatusType = "online" | "offline" | "idle";

type Props = {
  status?: StatusType;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function StatusDot({
  status = "offline",
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing } = theme;

  const statusColors: Record<StatusType, string> = {
    online: colors.success,
    offline: colors.muted,
    idle: colors.warning,
  };

  const sizeValues: Record<Size, number> = {
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
  };

  const dimension = sizeValues[size];

  return (
    <View
      testID={testID}
      style={[
        styles.dot,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: statusColors[status],
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    borderWidth: 2,
    borderColor: "white",
  },
});
