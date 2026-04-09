import React, { ReactNode } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import type { Spacing } from "../../types";

type Props = {
  children: ReactNode;
  gap?: Spacing;
  align?: ViewStyle["alignItems"];
  justify?: ViewStyle["justifyContent"];
  wrap?: boolean;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function Column({
  children,
  gap = 0,
  align = "stretch",
  justify = "flex-start",
  wrap = false,
  fill = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const gapValue = typeof gap === "number" ? gap : theme.spacing[gap] ?? theme.spacing.md;

  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: "column",
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap ? "wrap" : "nowrap",
          gap: gapValue,
          flex: fill ? 1 : undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
