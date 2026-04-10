import React from "react";
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Intent, Size } from "../../types";

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

const SIZE_MAP = {
  sm: { py: 2, px: 8, font: 11, icon: 12, gap: 4 },
  md: { py: 4, px: 10, font: 13, icon: 14, gap: 6 },
  lg: { py: 6, px: 14, font: 15, icon: 16, gap: 8 },
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
  const { colors, spacing, radius } = theme;
  const s = SIZE_MAP[size];

  const getTagColor = (tag: TagItem) => {
    if (tag.color) return tag.color;
    if (tag.intent) return (colors as any)[tag.intent] || colors.primary;
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
