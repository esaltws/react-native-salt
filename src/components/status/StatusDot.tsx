import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import { SizeToken } from "../../types";

type StatusType = "online" | "offline" | "idle";

type Props = {
  status?: StatusType;
  size?: SizeToken;
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
  const { colors } = theme;

  const statusColors: Record<StatusType, string> = {
    online: colors.success,
    offline: colors.muted,
    idle: colors.warning,
  };

  const sizeValues: Record<SizeToken, number> = {
    sm: 8,
    md: 10,
    lg: 14,
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
