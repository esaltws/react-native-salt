import React from "react";
import { View, useWindowDimensions } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import type { Spacing } from "../../types";

type ResponsiveSize = {
  base: Spacing;
  sm?: Spacing;
  md?: Spacing;
  lg?: Spacing;
};

type Props = {
  size?: Spacing | ResponsiveSize;
  horizontal?: boolean;
  flex?: number | boolean;
  testID?: string;
};

const BREAKPOINTS = { sm: 480, md: 768, lg: 1024 };

export default function Spacer({ size = "md", horizontal = false, flex, testID }: Props) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const resolve = (v: Spacing) =>
    typeof v === "number" ? v : theme.spacing[v] ?? theme.spacing.md;

  let gapValue: number;
  if (typeof size === "object" && size !== null && "base" in size) {
    let picked = size.base;
    if (size.sm !== undefined && width >= BREAKPOINTS.sm) picked = size.sm;
    if (size.md !== undefined && width >= BREAKPOINTS.md) picked = size.md;
    if (size.lg !== undefined && width >= BREAKPOINTS.lg) picked = size.lg;
    gapValue = resolve(picked);
  } else {
    gapValue = resolve(size as Spacing);
  }

  if (flex) {
    const flexValue = typeof flex === "number" ? flex : 1;
    return <View testID={testID} style={{ flex: flexValue }} />;
  }

  return (
    <View
      testID={testID}
      style={horizontal ? { width: gapValue } : { height: gapValue }}
    />
  );
}
