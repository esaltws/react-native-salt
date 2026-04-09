import React from "react";
import { ScrollView, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Badge from "../status/Badge";
import { SizeToken } from "../../types";

type ChipItem = {
  key: string;
  label: string;
};

type Props = {
  items: ChipItem[];
  selected: string | null;
  onSelect: (key: string | null) => void;
  showAll?: boolean;
  allLabel?: string;
  size?: SizeToken;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function ChipGroup({
  items,
  selected,
  onSelect,
  showAll = true,
  allLabel = "All",
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { spacing } = theme;

  return (
    <ScrollView
      testID={testID}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.row, { gap: spacing.sm }, style]}
    >
      {showAll ? (
        <Pressable onPress={() => onSelect(null)} accessibilityRole="button" accessibilityState={{ selected: selected === null }}>
          <Badge
            label={allLabel}
            action="secondary"
            variant={selected === null ? "solid" : "outline"}
            size={size}
          />
        </Pressable>
      ) : null}
      {items.map((item) => (
        <Pressable key={item.key} onPress={() => onSelect(item.key)} accessibilityRole="button" accessibilityState={{ selected: selected === item.key }}>
          <Badge
            label={item.label}
            action="primary"
            variant={selected === item.key ? "solid" : "outline"}
            size={size}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
