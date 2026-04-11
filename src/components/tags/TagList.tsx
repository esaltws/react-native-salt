import React from "react";
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Intent, Size, FontSize } from "../../types";

type TagItem = {
  key: string;
  label: string;
  color?: string;
  intent?: Intent;
};

type Props = {
  tags: TagItem[];
  onRemove?: (key: string) => void;
  onPress?: (key: string) => void;
  onAdd?: () => void;
  addLabel?: string;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

// Tags are extra compact — py stays as small hardcoded values
const COMPACT_MAP: Record<Size, { py: number; px: "sm" | "md" | "lg"; font: FontSize }> = {
  sm: { py: 2, px: "sm", font: "xs" },
  md: { py: 4, px: "md", font: "sm" },
  lg: { py: 6, px: "lg", font: "md" },
};

export default function TagList({
  tags,
  onRemove,
  onPress,
  onAdd,
  addLabel = "Add",
  size = "md",
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes } = theme;
  const s = COMPACT_MAP[size];

  const getTagColor = (tag: TagItem) => {
    if (tag.color) return tag.color;
    if (tag.intent) return colors[tag.intent];
    return colors.primary;
  };

  return (
    <View testID={testID} style={[styles.container, { gap: s.gap }, style]}>
      {tags.map((tag) => {
        const tagColor = getTagColor(tag);
        const Wrapper = onPress ? Pressable : View;

        return (
          <Wrapper
            key={tag.key}
            onPress={onPress ? () => onPress(tag.key) : undefined}
            style={[
              styles.tag,
              {
                backgroundColor: `${tagColor}14`,
                borderRadius: radius.pill,
                paddingVertical: s.py,
                paddingLeft: s.px,
                paddingRight: onRemove ? s.gap : s.px,
              },
            ]}
            {...(onPress ? { accessibilityRole: "button" as const, accessibilityLabel: tag.label } : {})}
          >
            <Text
              style={{
                fontSize: s.font,
                color: tagColor,
                fontWeight: "500",
              }}
              numberOfLines={1}
            >
              {tag.label}
            </Text>
            {onRemove && (
              <Pressable
                onPress={() => onRemove(tag.key)}
                hitSlop={8}
                style={{ marginLeft: s.gap, padding: 2 }}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${tag.label}`}
              >
                <Icon name="close-circle" size={s.icon} color={tagColor} />
              </Pressable>
            )}
          </Wrapper>
        );
      })}

      {/* Add button */}
      {onAdd && (
        <Pressable
          onPress={onAdd}
          style={[
            styles.tag,
            {
              borderRadius: radius.pill,
              borderWidth: 1,
              borderColor: colors.border,
              borderStyle: "dashed",
              paddingVertical: s.py,
              paddingHorizontal: s.px,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={addLabel}
        >
          <Icon
            name="add-outline"
            size={s.icon}
            color={colors.muted}
          />
          <Text
            style={{
              fontSize: s.font,
              color: colors.muted,
              marginLeft: 4,
            }}
          >
            {addLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
  },
});
