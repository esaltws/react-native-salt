import React, { useState, useRef } from "react";
import {
  View,
  PanResponder,
  Animated,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  LayoutAnimation,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type DragItem = {
  key: string;
  label: string;
  icon?: string;
};

type Props = {
  items: DragItem[];
  onReorder: (items: DragItem[]) => void;
  renderItem?: (item: DragItem, index: number) => React.ReactNode;
  handlePosition?: "left" | "right";
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function DragList({
  items,
  onReorder,
  renderItem,
  handlePosition = "left",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes } = theme;
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const moveItem = (fromIndex: number, direction: "up" | "down") => {
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= items.length) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const updated = [...items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onReorder(updated);
  };

  return (
    <View testID={testID} style={style}>
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        const handle = (
          <View style={[styles.handleArea, { marginHorizontal: spacing.sm }]}>
            <Pressable
              onPress={() => moveItem(index, "up")}
              disabled={isFirst}
              hitSlop={spacing.xs}
              style={{ opacity: isFirst ? 0.2 : 1, padding: spacing.xs }}
              accessibilityRole="button"
              accessibilityLabel={`Move ${item.label} up`}
              accessibilityState={{ disabled: isFirst }}
            >
              <Icon name="chevron-up-outline" size={iconSizes.sm} color={colors.muted} />
            </Pressable>
            <Icon name="reorder-three-outline" size={iconSizes.sm} color={colors.muted} />
            <Pressable
              onPress={() => moveItem(index, "down")}
              disabled={isLast}
              hitSlop={spacing.xs}
              style={{ opacity: isLast ? 0.2 : 1, padding: spacing.xs }}
              accessibilityRole="button"
              accessibilityLabel={`Move ${item.label} down`}
              accessibilityState={{ disabled: isLast }}
            >
              <Icon
                name="chevron-down-outline"
                size={iconSizes.sm}
                color={colors.muted}
              />
            </Pressable>
          </View>
        );

        const content = renderItem ? (
          renderItem(item, index)
        ) : (
          <View style={[styles.defaultContent, { flex: 1 }]}>
            {item.icon && (
              <Icon
                name={item.icon}
                size={iconSizes.sm}
                color={colors.text}
                style={{ marginRight: spacing.sm }}
              />
            )}
            <Text
              style={{
                fontSize: fontSizes.sm,
                color: colors.text,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </View>
        );

        return (
          <View
            key={item.key}
            style={[
              styles.row,
              {
                backgroundColor: colors.surface,
                borderBottomWidth: isLast ? 0 : 1,
                borderBottomColor: colors.border,
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
              },
            ]}
          >
            {handlePosition === "left" && handle}
            {content}
            {handlePosition === "right" && handle}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  handleArea: {
    alignItems: "center",
    justifyContent: "center",
  },
  defaultContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
