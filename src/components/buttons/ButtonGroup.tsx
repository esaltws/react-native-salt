import React from "react";
import { View, Pressable, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../theme/ThemeContext";
import Text from "../typography/Text";
import Icon from "../theme-settings/Icon";
import { Intent, Size, FontSize, IconSize } from "../../types";

type ButtonItem = {
  key: string;
  label?: string;
  icon?: string;
  disabled?: boolean;
};

type Props = {
  items: ButtonItem[];
  selected: string | string[];
  onSelect: (key: string) => void;
  multiple?: boolean;
  intent?: Intent;
  size?: Size;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

// Compact components use one token step below the size prop
const COMPACT_MAP: Record<Size, { py: "xs" | "sm" | "md"; px: "sm" | "md" | "lg"; font: FontSize; icon: IconSize }> = {
  sm: { py: "xs", px: "sm", font: "xs", icon: "xs" },
  md: { py: "sm", px: "md", font: "sm", icon: "sm" },
  lg: { py: "md", px: "lg", font: "md", icon: "md" },
};

export default function ButtonGroup({
  items,
  selected,
  onSelect,
  multiple = false,
  intent = "primary",
  size = "md",
  fullWidth = false,
  style,
  testID,
}: Props) {
  const { theme } = useTheme();
  const { colors, radius, spacing, fontSizes, iconSizes } = theme;
  const s = COMPACT_MAP[size];
  const accentColor = colors[intent];

  const isSelected = (key: string) =>
    Array.isArray(selected) ? selected.includes(key) : selected === key;

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: accentColor,
          overflow: "hidden",
        },
        fullWidth && { width: "100%" },
        style,
      ]}
    >
      {items.map((item, index) => {
        const active = isSelected(item.key);
        return (
          <Pressable
            key={item.key}
            onPress={() => !item.disabled && onSelect(item.key)}
            disabled={item.disabled}
            accessibilityRole="button"
            accessibilityLabel={item.label || item.icon || item.key}
            accessibilityState={{ selected: active, disabled: !!item.disabled }}
            style={[
              styles.button,
              {
                paddingVertical: spacing[s.py],
                paddingHorizontal: spacing[s.px],
                backgroundColor: active ? accentColor : "transparent",
                borderRightWidth: index < items.length - 1 ? 1 : 0,
                borderRightColor: accentColor,
                opacity: item.disabled ? 0.4 : 1,
              },
              fullWidth && { flex: 1 },
            ]}
          >
            {item.icon && (
              <Icon
                name={item.icon}
                size={iconSizes[s.icon]}
                color={active ? colors.onPrimary : accentColor}
                style={item.label ? { marginRight: spacing.xs } : undefined}
              />
            )}
            {item.label && (
              <Text
                style={{
                  fontSize: fontSizes[s.font],
                  fontWeight: "600",
                  color: active ? colors.onPrimary : accentColor,
                }}
              >
                {item.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
