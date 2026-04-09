import React from "react";
import { Text as RNText, TextProps, TextStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import type { TypographySize, Decoration, LineHeightToken } from "../../types";

const DECORATION_MAP: Record<Decoration, TextStyle["textDecorationLine"]> = {
  underline: "underline",
  strikethrough: "line-through",
};

const LINE_HEIGHT_SCALE: Record<LineHeightToken, number> = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.8,
};

type Props = TextProps & {
  fontSize?: TypographySize;
  lineHeight?: LineHeightToken;
  align?: TextStyle["textAlign"];
  lines?: number;
  truncate?: "head" | "middle" | "tail" | "clip";
  decoration?: Decoration;
};

export default function Text({
  fontSize = "md",
  lineHeight = "normal",
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
    sm: fontSizes.sm,
    md: fontSizes.md,
    lg: fontSizes.lg,
  };

  const fontValue = sizeMap[fontSize];
  const lineHeightValue = Math.round(fontValue * LINE_HEIGHT_SCALE[lineHeight]);

  return (
    <RNText
      numberOfLines={lines}
      ellipsizeMode={truncate}
      style={[
        {
          fontSize: fontValue,
          fontWeight: "400",
          color: colors.text,
          lineHeight: lineHeightValue,
          textAlign: align,
          textDecorationLine: decoration ? DECORATION_MAP[decoration] : undefined,
        },
        style,
      ]}
      {...props}
    />
  );
}
