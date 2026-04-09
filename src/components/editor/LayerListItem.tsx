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
  const { colors, spacing, radius, fontSizes } = theme;

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
        <Pressable onLongPress={onDragStart} style={styles.dragHandle}>
          <Icon name="reorder-three-outline" size={16} color={colors.muted} />
        </Pressable>
      )}

      {/* Thumbnail or icon */}
      {thumbnail ? (
        <View
          style={[
            styles.thumb,
            {
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
          size={16}
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
      <View style={styles.actions}>
        {onToggleLock && (
          <Pressable onPress={onToggleLock} style={styles.actionBtn}>
            <Icon
              name={locked ? "lock-closed-outline" : "lock-open-outline"}
              size={14}
              color={locked ? colors.warning : colors.muted}
            />
          </Pressable>
        )}
        {onToggleVisibility && (
          <Pressable onPress={onToggleVisibility} style={styles.actionBtn}>
            <Icon
              name={visible ? "eye-outline" : "eye-off-outline"}
              size={14}
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
    marginRight: 6,
    padding: 2,
  },
  thumb: {
    width: 28,
    height: 28,
  },
  actions: {
    flexDirection: "row",
    gap: 4,
  },
  actionBtn: {
    padding: 4,
  },
});
