import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import ChipGroup from "../tags/ChipGroup";
import { FontLevel } from "../../theme/typography";
import { Size } from "../../types";

const LEVELS: FontLevel[] = [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8];

const LEVEL_ITEMS = LEVELS.map((n) => ({ key: String(n), label: String(n) }));

type Props = {
  style?: StyleProp<ViewStyle>;
  size?: Size;
  testID?: string;
};

export default function FontLevelSwitcher({ style, size = "sm", testID }: Props) {
  const { fontLevel, setFontLevel } = useTheme();

  return (
    <ChipGroup
      testID={testID}
      items={LEVEL_ITEMS}
      selected={String(fontLevel)}
      onSelect={(key) => {
        if (key) setFontLevel(Number(key) as FontLevel);
      }}
      showAll={false}
      size={size}
      style={style}
    />
  );
}
