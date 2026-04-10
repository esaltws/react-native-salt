import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import type { Spacing } from "../../types";

type Props = {
  vertical?: boolean;
  thickness?: number;
  color?: string;
  inset?: Spacing;      // left/right padding for horizontal, top/bottom for vertical
  margin?: Spacing;     // outside spacing
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Divider({
  vertical = false,
  thickness = 1,
  color,
  inset = "none",
  margin = "none",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const insetValue = theme.spacing[inset] ?? theme.spacing.md;
  const marginValue = theme.spacing[margin] ?? theme.spacing.md;

  const base: ViewStyle = vertical
    ? {
        width: thickness,
        alignSelf: "stretch",
        marginVertical: marginValue,
        backgroundColor: color ?? theme.colors.border,
        marginLeft: insetValue,
        marginRight: insetValue,
      }
    : {
        height: thickness,
        alignSelf: "stretch",
        marginVertical: marginValue,
        backgroundColor: color ?? theme.colors.border,
        marginLeft: insetValue,
        marginRight: insetValue,
      };

  return <View testID={testID} style={[base, style]} />;
}