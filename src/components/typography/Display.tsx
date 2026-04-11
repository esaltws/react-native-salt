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

export default function Display({
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
    sm: fontSizes.xxl,
    md: fontSizes["3xl"],
    lg: fontSizes["4xl"],
  };

  return (
    <Text
      numberOfLines={lines}
      ellipsizeMode={truncate}
      style={[
        {
          fontSize: sizeMap[fontSize],
          fontWeight: "700",
          color: colors.text,
          textAlign: align,
          textDecorationLine: decoration ? DECORATION_MAP[decoration] : undefined,
        },
        style,
      ]}
      {...props}
    />
  );
}
