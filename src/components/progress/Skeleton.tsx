import React from "react";
import { View, StyleProp, ViewStyle, DimensionValue } from "react-native";
import { useTheme } from "../../theme/ThemeContext";

type Props = {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Skeleton({
  width = "100%",
  height = 14,
  radius,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();

  return (
    <View
      testID={testID}
      style={[
        {
          width,
          height,
          borderRadius: radius ?? theme.radius.md,
          backgroundColor: theme.mode === "dark"
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.06)",
        },
        style,
      ]}
    />
  );
}