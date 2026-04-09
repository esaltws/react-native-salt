import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import type { TypographySize, Decoration } from "../../types";

const DECORATION_MAP: Record<Decoration, TextStyle["textDecorationLine"]> = {
  underline: "underline",
  strikethrough: "line-through",
};

type Props = TextProps & {
  fontSize?: TypographySize;
  align?: TextStyle["textAlign"];
  lines?: number;
  truncate?: "head" | "middle" | "tail" | "clip";
  decoration?: Decoration;
};

export default function Caption({
  fontSize = "md",
  align,
  lines,
  truncate,
  decoration,
  style,
  ...props
}: Props) {
  const { theme } = useTheme();
  const { colors, fontSizes } = theme;

  const sizeMap = {
    sm: 10,
    md: fontSizes.xs,
    lg: fontSizes.sm,
  };

  return (
    <Text
      numberOfLines={lines}
      ellipsizeMode={truncate}
      style={[
        {
          fontSize: sizeMap[fontSize],
          fontWeight: "400",
          color: colors.muted,
          textAlign: align,
          textDecorationLine: decoration ? DECORATION_MAP[decoration] : undefined,
        },
        style,
      ]}
      {...props}
    />
  );
}
