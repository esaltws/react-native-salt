import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";

type Props = {
  title: string;
  icon?: string;
  thumbnail?: React.ReactNode;
  selected?: boolean;
  visible?: boolean;
  locked?: boolean;
  onPress?: () => void;
  onToggleVisibility?: () => void;
  onToggleLock?: () => void;
  onDragStart?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function LayerListItem({
  title,
  icon,
  thumbnail,
  selected = false,
  visible = true,
  locked = false,
  onPress,
  onToggleVisibility,
  onToggleLock,
  onDragStart,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, fontSizes, iconSizes, dimensions } = theme;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: selected
            ? colors.primary + "14"
            : "transparent",
          borderLeftWidth: selected ? 3 : 0,
          borderLeftColor: colors.primary,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          paddingLeft: selected ? spacing.md - 3 : spacing.md,
          opacity: visible ? 1 : 0.4,
        },
        style,
      ]}
    >
      {/* Drag handle */}
      {onDragStart && (
        <Pressable onLongPress={onDragStart} style={[styles.dragHandle, { marginRight: spacing.sm }]}>
          <Icon name="reorder-three-outline" size={iconSizes.xs} color={colors.muted} />
        </Pressable>
      )}

      {/* Thumbnail or icon */}
      {thumbnail ? (
        <View
          style={[
            styles.thumb,
            {
              width: dimensions.xs,
              height: dimensions.xs,
              borderRadius: radius.sm,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: "hidden",
            },
          ]}
        >
          {thumbnail}
        </View>
      ) : icon ? (
        <Icon
          name={icon}
          size={iconSizes.xs}
          color={selected ? colors.primary : colors.muted}
        />
      ) : null}

      {/* Title */}
      <Text
        style={{
          flex: 1,
          fontSize: fontSizes.sm,
          color: selected ? colors.primary : colors.text,
          fontWeight: selected ? "600" : "400",
          marginLeft: spacing.sm,
        }}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Actions */}
      <View style={[styles.actions, { gap: spacing.xs }]}>
        {onToggleLock && (
          <Pressable onPress={onToggleLock} style={[styles.actionBtn, { padding: spacing.xs }]}>
            <Icon
              name={locked ? "lock-closed-outline" : "lock-open-outline"}
              size={iconSizes.xs}
              color={locked ? colors.warning : colors.muted}
            />
          </Pressable>
        )}
        {onToggleVisibility && (
          <Pressable onPress={onToggleVisibility} style={[styles.actionBtn, { padding: spacing.xs }]}>
            <Icon
              name={visible ? "eye-outline" : "eye-off-outline"}
              size={iconSizes.xs}
              color={colors.muted}
            />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dragHandle: {
    padding: 2,
  },
  thumb: {},
  actions: {
    flexDirection: "row",
  },
  actionBtn: {},
});
