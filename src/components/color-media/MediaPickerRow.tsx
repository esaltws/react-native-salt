import React from "react";
import {
  View,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Label from "../typography/Label";
import Caption from "../typography/Caption";
import Icon from "../theme-settings/Icon";

type MediaItem = {
  uri: string;
  id: string;
};

type Props = {
  items: MediaItem[];
  onAdd?: () => void;
  onRemove?: (id: string) => void;
  onPress?: (item: MediaItem) => void;
  maxItems?: number;
  size?: number;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export default function MediaPickerRow({
  items,
  onAdd,
  onRemove,
  onPress,
  maxItems = 10,
  size = 72,
  label,
  disabled = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, spacing, radius, iconSizes } = theme;

  const canAdd = items.length < maxItems && !disabled;

  return (
    <View testID={testID} style={[styles.container, style]}>
      {label && (
        <Label style={{ marginBottom: spacing.sm }}>
          {label}
          {maxItems < Infinity && (
            <Caption>{` (${items.length}/${maxItems})`}</Caption>
          )}
        </Label>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.sm }}
      >
        {canAdd && (
          <Pressable
            onPress={onAdd}
            style={[
              styles.addBtn,
              {
                width: size,
                height: size,
                borderRadius: radius.md,
                borderColor: colors.border,
                borderWidth: 2,
                borderStyle: "dashed",
              },
            ]}
          >
            <Icon name="add" size={iconSizes.md} color={colors.muted} />
            <Caption style={{ marginTop: 2 }}>
              Add
            </Caption>
          </Pressable>
        )}

        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onPress?.(item)}
            style={[
              styles.thumb,
              {
                width: size,
                height: size,
                borderRadius: radius.md,
                overflow: "hidden",
              },
            ]}
          >
            <Image
              source={{ uri: item.uri }}
              style={{ width: size, height: size }}
              resizeMode="cover"
            />
            {onRemove && !disabled && (
              <Pressable
                onPress={() => onRemove(item.id)}
                style={[
                  styles.removeBtn,
                  {
                    backgroundColor: "rgba(0,0,0,0.6)",
                    top: spacing.xs,
                    right: spacing.xs,
                    width: iconSizes.sm,
                    height: iconSizes.sm,
                    borderRadius: iconSizes.sm / 2,
                  },
                ]}
              >
                <Icon name="close" size={12} color="#fff" />
              </Pressable>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  addBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  thumb: {
    position: "relative",
  },
  removeBtn: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
